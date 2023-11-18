export const GetAllListings = async (token:string) => {
    console.log("In GetAllListings");
   
    return await fetch(`api/listing`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}