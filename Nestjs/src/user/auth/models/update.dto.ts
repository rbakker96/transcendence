import {IsEmail, IsNotEmpty, IsPhoneNumber} from "class-validator";

export class UpdateDto {
    id: number;

    @IsNotEmpty()
    avatar: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber('NL')
    phonenumber: string;

    authentication: boolean;

    twoFactorSecret?: string;
}