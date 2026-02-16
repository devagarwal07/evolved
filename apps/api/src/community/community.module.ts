import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
    imports: [AuthModule, GamificationModule],
    controllers: [CommunityController],
    providers: [CommunityService, PrismaService],
})
export class CommunityModule { }
