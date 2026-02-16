import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TutorModule } from './tutor/tutor.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotesModule } from './notes/notes.module';
import { PathsModule } from './paths/paths.module';
import { PracticeModule } from './practice/practice.module';
import { GoalsModule } from './goals/goals.module';
import { CommunityModule } from './community/community.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    TutorModule,
    DashboardModule,
    NotesModule,
    PathsModule,
    PracticeModule,
    GoalsModule,
    CommunityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
