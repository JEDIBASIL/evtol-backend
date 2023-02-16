import { Trim } from "class-sanitizer";
import { IsString } from "class-validator";

class AdminLoginDto {
    @IsString()
    @Trim()
    public username!: string;
    @IsString()
    public password!: string
}

export { AdminLoginDto }