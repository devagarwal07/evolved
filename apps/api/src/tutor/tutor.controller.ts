
import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TutorService } from './tutor.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assuming you have this, otherwise omit for now or use mock user

@Controller('tutor')
export class TutorController {
    constructor(private readonly tutorService: TutorService) { }

    // @UseGuards(JwtAuthGuard)
    @Post('session')
    createSession(@Body() body: { userId: string, topic: string }) {
        // In real app, get userId from Request.user
        // For MVP without strict auth guard on this route yet:
        return this.tutorService.createSession(body.userId, body.topic);
    }

    @Get('sessions/:userId')
    getSessions(@Param('userId') userId: string) {
        return this.tutorService.getSessions(userId);
    }

    @Get('session/:id/:userId')
    getSession(@Param('id') id: string, @Param('userId') userId: string) {
        return this.tutorService.getSession(id, userId);
    }

    @Post('message')
    sendMessage(@Body() body: { sessionId: string, userId: string, content: string }) {
        return this.tutorService.sendMessage(body.sessionId, body.userId, body.content);
    }
}
