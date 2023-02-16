import { Trim } from "class-sanitizer";
import { IsEnum, IsNumber, IsString, IsUUID, Max } from "class-validator";
import State from "../enums/state.enums";

class AddEvoltDto {
    
    @IsString()
    @IsUUID()
    serialNumber!: string;

    @IsNumber()
    weightLimit!: number;


    @IsString()
    img!: string
}
export { AddEvoltDto }