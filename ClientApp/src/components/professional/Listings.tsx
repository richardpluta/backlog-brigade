import React, { useEffect, useState } from 'react'
import Listing from '../../models/listingData'
import flag from '../../../public/assets/red-flag-icon.png'
import {ListingDeleteService} from "../../services/ListingDeleteService";
import { ListingPutService } from '../../services/ListingPutService';

import "./Listings.css"
import listing from '../../models/listingData';
import UpdateListingModal from '../common/Modals/UpdateListingModal';
import usePutListingModal from '../common/Hooks/usePutListingModal';
import { Button, Card, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
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

export default function Listings({currentUser} : {currentUser: User}){
	let navigate = useNavigate();
	const [listings, setListings] = useState<Listing[]>([]);
	const [listingData, setListingData] = useState<Listing>();
	const [showReviewModal, setShowReviewModal] = useState(false);
	const [postContentFilter, setPostContentFilter] = useState("");
	const [priceFilter, setPriceFilter] = useState("");
	const [userNameFilter, setUserNameFilter] = useState("");
	const [currentSkillsetFilter, setCurrentSkillset] = React.useState<number | undefined>();
	const [reviewModal, setReviewModal] = useState<Review>({
		postUserId: currentUser.id,
		reviewedUserId: 0,
		postContent: "",
		flagged: false,
		replyComment: ""
	});

	const GetData = () => {
		let filterParameters: {[key: string]: string} = {}

		if (postContentFilter) {
			filterParameters["postContent"] = postContentFilter;
		}

		if (priceFilter) {
			filterParameters["expectedRate"] = priceFilter;
		}

		if (userNameFilter) {
			filterParameters["userName"] = userNameFilter;
		}

		if(currentSkillsetFilter !== undefined)
		{
			filterParameters["skillSet"] = currentSkillsetFilter.toString();
		}

		GetListings(filterParameters).then(result => setListings(result))
	}

	useEffect(() => {
		GetData();
	}, []);

	const {isOpen, toggle} = usePutListingModal();

	// useEffect(() => {
	// 	GetListings().then(listings => setListings(listings));
	// }, []);

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
		api();
	}, []);

	async function deleteListings(event: React.MouseEvent<HTMLButtonElement>){
		event.preventDefault();
		const deleteId = event.currentTarget.parentElement?.parentElement?.childNodes[0].childNodes[0].childNodes[0].nodeValue;
		await ListingDeleteService(Number(deleteId))
		.then((res:any) => {
			window.location.reload()
		});

	}

	async function openEditListingModal(event: React.MouseEvent<HTMLButtonElement>, listing:listing){
		
		event.preventDefault();
		setListingData(listing);
		toggle();
	}

	//const listings = [<div> Listing 1</div>, <div> Listing 2</div>, <div> Listing 3</div>];

	const {isOpen, toggle} = usePutListingModal();

	const loadedListings = result.map(listing => {

		return(
			<>
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
							<Button inverse color="primary" onClick={(e) => {openReviewModal(listing)}}><FaFlag style={{color:"red"}}/> Flag</Button>
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
			</>
		);
	})

	return (
	  	<>
			<div className='updateListingModal'>
				<UpdateListingModal isOpen={isOpen} toggle={toggle} data={listingData}></UpdateListingModal>
			</div>
			<Card
				style={{backgroundColor:"light", border:"1px black solid", margin:"3px"}}
			>
				<Row className="text-center">
				<Col>
					<h5>Filter Content</h5>
				</Col>
			</Row>
			<Row>
				<Col>
					<Label>Content Search:</Label>
					<Input className="sortingInput" id="contentSearch" value={postContentFilter} onChange={(e) => setPostContentFilter(e.target.value)}/>
				</Col>
				<Col>
					<Label>By Highest Price:</Label>
					<Input className="sortingInput" id="priceSort" />
				</Col>
			</Row>
			<Row>
				<Col>
					<Label>By Location:</Label>
					<Input className="sortingInput" id="locationSort" />	
				</Col>
				<Col>
				<Label>Skill/Service Sort:</Label>
					<Input id="skills"
						type="select"
									value={currentSkillsetFilter?.toString()}
									onChange={(e) => setCurrentSkillset(Number(e.target.value))}
								>
									{Object.values(Skillset).filter(x => isNaN(Number(x))).map((key, index) => (
										<option key={index} value={index}>
											{key}
										</option>
									))}
								</Input>
				</Col>
				<Col className="text-center" style={{marginTop:"20px"}}>
					<Button size="lg" color="warning" onClick={() => GetData()}>Apply</Button>
				</Col>
			</Row>
			</Card>
			{loadedListings}
		</>
	)
}
