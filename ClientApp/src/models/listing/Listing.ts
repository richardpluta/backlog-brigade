import { LoggedInUser } from "../user/LoggedInUser";

export interface Listing {
    id:           number;
    userId:       number;
    postContent:  string;
    creationDate: Date;
    flagged:      boolean;
    skillSet:     number;
    expectedRate: number;
    user?: LoggedInUser;
}

export interface UserListing {
    listing : Listing;
    user?: LoggedInUser;
}