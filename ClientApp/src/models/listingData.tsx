import User from "./userData";

//updated this object type so that its data types matched backend for parsing purposes
export default interface listing{
    id: number,
    userId: number,
    postDate: String,
    postContent: string,
    flagged: boolean,
    skillSet: number,
    expectedRate: number
    user: User
}