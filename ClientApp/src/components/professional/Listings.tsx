import React, { useEffect, useState } from 'react'
import flag from '../../../public/assets/red-flag-icon.png'
import {ListingDeleteService} from "../../services/ListingDeleteService";
import "./Listings.css"
import UpdateListingModal from '../common/Modals/UpdateListingModal';
import usePutListingModal from '../common/Hooks/usePutListingModal';
import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Review from '../../models/reviewData';
import { CreateReview } from '../../services/ReviewService';
import User from '../../models/userData';
import { GetListings } from '../../services/ListingService';
import { Skillset } from '../../models/user/LoggedInUser';
import { format } from 'date-fns';
import { BsChatDotsFill } from "react-icons/bs";
import { Listing } from '../../models/listing/Listing';
import { FaFlag } from 'react-icons/fa';
import { RiMapPin3Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ListingPutService } from '../../services/ListingPutService';

export default function Listings({currentUser} : {currentUser: User}){
	let navigate = useNavigate();
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

	async function onFlagSubmit(event: React.MouseEvent<HTMLButtonElement>, listing:Listing)
	{
		event.preventDefault();
		listing.flagged = true;
		listing.user = currentUser; 

		await ListingPutService(listing).then(
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
						<Button color="primary" onClick={(e) => {openEditListingModal(e, listing)}}>Edit</Button>
					</Col>
					<Col>
						<Button color="danger" onClick={deleteListings}>Delete</Button>
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
		<UpdateListingModal isOpen={isOpen} currentUser={currentUser} toggle={toggle} data={listingData}/>
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
