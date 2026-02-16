import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreatePathDto {
    @IsString()
    @IsNotEmpty()
    topic: string;

    @IsString()
    @IsNotEmpty()
    goal: string; // EXAM, SKILL, INTERVIEW, CURIOSITY, CERTIFICATION

    @IsOptional()
    @IsString()
    level?: string; // beginner, intermediate, advanced
}

export class UpdateNodeDto {
    @IsString()
    @IsNotEmpty()
    status: string; // ACTIVE, COMPLETED
}
