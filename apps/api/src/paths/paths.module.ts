import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
    imports: [AuthModule, GamificationModule],
    controllers: [PathsController],
    providers: [PathsService, PrismaService],
})
export class PathsModule { }
