interface IAdmin {
    username: string;
    password: string;
    isPasswordMatch: (password: string) => boolean;
}



export default IAdmin