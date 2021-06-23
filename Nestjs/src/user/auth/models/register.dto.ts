import {IsEmail, IsNotEmpty, IsPhoneNumber} from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber('NL')
    phonenumber: string;

    authentication: boolean;
}
