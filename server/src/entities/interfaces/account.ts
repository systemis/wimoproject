export default interface IAccount {
    _id?: string, 
    name: string,
    email: string,
    password: string, 
    posts: string[] | []
}