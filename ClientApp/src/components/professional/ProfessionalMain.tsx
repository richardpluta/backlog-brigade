import React from "react";
import CreateListingModal from "../common/Modals/CreateListingModal";
import useCreateListingModal from "../common/Hooks/useCreateListingModal";
import "./ProfessionalMain.css";
import Listings from "./Listings"
import Reviews from "./Reviews";
import User from "../../models/userData";
import { Button, Card, Col, Row } from "reactstrap";

export default function ProfessionalMain({currentUser} : {currentUser: User}) {
	const {isOpen, toggle} = useCreateListingModal();
	return (
		<Row>
			<Col className="text-center">
				<h3>Current Listings</h3>
				<Button color="primary" onClick={toggle}>Create Listing</Button>
				<CreateListingModal currentUser={currentUser} isOpen={isOpen} toggle={toggle}></CreateListingModal>
				<Card className="listingslist">
					<Listings currentUser={currentUser}/>
				</Card> 
			</Col>
			<Col className="professional-column">
				<h3>Your Reviews</h3>
				<div className="data-list">
					<Reviews currentUser={currentUser}/>
				</div>
			</Col>
		</Row>
    );
  }
