import review from "../models/reviewData";
import reviewData from "../models/reviewData";
 
export const ReviewService = async (data:review) => {
    
    const body = JSON.stringify(data);

    const response = await fetch('api/review',
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

export const GetAllReviewsAsync = async (token:string) => {
    
  return await fetch('/api/review/',
  {
  method: 'GET',
  headers: {
    "Content-Type": "application/json"
  },

  }).then((response) => response.json());
}

export const DeleteReviewByIDAsync = async (token:string, id:number) => {
  const response = await fetch('/api/reveiw/' + id,
  {
       method: 'DELETE',
     headers: {
        "Content-Type": "application/json"
      },
  }
);
return response;

}