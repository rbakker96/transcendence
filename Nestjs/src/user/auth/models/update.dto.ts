import {IsEmail, IsNotEmpty, IsPhoneNumber} from "class-validator";

export class UpdateDto {
    id?: number;

    avatar?: string;

    username?: string;

    @IsEmail()
    email?: string;

    @IsPhoneNumber('NL')
    phonenumber?: string;

    authentication?: boolean;

    twoFactorSecret?: string;
}