
  //may need to clean this up a bit and move to its own service, lots of logging. 
export const ListingDeleteService = async (id:number) => {
    
    const response = await fetch('api/listing/' + id,
    {
       method: 'DELETE'
    }
  );
  return response;
}