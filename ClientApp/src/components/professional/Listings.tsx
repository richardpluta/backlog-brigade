import React, { useEffect, useState } from 'react'
import flag from '../../../public/assets/red-flag-icon.png'
import {ListingDeleteService} from "../../services/ListingDeleteService";
import { ListingPutService } from '../../services/ListingPutService';

import "./Listings.css"
import UpdateListingModal from '../common/Modals/UpdateListingModal';
import usePutListingModal from '../common/Hooks/usePutListingModal';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Review from '../../models/reviewData';
import Listing from '../../models/listingData';
import { CreateReview, GetReviewsForUser } from '../../services/ReviewService';
import User from '../../models/userData';
import { GetListings } from '../../services/ListingService';

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
			<div key={listing.id} className='card'>
				<div className='cardHeader'>
					<p className='cardHeader-element'>{listing.id}</p>
					<p className='cardHeader-element'>{listing.user?.id}</p>
					<p className='cardHeader-element'>{listing.postDate}</p>
				</div>
				<div className='cardContent'>
					<p>{listing.postContent}</p>
					<p>{listing.skillSet}</p>
					<p>{listing.expectedRate}</p>
				</div>
				<div className='cardFooter'>
					<p className='cardFooter-element'>{listing.flagged}</p>
					<img src={flag} alt="Flagged" className='cardFooter-flagIcon'/>
					<button className='cardFooter-edit' onClick={(e) => {openReviewModal(listing)}}>Review</button>
					<button className='cardFooter-edit' onClick={(e) => {openEditListingModal(e, listing)}}>Edit</button>
					<button className='cardFooter-delete' onClick={deleteListings}>Delete</button>
				</div>
			</div>
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
