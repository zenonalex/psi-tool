import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './shared/user/user.service';
import { User } from './shared/user/user';
import { UserTypes } from './shared/user/utils/user.types';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async createUser(@Body() user: User): Promise<User> {
        const users = await this.getAllUsers();

        users.forEach(function (registredUser) {
            if (registredUser.email == user.email) {
                throw new HttpException(`This email address is already used by ${registredUser.name}`, HttpStatus.CONFLICT);
            }
        });

        if (user.userTypes != undefined && user.name != undefined && user.email != undefined && user.companyId != undefined) {

            if (user.userTypes.includes(UserTypes.CUSTOMER) && user.psiId == undefined) {

                throw new HttpException(`A customer require a psiId`, HttpStatus.BAD_REQUEST);
            }

            user.password = `mudar`;
            user.isFirstAccess = true;

            return this.userService.createNewUser(user);
        }

        throw new HttpException(`name, email and userTypes are required fields`, HttpStatus.BAD_REQUEST);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}
