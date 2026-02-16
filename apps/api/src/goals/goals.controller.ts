import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
    constructor(private readonly goalsService: GoalsService) { }

    @Post()
    async createGoal(@Request() req: any, @Body() body: { name: string; targetDate?: string }) {
        return this.goalsService.createGoal(req.user.id, body.name, body.targetDate);
    }

    @Get()
    async getGoals(@Request() req: any) {
        return this.goalsService.getGoals(req.user.id);
    }

    @Get('stats')
    async getStats(@Request() req: any) {
        return this.goalsService.getStats(req.user.id);
    }

    @Patch(':id')
    async updateGoal(@Request() req: any, @Param('id') id: string, @Body() body: any) {
        return this.goalsService.updateGoal(id, req.user.id, body);
    }

    @Delete(':id')
    async deleteGoal(@Request() req: any, @Param('id') id: string) {
        return this.goalsService.deleteGoal(id, req.user.id);
    }
}
