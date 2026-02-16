import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, Min, Max } from 'class-validator';

export class GenerateDto {
    @IsString()
    @IsNotEmpty()
    topic: string;
}

export class ReviewCardDto {
    @IsNumber()
    @Min(0)
    @Max(5)
    quality: number; // 0=forgot, 3=hard, 4=good, 5=easy
}

export class SubmitQuizDto {
    @IsString()
    @IsNotEmpty()
    topic: string;

    @IsNumber()
    score: number;

    @IsNumber()
    totalQs: number;

    @IsOptional()
    weakAreas?: any;
}
