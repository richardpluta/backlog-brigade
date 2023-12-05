import React from "react";
import { Component } from "react";
import UpdateListingModal from "../common/Modals/UpdateListingModal";
import CreateListingModal from "../common/Modals/CreateListingModal";
import usePutListingModal from "../common/Hooks/usePutListingModal";
import useCreateListingModal from "../common/Hooks/useCreateListingModal";
import "./ProfessionalMain.css";
import Listings from "./Listings"
import Reviews from "./Reviews";
import User from "../../models/userData";

export default function ProfessionalMain({currentUser} : {currentUser: User}) {
	const {isOpen, toggle} = useCreateListingModal();
	return (
		<div className="professional-container">
			<div className="professional-column">
				<h1>View Listings</h1>
				<button onClick={toggle} className="create-listing-button">Create a new Listing</button>
				<CreateListingModal currentUser={currentUser} isOpen={isOpen} toggle={toggle}></CreateListingModal>
				<div className="data-list">
					<Listings currentUser={currentUser}/>
				</div> 
			</div>
			<div className="professional-column">
				<h1>Your Reviews</h1>
				<div className="data-list">
					<Reviews currentUser={currentUser}/>
				</div>
			</div>
		</div>
    );
  }
