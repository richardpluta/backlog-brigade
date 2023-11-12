import User from "./userData";

//updated this object type so that its data types matched backend for parsing purposes
export default interface helpWanted{
    id: number,
    userId: number,
    postDate: string,
    postContent: string,
    flagged: boolean,
    skillSet: number,
    expectedRate: number
    user: User
}