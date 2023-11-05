import React from "react";
import { Component } from "react";
import CreateListingModal from "../common/Modals/CreateListingModal";
import useCreateListingModal from "../common/Hooks/useCreateListingModal";
import "./ProfessionalMain.css";
import ListingList from "./ListingList";

export default function ProfessionalMain() {

	const {isOpen, toggle} = useCreateListingModal();
    return (
		<div className="professional-container">
			<h1>View Listings</h1>
			<button onClick={toggle} className="create-listing-button">Create a new Listing</button>
			<CreateListingModal isOpen={isOpen} toggle={toggle}></CreateListingModal>
			<ListingList />
			
		</div>
    );
    
  }
