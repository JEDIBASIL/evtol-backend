interface IUser{
    email:string;
    password:string;
    isPasswordMatch:(password:string) => boolean;
}

export default IUser