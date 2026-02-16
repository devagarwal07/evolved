import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
    imports: [AuthModule, GamificationModule],
    controllers: [GoalsController],
    providers: [GoalsService, PrismaService],
})
export class GoalsModule { }
