import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthUser {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
