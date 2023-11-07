export declare class LoggedInUser {
    userId: string;
    userType: UserType;
    userName: string;
    phone: bigint;
    email: string;
    skillset: Skillset
}

export enum UserType{
    Admin = 0,
    Client = 1,
    Professional = 2
}

export enum Skillset
{
    
    Carpentry = 0,
    Plumbing = 1,
    HVAC = 2,
    Electrical = 3,
    Mechanic = 4,
    Welding = 5,
    Photographer = 6,
    Locksmith = 7,
    Landscaper = 8,
    Paralegal = 9,
    Hairstylist = 10,
    Therapist = 11,
    Drywaller = 12,
    Developer = 13,
    Millwright = 14,
}


