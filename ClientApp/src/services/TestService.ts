import Listing from "../models/listingData";

export const getTestResponse = async () => {
    const response = await fetch("api/testget"
    ).then((response) => response.json());
    return response;
  };

  
  //may need to clean this up a bit and move to its own service, lots of logging. 
  export const testPostListing = async (data:Listing) => {
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
