import { LoggedInUser } from "../user/LoggedInUser";
import User from "../userData";

export interface Listing {
    id:           number;
    userId:       number;
    postContent:  string;
    creationDate: Date;
    flagged:      boolean;
    skillSet:     number;
    expectedRate: number;
    user?: User;
}
