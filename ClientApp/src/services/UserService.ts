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

export const GetAllUsers = async (token:string) => {
    console.log("In GetAllUsers");
   
    return await fetch(`api/user`, {
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

export const DeleteUserAsync = async(token:string, user:LoggedInUser) => {
    console.log("In Delete User");
    const body = JSON.stringify(user);
    console.log(body)
    return await fetch(`api/user`, {
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
    console.log("In GetCurrentUserById");

    return await fetch(`http://localhost:6035/api/user/byid/${id}`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}