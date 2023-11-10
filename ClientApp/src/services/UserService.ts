import { LoggedInUser } from "../models/user/LoggedInUser";

export const GetCurrentUser = async (token:string, email:string|undefined) => {
    console.log("In GetCurrentUser");
    if(email == undefined)
    {
        return null;
    }
    return await fetch(`api/user/${email}`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const CreateUserAsync = async (token:string, createUserRequest:LoggedInUser) => {
    console.log("In CreateUserAsync");
    const body = JSON.stringify(createUserRequest);

    return await fetch("api/user", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body
    }).then((response) => response.json());
}

export const UpdateUserAsync = async (token:string, updateUserRequest:LoggedInUser) => {
    console.log("In UpdateUserAsync");
    const body = JSON.stringify(updateUserRequest);

    return await fetch("api/user", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body
    }).then((response) => response.json());
}