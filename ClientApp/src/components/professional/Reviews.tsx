import React, { useEffect, useState } from 'react'

import { Button, Card, CardBody, CardFooter, CardSubtitle, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Review from '../../models/reviewData';
import { GetReviewsForUser, UpdateReview } from '../../services/ReviewService';

import "./Reviews.css"
import User from '../../models/userData';
import { LoggedInUser } from '../../models/user/LoggedInUser';

export default function Reviews({currentUser} : {currentUser: User | undefined}){
	const [reviews, setReviews] = useState<Review[]>([]);
	const [showReplyModal, setShowReplyModal] = useState(false);
	const [reply, setReply] = useState("");

	const GetReviews = () => {
		if(currentUser != undefined)
		GetReviewsForUser(currentUser?.id).then(reviews => {
			setReviews(reviews);
		});
	}

	useEffect(() => {
		GetReviews();
	}, []);

	const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setReply(event.target.value);
	}

	const closeReplyModal = (createReply: boolean, review: Review) => {
		if (createReply) {
			review.replyComment = reply;

			UpdateReview(review).then(() => {
				setShowReplyModal(false)
			});
		} else {
			setShowReplyModal(false)
		}
	}

	const reviewTemplate = reviews.map(review => {
		return(
			<>
			<Card className='review'>
				<CardTitle>
					{review.postUser?.userName}
				</CardTitle>
				<CardBody>
					{review.postContent}
				</CardBody>
				{
					review.replyComment ?
					<CardSubtitle>
					Professional Response
					</CardSubtitle>
					: null
				}
				{
					review.replyComment ?
					<CardBody>
					{review.replyComment}
					</CardBody>
					: null
				}
				{
					!review.replyComment ?
					<CardBody>
						<Button onClick={() => setShowReplyModal(true)}>
							Respond
						</Button>
					</CardBody>
					: null
				}	
			</Card>
			<Modal isOpen={showReplyModal}>
				<ModalHeader>Reply to Review</ModalHeader>
				<ModalBody>
					<input value={reply} onChange={(e) => handleReplyChange(e)}></input>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={() => closeReplyModal(true, review)}>
						Create
					</Button>
					<Button color="secondary" onClick={() => closeReplyModal(false, review)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
		);
	})

	return (
	  	<>
		{reviews.length > 0 &&
			{reviewTemplate}
		}
		{reviews.length == 0 &&
			<Card
				color="light"
				className="text-center">
					<b>No reviews found!</b>
			</Card>
		}
		</>
	)
}
