import { LoggedInUser } from "../user/LoggedInUser";

export interface Listing {
    id:           number;
    userId:       number;
    creationDate: Date;
    content:      string;
    flagged:      boolean;
    skillSet:     number;
    expectedRate: number;
    user?:        LoggedInUser;
}