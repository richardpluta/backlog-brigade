import { LoggedInUser, Skillset } from "../user/LoggedInUser";


export interface TestResponseObject {
    id: number;
    userId: number;
    content: string;
    creationDate: Date;
    flagged: boolean;
    skillSet: Skillset;
    expectedRate: number;
    user?: LoggedInUser;
}