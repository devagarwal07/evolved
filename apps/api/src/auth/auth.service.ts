
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && user.passwordHash) {
            const isMatch = await argon2.verify(user.passwordHash, pass);
            if (isMatch) {
                const { passwordHash, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Create payload
        const payload = { email: user.email, sub: user.id, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
            user: user,
        };
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        // Hash is handled by UsersService.create
        const user = await this.usersService.create({
            email: registerDto.email,
            name: registerDto.name,
            passwordHash: registerDto.password, // UsersService will hash this
            provider: 'email',
        });

        const payload = { email: user.email, sub: user.id, role: user.role };
        const { passwordHash: _, ...safeUser } = user;
        return {
            access_token: this.jwtService.sign(payload),
            user: safeUser,
        };
    }
}
