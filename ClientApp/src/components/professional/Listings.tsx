import React, { useEffect, useState } from 'react'
import flag from '../../../public/assets/red-flag-icon.png'
import {ListingDeleteService} from "../../services/ListingDeleteService";
import { ListingPutService } from '../../services/ListingPutService';

import "./Listings.css"
import UpdateListingModal from '../common/Modals/UpdateListingModal';
import usePutListingModal from '../common/Hooks/usePutListingModal';
import { Button, Card, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Review from '../../models/reviewData';
import Listing from '../../models/listingData';
import { CreateReview, GetReviewsForUser } from '../../services/ReviewService';
import User from '../../models/userData';
import { GetListings } from '../../services/ListingService';
import { Skillset } from '../../models/user/LoggedInUser';
import { format } from 'date-fns';
import { BsChatDotsFill } from "react-icons/bs";

export default function Listings({currentUser} : {currentUser: User}){
	const [listings, setListings] = useState<Listing[]>([]);
	const [listingData, setListingData] = useState<Listing>();
	const [showReviewModal, setShowReviewModal] = useState(false);
	const [reviewModal, setReviewModal] = useState<Review>({
		postUserId: currentUser.id,
		reviewedUserId: 0,
		postContent: "",
		flagged: false,
		replyComment: ""
	});

	const {isOpen, toggle} = usePutListingModal();

	useEffect(() => {
		GetListings().then(listings => setListings(listings));
	}, []);

	const openReviewModal = (listing: Listing) => {
		setReviewModal({...reviewModal, reviewedUserId: listing.userId})
		setShowReviewModal(true)
	}

	const closeReviewModal = (createListing: boolean) => {
		if (createListing && reviewModal) {
			CreateReview(reviewModal).then(() => {
				setShowReviewModal(false)
			});
		} else {
			setShowReviewModal(false)
		}
	}

	const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setReviewModal({...reviewModal, postContent: event.target.value})
	}

	async function deleteListings(event: React.MouseEvent<HTMLButtonElement>){
		event.preventDefault();
		const deleteId = event.currentTarget.parentElement?.parentElement?.childNodes[0].childNodes[0].childNodes[0].nodeValue;
		await ListingDeleteService(Number(deleteId))
		.then((res:any) => {
			window.location.reload()
		});
	}

	async function openEditListingModal(event: React.MouseEvent<HTMLButtonElement>, listing: Listing){
		
		event.preventDefault();
		setListingData(listing);
		toggle();
	}

	const loadedListings = listings.map(listing => {

		return(
			<Card 
				style={{backgroundColor:listing.flagged ? "lightcoral" : "lightgray", border:"solid black 1px"}}
				key={listing.id}>
				<Row>
					<Col md={9}>
						<h5>{listing.postDate != undefined ? format(new Date(listing.postDate), "MM-dd-yyyy") : "--"}</h5>
					</Col>
					<Col>
						<h5>{listing.skillSet != undefined ? Skillset[listing?.skillSet] : "--"}</h5>
					</Col>
				</Row>
				<Row className="text-center">
					<h4>{listing.postContent}</h4>
				</Row>
				<Row>
					<Col md={9}>
						<h4>Rate: ${listing.expectedRate}</h4>
					</Col>
					<Col>
						{listing.user?.userName}
					</Col>
				</Row>						
				<div className='cardFooter'>
					<p className='cardFooter-element'>{listing.flagged}</p>
					<img src={flag} alt="Flagged" className='cardFooter-flagIcon'/>
					<Button onClick={(e) => {openReviewModal(listing)}}><BsChatDotsFill/> Review</Button>
					<Button  onClick={(e) => {openEditListingModal(e, listing)}}>Edit</Button>
					<Button  onClick={deleteListings}>Delete</Button>
				</div>
			</Card>
		);
	})

	return (
	  	<>
			<div className='updateListingModal'>
				<UpdateListingModal isOpen={isOpen} toggle={toggle} data={listingData}></UpdateListingModal>
			</div>
			{loadedListings}
			<Modal isOpen={showReviewModal}>
				<ModalHeader>Write Review</ModalHeader>
				<ModalBody>
					<input value={reviewModal?.postContent} onChange={handleReviewChange}></input>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={() => closeReviewModal(true)}>
						Create
					</Button>
					<Button color="secondary" onClick={() => closeReviewModal(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	)
}
