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
import { GetCurrentUser } from '../../services/UserService';

export default function Listings(){

	/*
	const DUMMY_LISTINGS = [
		{
			id: "user1",
			postDate: "11052023",
			postContent: "This is the content of post # 1",
			flagged: false,
			skillSet: "Skill1",
			expectedRate: "$50.00/hr",
			user: {
				userID: "123",
				userType: "type",
				userName: "mrProgramGuy",
				phone: "123-456-7890",
				skillset: "none",
				zip: "12345",
				userRate: "0",
			}
		},
		{
			id: "user2",
			postDate: "11072023",
			postContent: "This is the content of post # 2",
			flagged: false,
			skillSet: "Skill1, skill2",
			expectedRate: "$75.00/hr",
			user: {
				userID: "321",
				userType: "type3",
				userName: "XxMyUsernamexX",
				phone: "098-765-4321",
				skillset: "none",
				zip: "12345",
				userRate: "0",
			}
		},
	];
	*/
	const [listings, setListings] = useState<Listing[]>([]);
	const [listingData, setListingData] = useState<Listing>();
	const [showReviewModal, setShowReviewModal] = useState(false);
	const [reviewModal, setReviewModal] = useState<Review>({
		postUserId: 30,
		reviewedUserId: 42,
		postContent: "",
		flagged: false,
		replyComment: ""
	});

	const {isOpen, toggle} = usePutListingModal();

	useEffect(() => {
		const api = async () => {
			const data = await fetch("api/listing", {method:"GET"});
			const json = await data.json();
			setListings(json);
		}
		api();
	}, []);

	const openReviewModal = (listing: Listing) => {
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
			<div className='card'>
				<div className='cardHeader'>
					<p className='cardHeader-element'>{listing.id}</p>
					<p className='cardHeader-element'>{listing.user?.userID}</p>
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
