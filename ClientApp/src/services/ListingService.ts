import listing from "../models/listingData";
import listingData from "../models/listingData";
 
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

export const GetListings = async (filterParameters: {}) => {
  const response = await fetch('api/listing?' + new URLSearchParams(filterParameters),
	{
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  }).then(response => response.json());

  return response as Listing[];
}