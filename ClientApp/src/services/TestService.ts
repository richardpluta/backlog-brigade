import listing from "../models/listingData";
import listingData from "../models/listingData";

export const getTestResponse = async () => {
    console.log("In getTestResponse");
    const response = await fetch("api/testget"
    ).then((response) => response.json());
    return response;
  };

  
  //may need to clean this up a bit and move to its own service, lots of logging. 
  export const testPostListing = async (data:listing) => {
    console.log(data);
    const body = JSON.stringify(data);
    console.log(body);
    console.log("In TestPostListing");

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
