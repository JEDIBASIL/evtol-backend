import { Trim } from "class-sanitizer";
import { IsEmail, IsString, MinLength } from "class-validator";

class CreateAccountDto {
    @IsEmail()
    @Trim()
    public email!: string;

    @MinLength(6, { message: "minimum character should be 6" })
    public password!: string;
}

class LoginDto {
    @IsEmail()
    @Trim()
    public email!: string;
    @IsString()
    public password!: string;
}

export { CreateAccountDto, LoginDto }