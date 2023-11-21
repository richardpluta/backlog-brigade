import Review from "../models/reviewData";
 
export const CreateReview = async (data: Review) => {
    
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