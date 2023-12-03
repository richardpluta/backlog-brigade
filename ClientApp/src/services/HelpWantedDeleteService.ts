
  //may need to clean this up a bit and move to its own service, lots of logging. 
  export const HelpWantedDeleteService = async (id:number) => {
    
    const response = await fetch('api/helpwanted/' + id,
    {
       	method: 'DELETE',
	   	headers: {
        	"Content-Type": "application/json"
      	},
    }
  );
  return response;
}