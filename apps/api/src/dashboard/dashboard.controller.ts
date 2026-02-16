import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('overview')
    getOverview(@Request() req: any) {
        return this.dashboardService.getOverview(req.user.id);
    }

    @Get('courses')
    getCourses(@Request() req: any) {
        return this.dashboardService.getCourses(req.user.id);
    }
}
