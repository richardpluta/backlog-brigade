import { Listing } from "../models/listing/Listing";
import listing from "../models/listingData";

export const GetAllListings = async (token:string) => {
    console.log("In GetAllListings");
   
    return await fetch(`/api/listing`, {
        headers : {
            Authorization: `Bearer: ${token}`
        }
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const DeleteListingAsync = async(token:string, listing:Listing) => {
    console.log("In Delete Listing");
    const body = JSON.stringify(listing);
    console.log(body)
    return await fetch(`api/listing`, {
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
 
  //may need to clean this up a bit and move to its own service, lots of logging. 
export const ListingService = async (data:listing) => {
    
    const body = JSON.stringify(data);

    const response = await fetch('api/listing',
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body 
    }
  );
  return response;
}