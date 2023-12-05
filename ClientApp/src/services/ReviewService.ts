import Review from "../models/reviewData";
 
export const CreateReview = async (review: Review) => {
    
    const body = JSON.stringify(review);

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

export const GetReviewsForUser = async (userId: number) => {
  const response = await fetch(`api/review/user/${userId}`,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    }
  );

  const reviews =  await response.json() as Review[];

  return reviews;
}

export const UpdateReview = async (review: Review) => {
  const body = JSON.stringify(review);

  const response = await fetch(`api/review/${review.id}`,
    {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body 
    }
    );

    return response.json() as unknown  as Review;
}