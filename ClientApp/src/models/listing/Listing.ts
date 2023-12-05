import { LoggedInUser } from "../user/LoggedInUser";

export interface Listing {
    id:           number;
    userId:       number;
    postContent:  string;
    creationDate: Date;
    content:      string;
    flagged:      boolean;
    skillSet:     number;
    expectedRate: number;
}

export interface UserListing {
    listing : Listing;
    user?: LoggedInUser;
}