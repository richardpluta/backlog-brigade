import React from "react";
import CreateListingModal from "../common/Modals/CreateListingModal";
import useCreateListingModal from "../common/Hooks/useCreateListingModal";
import "./ProfessionalMain.css" 
import Listings from "./Listings"
import Reviews from "./Reviews";
import User from "../../models/userData";
import { Button, Card, Col, Modal, Row } from "reactstrap";

export default function ProfessionalMain({currentUser} : {currentUser: User}) {
	const {isOpen, toggle} = useCreateListingModal();
	return (
		<>
		<Row>
			<Col className="text-center">
				<h3>Current Listings</h3>	
			</Col>
		</Row>
		<Row>
			<Col md={10}>
				<Button color="primary" onClick={toggle}>Create Listing</Button>
			</Col>
			<Col md={2}>
				<Button style={{marginLeft:"75px"}} color="info">View Reviews</Button>
			</Col>
		</Row>
				<CreateListingModal currentUser={currentUser} isOpen={isOpen} toggle={toggle}></CreateListingModal>
		<Row>
			<Col>
				<Card style={{marginTop: "5px", border: "black solid 1px", backgroundColor: "#0084AE",
							display: "flex", flexWrap: "wrap", justifyContent: "space-around",
							flexDirection: "row"}}>
					<Listings currentUser={currentUser}/>
				</Card> 
			</Col>
		</Row>
		<Modal>
			<Col>
				<div className="data-list">
					<Reviews currentUser={currentUser}/>
				</div>
			</Col>
		</Modal>
			</>
    );
  }
