import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { TutorService } from './tutor.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSessionDto } from './dto/create-session.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('tutor')
@UseGuards(JwtAuthGuard)
export class TutorController {
    constructor(private readonly tutorService: TutorService) { }

    @Post('session')
    createSession(@Request() req: any, @Body() dto: CreateSessionDto) {
        return this.tutorService.createSession(req.user.id, dto.topic);
    }

    @Get('sessions')
    getSessions(@Request() req: any) {
        return this.tutorService.getSessions(req.user.id);
    }

    @Get('session/:id')
    getSession(@Request() req: any, @Param('id') id: string) {
        return this.tutorService.getSession(id, req.user.id);
    }

    @Delete('session/:id')
    deleteSession(@Request() req: any, @Param('id') id: string) {
        return this.tutorService.deleteSession(id, req.user.id);
    }

    @Post('message')
    sendMessage(@Request() req: any, @Body() dto: SendMessageDto) {
        return this.tutorService.sendMessage(dto.sessionId, req.user.id, dto.content);
    }
}
