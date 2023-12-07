import Listing from "../models/listingData";
import listingData from "../models/listingData";
 
  //may need to clean this up a bit and move to its own service, lots of logging. 
export const ListingPutService = async (data:Listing|undefined) => {
    
    const body = JSON.stringify(data);
    const response = await fetch('api/listing/' + data?.id.valueOf().toString(),
    {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json"
		},
		body: body 
    });
  return response;
}