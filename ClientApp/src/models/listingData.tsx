import User from "./userData";

export default interface listing{
    id: string,
    postDate: String,
    postContent: string,
    flagged: boolean,
    skillSet: string,
    expectedRate: string,
    user: User
}