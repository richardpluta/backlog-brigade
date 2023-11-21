import User from "./userData";

//updated this object type so that its data types matched backend for parsing purposes
export default class helpWanted{
    id?: number
    userId?: number
    postContent?: string
    postDate?: string
    flagged?: boolean
    skillSet?: number
    expectedRate?: number
    user?: User
}