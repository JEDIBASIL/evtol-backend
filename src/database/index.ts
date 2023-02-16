import { MONGODB_URI } from "../config";

const dbConnection ={
    uri:MONGODB_URI,
    options:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}
export {dbConnection}