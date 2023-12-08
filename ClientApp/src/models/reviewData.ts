import User from "./userData";

//updated this object type so that its data types matched backend for parsing purposes
export default class Review{
    id?: number
    postUserId?: number
    reviewedUserId?: number
    postDate?: string
    postContent?: string
    flagged?: boolean
    replyComment?: string
    postUser?: User
    reviewedUser?: User
}