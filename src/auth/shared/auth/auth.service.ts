import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../user/shared/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);

        if (pass == undefined || user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = {
            id: user.id,
            username: user.name,
            userTypes: user.userTypes,
            features: user.features,
            contactPhone: user.contactPhone,
            contactWhatsapp: user.contactWhatsapp,
            notificationToken: user.notificationToken,
            companyId: user.companyId,
            psiId: user.psiId,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
