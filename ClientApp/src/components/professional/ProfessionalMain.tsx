import React from "react";
import CreateListingModal from "../common/Modals/CreateListingModal";
import useCreateListingModal from "../common/Hooks/useCreateListingModal";
import "./ProfessionalMain.css" 
import Listings from "./Listings"
import Reviews from "./Reviews";
import User from "../../models/userData";
import { Button, Card, Col, Row } from "reactstrap";

export default function ProfessionalMain({currentUser} : {currentUser: User}) {
	const {isOpen, toggle} = useCreateListingModal();
	return (
		<>
		<Row>
			<Col md={7} className="text-center">
				<h3>Current Listings</h3>
				<Button color="primary" onClick={toggle}>Create Listing</Button>
			</Col>
			<Col>
				<Col className="professional-column">
					<h3>Your Reviews</h3>
				</Col>
			</Col>
		</Row>
				<CreateListingModal currentUser={currentUser} isOpen={isOpen} toggle={toggle}></CreateListingModal>
		<Row>
			<Col md={7}>
				<Card style={{margin: "5px", border: "black solid 1px", backgroundColor: "#0084AE"}}>
					<Listings currentUser={currentUser}/>
				</Card> 
			</Col>
				
			<Col>
				<div className="data-list">
					<Reviews currentUser={currentUser}/>
				</div>
			</Col>
		</Row>
			
			</>
    );
  }
