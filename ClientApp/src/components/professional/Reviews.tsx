import React, { useEffect, useState } from 'react'

import { Button, Card, CardBody, CardSubtitle, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Review from '../../models/reviewData';
import { GetReviewsForUser, UpdateReview } from '../../services/ReviewService';

import "./Reviews.css"
import User from '../../models/userData';

export default function Reviews({currentUser} : {currentUser: User}){
	const [reviews, setReviews] = useState<Review[]>([]);
	const [showReplyModal, setShowReplyModal] = useState(false);
	const [replyReview, setReplyReview] = useState<Review>();

	const GetReviews = () => {
		GetReviewsForUser(currentUser?.id).then(reviews => {
			setReviews(reviews);
		});
	}

	useEffect(() => {
		GetReviews();
	}, []);

	const openReplyModal = (review: Review) => {
		setReplyReview(review);
		setShowReplyModal(true);
	}

	const closeReplyModal = (createReply: boolean) => {
		if (createReply && replyReview) {
			UpdateReview(replyReview).then(() => {
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
				<CardTitle tag="h5">
					{review.postUser?.userName} said:
				</CardTitle>
				<CardBody>
					Comment: {review.postContent}
				</CardBody>
				{
					review.replyComment ?
					<CardSubtitle>
					<b>Response from user:</b>
					</CardSubtitle>
					: null
				}
				{
					review.replyComment ?
					<CardBody>
					Response: {review.replyComment}
					</CardBody>
					: null
				}
				{
					!review.replyComment ?
					<CardBody>
						<Button onClick={() => openReplyModal(review)}>
							Respond
						</Button>
					</CardBody>
					: null
				}	
			</Card>
			</>
		);
	})

	return (
	  	<>
			{reviews.length > 0 ? reviewTemplate :
				<Card
					color="light"
					className="text-center">
						<b>No reviews found!</b>
				</Card>
			}
			<Modal isOpen={showReplyModal}>
				<ModalHeader>Reply to Review</ModalHeader>
				<ModalBody>
					<input value={replyReview?.replyComment} onChange={(e) => setReplyReview({...replyReview, replyComment: e.target.value})}></input>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={() => closeReplyModal(true)}>
						Create
					</Button>
					<Button color="secondary" onClick={() => closeReplyModal(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	)
}
