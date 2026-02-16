import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [PathsController],
    providers: [PathsService, PrismaService],
})
export class PathsModule { }
