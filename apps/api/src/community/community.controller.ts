import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CommunityService } from './community.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('community')
@UseGuards(JwtAuthGuard)
export class CommunityController {
    constructor(private readonly communityService: CommunityService) { }

    @Post('rooms')
    async createRoom(@Request() req: any, @Body() body: { name: string; topic: string }) {
        return this.communityService.createRoom(req.user.id, body.name, body.topic);
    }

    @Get('rooms')
    async getRooms() {
        return this.communityService.getRooms();
    }

    @Get('rooms/:id')
    async getRoom(@Param('id') id: string) {
        return this.communityService.getRoom(id);
    }

    @Post('rooms/:id/join')
    async joinRoom(@Request() req: any, @Param('id') id: string) {
        return this.communityService.joinRoom(id, req.user.id);
    }

    @Post('rooms/:id/leave')
    async leaveRoom(@Request() req: any, @Param('id') id: string) {
        return this.communityService.leaveRoom(id, req.user.id);
    }

    @Delete('rooms/:id')
    async deleteRoom(@Request() req: any, @Param('id') id: string) {
        return this.communityService.deleteRoom(id, req.user.id);
    }
}
