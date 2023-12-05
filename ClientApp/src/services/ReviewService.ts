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

    return response.json() as Review;
}