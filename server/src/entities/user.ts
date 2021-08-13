import IUser from "./interfaces/user";

export default class User implements IUser {
    public readonly _id: string; 
    public readonly first_name: string; 
    public readonly last_name: string; 
    public readonly mobile_phone: string; 
    public readonly email: string; 
    constructor({
        _id, 
        first_name, 
        last_name, 
        mobile_phone, 
        email, 
    } : IUser) {
        this._id = _id || ''; 
        this.first_name = first_name; 
        this.last_name = last_name; 
        this.mobile_phone = mobile_phone; 
        this.email = email; 
    }

    private validateEmail(email: string) {
        const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return emailRegex.test(email);
    }
}