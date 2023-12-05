import Listing from "../models/listingData";
import listingData from "../models/listingData";
 
  //may need to clean this up a bit and move to its own service, lots of logging. 
export const ListingPostService = async (data:Listing) => {
    
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