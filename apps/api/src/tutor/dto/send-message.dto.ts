import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SendMessageDto {
    @IsString()
    @IsNotEmpty()
    sessionId: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    content: string;
}
