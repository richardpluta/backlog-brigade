import React, { useEffect, useState } from 'react'

import { Card, CardBody, CardTitle } from 'reactstrap';
import Review from '../../models/reviewData';
import { GetReviewsForUser } from '../../services/ReviewService';

export default function Reviews(){
	const [reviews, setReviews] = useState<Review[]>([]);

	const GetReviews = () => {
		GetReviewsForUser(42).then(reviews => {
			setReviews(reviews);
		})
	}

	useEffect(() => {
		GetReviews();
	}, []);

	const reviewTemplate = reviews.map(review => {

		return(
			<Card>
				<CardTitle>
					{review.postUser?.userName}:
				</CardTitle>
				<CardBody>
					{review.postContent}
				</CardBody>
			</Card>
		);
	})

	return (
	  	<>
			{reviewTemplate}
		</>
	)
}
