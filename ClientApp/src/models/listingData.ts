import User from "./userData";

//updated this object type so that its data types matched backend for parsing purposes
export default class Listing {
    id: number = 0
    userId?: number
    postDate?: string
    postContent?: string
    flagged?: boolean
    skillSet?: number
    expectedRate?: number
    user?: User
}