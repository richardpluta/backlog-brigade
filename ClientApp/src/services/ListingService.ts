import { Listing } from "../models/listing/Listing";
import listing from "../models/listingData";

export const GetAllListings = async (token:string) => {   
    return await fetch(`/api/listing`, {
        headers : {
            Authorization: `Bearer: ${token}`
        }
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const DeleteListingAsync = async(token:string, id:number) => {
    return await fetch(`/api/listing/${id}`, {
        method: "DELETE",
        headers : {
            Authorization: `Bearer: ${token}`,
            "Content-Type": "application/json"
        },
    })
    .then()
    .catch((err) => console.log(err));
  }

export const CreateListing = async (data: Listing) => {
    
    const body = JSON.stringify(data);

    const response = await fetch('/api/listing',
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

export const GetListings = async () => {
  const response = await fetch('api/listing', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  }).then(response => response.json());

  return response as Listing[];
}