import helpWanted from "../models/helpWantedData";
import helpWantedData from "../models/helpWantedData";
 
export const HelpWantedService = async (data:helpWanted) => {
    
    const body = JSON.stringify(data);

    const response = await fetch('api/helpwanted',
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