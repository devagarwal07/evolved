import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req: any) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Request() req: any) {
        return this.usersService.findOne(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async updateMe(@Request() req: any, @Body() data: Prisma.UserUpdateInput) {
        return this.usersService.update(req.user.id, data);
    }
}
