import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GenerateDto, ReviewCardDto, SubmitQuizDto } from './dto/practice.dto';

@Controller('practice')
@UseGuards(JwtAuthGuard)
export class PracticeController {
    constructor(private readonly practiceService: PracticeService) { }

    // ─── Flashcards ─────────────────────────────────────────

    @Post('flashcards/generate')
    async generateFlashcards(@Request() req: any, @Body() dto: GenerateDto) {
        return this.practiceService.generateFlashcards(req.user.id, dto.topic);
    }

    @Get('flashcards')
    async getDecks(@Request() req: any) {
        return this.practiceService.getDecks(req.user.id);
    }

    @Get('flashcards/:id')
    async getDeck(@Request() req: any, @Param('id') id: string) {
        return this.practiceService.getDeck(id, req.user.id);
    }

    @Post('flashcards/:cardId/review')
    async reviewCard(@Param('cardId') cardId: string, @Body() dto: ReviewCardDto) {
        return this.practiceService.reviewCard(cardId, dto.quality);
    }

    @Delete('flashcards/:id')
    async deleteDeck(@Request() req: any, @Param('id') id: string) {
        return this.practiceService.deleteDeck(id, req.user.id);
    }

    // ─── Quizzes ────────────────────────────────────────────

    @Post('quiz/generate')
    async generateQuiz(@Request() req: any, @Body() dto: GenerateDto) {
        return this.practiceService.generateQuiz(req.user.id, dto.topic);
    }

    @Post('quiz/submit')
    async submitQuiz(@Request() req: any, @Body() dto: SubmitQuizDto) {
        return this.practiceService.submitQuiz(req.user.id, dto.topic, dto.score, dto.totalQs, dto.weakAreas);
    }

    @Get('quiz/history')
    async getQuizHistory(@Request() req: any) {
        return this.practiceService.getQuizHistory(req.user.id);
    }
}
