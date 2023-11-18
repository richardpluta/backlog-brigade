import listing from "../models/listingData";
import listingData from "../models/listingData";
 
  //may need to clean this up a bit and move to its own service, lots of logging. 
export const ListingPutService = async (data:listing|undefined) => {
    
    const body = JSON.stringify(data);
    console.log(body);
    const response = await fetch('api/listing/' + data?.id.valueOf().toString(),
    {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json"
		},
		body 
    });
  return response;
}