import Model from "../enums/model.enums";
import State from "../enums/state.enums";

interface IEvolt{
    img:string;
    serialNumber:string;
    weightLimit:number;
    batteryPercentage:number
    state:State
    model:Model
}

export default IEvolt