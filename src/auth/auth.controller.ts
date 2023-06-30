import { Controller, HttpStatus, HttpCode, Body, Post } from '@nestjs/common';
import { AuthService } from './shared/auth/auth.service';
import { AuthUser } from './shared/auth.user/auth.user';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() authUser: AuthUser): any {
        return this.authService.signIn(authUser.email, authUser.password);
    }
}
