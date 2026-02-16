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
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post('generate')
    async generateNote(@Request() req: any, @Body() dto: CreateNoteDto) {
        return this.notesService.generateNote(
            req.user.id,
            dto.topic,
            dto.sourceUrl,
            dto.sourceType,
        );
    }

    @Get()
    async getNotes(@Request() req: any) {
        return this.notesService.getNotes(req.user.id);
    }

    @Get(':id')
    async getNote(@Request() req: any, @Param('id') id: string) {
        return this.notesService.getNote(id, req.user.id);
    }

    @Delete(':id')
    async deleteNote(@Request() req: any, @Param('id') id: string) {
        return this.notesService.deleteNote(id, req.user.id);
    }
}
