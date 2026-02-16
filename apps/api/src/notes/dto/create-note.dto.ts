import { IsString, IsNotEmpty, MinLength, IsOptional, IsUrl } from 'class-validator';

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    topic: string;

    @IsOptional()
    @IsString()
    sourceUrl?: string;

    @IsOptional()
    @IsString()
    sourceType?: string; // youtube, nptel, coursera, etc.
}
