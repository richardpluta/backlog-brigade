export const GetCurrentUser = async (token:string, email:string|undefined) => {
    console.log("In GetCurrentUser");
    if(email == undefined)
    {
        return null;
    }
    return await fetch(`api/users/${email}`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}