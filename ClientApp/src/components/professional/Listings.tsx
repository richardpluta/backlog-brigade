import React, { useEffect, useState } from 'react'
import flag from '../../../public/assets/red-flag-icon.png'
import "./Listings.css"
import UpdateListingModal from '../common/Modals/UpdateListingModal';
import usePutListingModal from '../common/Hooks/usePutListingModal';
import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Review from '../../models/reviewData';
import { CreateReview } from '../../services/ReviewService';
import User from '../../models/userData';
import { DeleteListing, GetListings, UpdateListing } from '../../services/ListingService';
import { Skillset } from '../../models/user/LoggedInUser';
import { format } from 'date-fns';
import { BsChatDotsFill } from "react-icons/bs";
import Listing from '../../models/listingData';
import { FaFlag } from 'react-icons/fa';
import { RiMapPin3Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function Listings({currentUser} : {currentUser: User}){
	let navigate = useNavigate();
	const [listings, setListings] = useState<Listing[]>([]);
	const [listingData, setListingData] = useState<Listing>();
	const [showListingModal, setShowListingModal] = useState(false);
	const [showReviewModal, setShowReviewModal] = useState(false);
	const [listingModalData, setListingModalData] = useState<Listing>();
	const [reviewModalData, setReviewModalData] = useState<Review>({
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

	const openListingModal = (listing: Listing) => {
		setListingModalData(listing)
		setShowListingModal(true)
	}

	const openReviewModal = (listing: Listing) => {
		setReviewModalData({...reviewModalData, reviewedUserId: listing.userId})
		setShowReviewModal(true)
	}

	const closeListingModal = (updateListing: boolean) => {
		if (updateListing && listingModalData) {
			UpdateListing(listingModalData).then(listing => {
				listings[listings.findIndex(x => x.id === listing.id)] = listing;
				setListings(listings);
				setShowListingModal(false);
			})
		} else {
			setShowListingModal(false);
		}
	}

	const closeReviewModal = (createListing: boolean) => {
		if (createListing && reviewModalData) {
			CreateReview(reviewModalData).then(() => {
				setShowReviewModal(false)
			});
		} else {
			setShowReviewModal(false)
		}
	}

	const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setReviewModalData({...reviewModalData, postContent: event.target.value})
	}

	const deleteListings = (listing: Listing) => {
		if (listing.id) {
			DeleteListing(listing.id).then(() => {
				setListings(listings.filter(x => x.id != listing.id));
			});
		}	
	}

	async function onFlagSubmit(event: React.MouseEvent<HTMLButtonElement>, listing:Listing)
	{
		event.preventDefault();
		listing.flagged = true;
		listing.user = currentUser; 

		await UpdateListing(listing).then(
			(res:any) => {
				window.location.reload();
			}	
		)
	}

	const routeChange = (id: number | undefined) => {
		if(id!= undefined)
		navigate(`/profile/${id}`);
	  };

	async function openEditListingModal(event: React.MouseEvent<HTMLButtonElement>, listing: Listing){
		
		event.preventDefault();
		setListingData(listing);
		toggle();
	}

	const loadedListings = listings.map(listing => {

		return(
			<Card 
				style={{backgroundColor:listing.flagged ? "lightcoral" : "lightgray", border:"solid black 1px", width:"30%"}}
				key={listing.id}>
				<Row className="text-center">
					<RiMapPin3Fill />
				</Row>
				<Row>
					<Col md={7}>
						<h5>{listing.creationDate != undefined ? format(new Date(listing.creationDate), "MM-dd-yyyy") : "--"}</h5>
					</Col>
					<Col>
						<h5>{listing.skillSet != undefined ? Skillset[listing?.skillSet] : "--"}</h5>
					</Col>
				</Row>
				<Row className="text-center">
					<h5>{listing.postContent}</h5>
				</Row>
				<Row>
					<Col md={6}>
						<h5>Rate: ${listing.expectedRate}</h5>
					</Col>
					<Col>
	  					<Button style={{backgroundColor:"transparent", border:"none", color:"black", padding:"1px"}} onClick={() => routeChange(listing?.user?.id)}>
							{ listing.user != undefined ? (listing.user?.userName) : "unknown"}
						</Button>
					</Col>
				</Row>						
				<Row>
					{currentUser?.id != listing.userId && (<>
					<Col md={8}>
						<Button inverse color="info" onClick={(e) => {openReviewModal(listing)}}><BsChatDotsFill style={{color:"white"}}/> Review</Button>
					</Col>
					<Col>
						<Button inverse color="primary" onClick={(e) => {onFlagSubmit(e, listing)}}><FaFlag style={{color:"red"}}/> Flag</Button>
					</Col>
					</>)
					}
					{currentUser?.id == listing.userId && (
					<>
					<Col md={8}>
						<Button color="primary" onClick={() => {openListingModal(listing)}}>Edit</Button>
					</Col>
					<Col>
						<Button color="danger" onClick={() => deleteListings(listing)}>Delete</Button>
					</Col>
					</>
					)
					}
				</Row>
			</Card>
		);
	})

	return (
	  	<>
			{loadedListings}
			<Modal isOpen={showListingModal}>
				<ModalHeader>Update Listing</ModalHeader>
				<ModalBody className="modal-body">
					<label htmlFor="rate">Rate:</label>
					<input id="rate" defaultValue={listingModalData?.expectedRate} onChange={(e) => setListingModalData({...listingModalData, expectedRate: Number(e.target.value)})}/>
					<label htmlFor="skills">Relevant Skills:</label>
					<select id="skills"
						value={listingModalData?.skillSet}
						onChange={(e) => setListingModalData({...listingModalData, skillSet: Number(e.target.value)})}>
						{Object.values(Skillset).filter(x => isNaN(Number(x))).map((key, index) => (
							<option key={index} value={index}>
								{key}
							</option>
						))}
					</select>
					<label htmlFor="description">Description:</label>
					<textarea name="description" id="description" defaultValue={listingModalData?.postContent} onChange={(e) => setListingModalData({...listingModalData, postContent: e.target.value})}/>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={() => closeListingModal(true)}>
						Update
					</Button>
					<Button color="secondary" onClick={() => closeListingModal(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
			<Modal isOpen={showReviewModal}>
				<ModalHeader>Write Review</ModalHeader>
				<ModalBody>
					<input value={reviewModalData?.postContent} onChange={handleReviewChange}></input>
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
