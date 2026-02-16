import { Module } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PracticeController } from './practice.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
    imports: [AuthModule, GamificationModule],
    controllers: [PracticeController],
    providers: [PracticeService, PrismaService],
})
export class PracticeModule { }
