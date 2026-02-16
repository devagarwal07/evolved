import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
    imports: [AuthModule, GamificationModule],
    controllers: [TutorController],
    providers: [TutorService, PrismaService],
})
export class TutorModule { }
