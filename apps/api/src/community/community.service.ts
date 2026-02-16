import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GamificationService, XP_REWARDS } from '../gamification/gamification.service';

@Injectable()
export class CommunityService {
    private readonly logger = new Logger(CommunityService.name);

    constructor(private prisma: PrismaService, private gamification: GamificationService) { }

    async createRoom(userId: string, name: string, topic: string) {
        const room = await this.prisma.studyRoom.create({
            data: {
                name,
                topic,
                members: {
                    create: { userId, role: 'host' },
                },
            },
            include: { members: { include: { user: { select: { id: true, name: true, avatar: true } } } }, _count: { select: { members: true } } },
        });

        // Award XP for creating a room
        await this.gamification.awardXP(userId, XP_REWARDS.ROOM_CREATED, 'room_created');

        return room;
    }

    async getRooms() {
        return this.prisma.studyRoom.findMany({
            where: { isActive: true },
            orderBy: { updatedAt: 'desc' },
            include: {
                _count: { select: { members: true } },
                members: {
                    take: 4,
                    include: { user: { select: { id: true, name: true, avatar: true } } },
                },
            },
        });
    }

    async getRoom(id: string) {
        const room = await this.prisma.studyRoom.findUnique({
            where: { id },
            include: {
                members: {
                    include: { user: { select: { id: true, name: true, avatar: true, xp: true } } },
                    orderBy: { joinedAt: 'asc' },
                },
            },
        });
        if (!room) throw new NotFoundException('Room not found');
        return room;
    }

    async joinRoom(roomId: string, userId: string) {
        const existing = await this.prisma.roomMember.findFirst({
            where: { roomId, userId },
        });
        if (existing) throw new BadRequestException('Already a member');

        await this.prisma.roomMember.create({
            data: { roomId, userId },
        });

        return this.getRoom(roomId);
    }

    async leaveRoom(roomId: string, userId: string) {
        const member = await this.prisma.roomMember.findFirst({
            where: { roomId, userId },
        });
        if (!member) throw new NotFoundException('Not a member');

        await this.prisma.roomMember.delete({ where: { id: member.id } });

        // If host leaves and no members, deactivate room
        const remaining = await this.prisma.roomMember.count({ where: { roomId } });
        if (remaining === 0) {
            await this.prisma.studyRoom.update({
                where: { id: roomId },
                data: { isActive: false },
            });
        }

        return { message: 'Left room' };
    }

    async deleteRoom(roomId: string, userId: string) {
        const host = await this.prisma.roomMember.findFirst({
            where: { roomId, userId, role: 'host' },
        });
        if (!host) throw new BadRequestException('Only the host can delete the room');

        await this.prisma.roomMember.deleteMany({ where: { roomId } });
        await this.prisma.studyRoom.delete({ where: { id: roomId } });
        return { message: 'Room deleted' };
    }
}
