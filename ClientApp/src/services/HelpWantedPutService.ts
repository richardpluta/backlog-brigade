import helpWanted from "../models/helpWantedData";

export const HelpWantedPutService = async (data:helpWanted|undefined) => {
    
    const body = JSON.stringify(data);
    console.log(body);
    const response = await fetch('api/helpwanted/' + data?.id.valueOf().toString(),
    {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json"
		},
		body 
    });
  return response;
}