import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { GamificationService, BADGE_CATALOG } from './gamification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
    constructor(private readonly gamificationService: GamificationService) { }

    @Get('profile')
    async getProfile(@Request() req: any) {
        return this.gamificationService.getProfile(req.user.id);
    }

    @Get('badges')
    async getAllBadges() {
        return {
            total: BADGE_CATALOG.length,
            badges: BADGE_CATALOG,
        };
    }

    @Get('leaderboard')
    async getLeaderboard() {
        return this.gamificationService.getLeaderboard(20);
    }
}
