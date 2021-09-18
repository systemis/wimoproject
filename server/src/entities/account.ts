import IAccount from "./interfaces/account";

export default class Account implements IAccount {
    public readonly _id: string 
    public readonly name: string
    public readonly email: string
    public readonly password: string
    public readonly posts: string[]
    constructor({
        _id, email, name, password, posts
    }: IAccount) {
        this._id = _id || '';
        this.email = email; 
        this.name = name; 
        this.password = password; 
        this.posts = posts; 
    }
}