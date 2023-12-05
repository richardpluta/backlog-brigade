import Listing from "../models/listingData";

export const CreateListing = async (data: Listing) => {
    
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

export const GetListings = async () => {
  const response = await fetch('api/listing', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  }).then(response => response.json());

  return response as Listing[];
}