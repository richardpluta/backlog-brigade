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