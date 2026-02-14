
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        if (data.passwordHash) {
            data.passwordHash = await argon2.hash(data.passwordHash);
        }
        return this.prisma.user.create({
            data,
        });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        if (typeof data.passwordHash === 'string') {
            data.passwordHash = await argon2.hash(data.passwordHash);
        }
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
