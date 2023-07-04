import { Body, Controller, HttpException, HttpStatus, Post, UseGuards, Request, Get, Query } from '@nestjs/common';
import { UserService } from './shared/user/user.service';
import { User } from './shared/user/user';
import { UserTypes } from './shared/user/utils/user.types';
import { AuthGuard } from '../auth/shared/auth.guard/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(AuthGuard)
    @Post()
    async createUser(@Body() user: User, @Request() req: any): Promise<User> {
        const users = await this.getAllUsers();

        users.forEach(function (registredUser) {
            if (registredUser.email == user.email) {
                throw new HttpException(`This email address is already used by ${registredUser.name}`, HttpStatus.CONFLICT);
            }
        });

        if (user.userTypes != undefined && user.name != undefined && user.email != undefined) {

            if (user.userTypes.includes(UserTypes.CUSTOMER) && user.psiId == undefined) {

                throw new HttpException(`A customer require a psiId`, HttpStatus.BAD_REQUEST);
            }

            user.password = `mudar`;
            user.isFirstAccess = true;
            user.companyId = req.user.companyId;

            return this.userService.createNewUser(user);
        }

        throw new HttpException(`name, email and userTypes are required fields`, HttpStatus.BAD_REQUEST);
    }

    @UseGuards(AuthGuard)
    @Get("/getCustomers")
    async getCustomers(@Query("psiId") psiId: string, @Request() req: any): Promise<User[]> {

        const hasAdminRoles = req.user.userTypes.includes(UserTypes.ADMIN);

        if (hasAdminRoles) {
            return this.userService.getCustomers(req.user.companyId, psiId);
        }
        return this.userService.getCustomers(req.user.companyId, undefined);
    }

    @UseGuards(AuthGuard)
    @Get("/getPsychologists")
    async getPsyhcologists(@Request() req: any): Promise<User[]> {

        const hasAdminRoles = req.user.userTypes.includes(UserTypes.ADMIN);

        if (hasAdminRoles) {
            return this.userService.getPsy(req.user.companyId);
        }

        throw new HttpException(`Only administrators are allowed to search to Psychologists`, HttpStatus.FORBIDDEN);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}
