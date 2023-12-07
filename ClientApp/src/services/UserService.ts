import { LoggedInUser } from "../models/user/LoggedInUser";

export const GetCurrentUser = async (token:string, email:string|undefined) => {
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

export const GetAllUsers = async (token:string) => {   
    return await fetch(`api/user`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const CreateUserAsync = async (token:string, createUserRequest:LoggedInUser) => {
    const body = JSON.stringify(createUserRequest);

    return await fetch("/api/user", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body
    }).then((response) => response.json());
}

export const UpdateUserAsync = async (token:string, updateUserRequest:LoggedInUser) => {
    const body = JSON.stringify(updateUserRequest);

    return await fetch("/api/user", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body
    }).then((response) => response.json());
}

export const DeleteUserAsync = async(token:string, user:LoggedInUser) => {
    const body = JSON.stringify(user);
    return await fetch(`/api/user`, {
        method: "DELETE",
        headers : {
            Authorization: `Bearer: ${token}`,
            "Content-Type": "application/json"
        },
        body
    })
    .then()
    .catch((err) => console.log(err));
}

export const GetUserByIdAsync = async (token:string, id:number) => {
    return await fetch(`/api/user/byid/${id}`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}