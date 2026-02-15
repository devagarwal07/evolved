
import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('overview/:userId')
    getOverview(@Param('userId') userId: string) {
        return this.dashboardService.getOverview(userId);
    }

    @Get('courses/:userId')
    getCourses(@Param('userId') userId: string) {
        return this.dashboardService.getCourses(userId);
    }
}
