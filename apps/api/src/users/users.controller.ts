
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '../generated/client';
// Import JwtAuthGuard once created, or use a placeholder for now if it creates a circular dependency or if I haven't created it yet.
// For now, I'll omit the guard import and usage on public endpoints, or just comment it out.

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Registration should be handled by AuthController, but strictly creating a user via internal API might be here.
    // We'll leave create restricted or for dev only.

    @Get('profile')
    // @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req: any) {
        return req.user;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
        return this.usersService.update(id, data);
    }
}
