import User from "./userData";

//updated this object type so that its data types matched backend for parsing purposes
export default interface review{
    id: number,
    postUser: number,
    reviewedUser: number,
    postDate: string,
    postContent: string,
    replyComment: boolean,
    user: User
}