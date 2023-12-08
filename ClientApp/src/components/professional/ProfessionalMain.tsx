import React, { useState } from "react";
import useCreateListingModal from "../common/Hooks/useCreateListingModal";
import "./ProfessionalMain.css" 
import Listings from "./Listings"
import User from "../../models/userData";
import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Listing from "../../models/listingData";
import { Skillset } from "../../models/skillSet";
import { CreateListing } from "../../services/ListingService";

export default function ProfessionalMain({currentUser} : {currentUser: User}) {
	let navigate = useNavigate();
	const {isOpen, toggle} = useCreateListingModal();
	const [showListingModal, setShowListingModal] = useState(false);
	const [listingModalData, setListingModalData] = useState<Listing>();

	const openListingModal = () => {
		let listing: Listing = {
			userId: currentUser.id,
			user: currentUser
		}
		setListingModalData(listing)
		setShowListingModal(true)
	}

	const closeListingModal = (createListing: boolean) => {
		if (createListing && listingModalData) {
			CreateListing(listingModalData).then(() => {
				window.location.reload()
			})
		} else {
			setShowListingModal(false);
		}
	}

	const routeChange = (id: number) => {
		navigate(`/profile/${id}`);
	  };
	
	return (
		<>
			<Row>
				<Col className="text-center">
					<h3>Current Listings</h3>	
				</Col>
			</Row>
			<Row>
				<Col md={10}>
					<Button color="primary" onClick={() => openListingModal()}>Create Listing</Button>
				</Col>
				<Col md={2}>
					<Button onClick={() => routeChange(currentUser.id)} style={{marginLeft:"75px"}} color="info">View Reviews</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<Card style={{marginTop: "5px", border: "black solid 1px", backgroundColor: "#0084AE",
								display: "flex", flexWrap: "wrap", justifyContent: "space-around",
								flexDirection: "row"}}>
						<Listings currentUser={currentUser}/>
					</Card> 
				</Col>
			</Row>
			<Modal isOpen={showListingModal}>
				<ModalHeader>Create Listing</ModalHeader>
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
						Create
					</Button>
					<Button color="secondary" onClick={() => closeListingModal(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
    );
  }
