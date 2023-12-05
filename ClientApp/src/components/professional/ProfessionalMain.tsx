import React from "react";
import { Component } from "react";
import UpdateListingModal from "../common/Modals/UpdateListingModal";
import CreateListingModal from "../common/Modals/CreateListingModal";
import usePutListingModal from "../common/Hooks/usePutListingModal";
import useCreateListingModal from "../common/Hooks/useCreateListingModal";
import "./ProfessionalMain.css";
import Listings from "./Listings"

export default function ProfessionalMain(props:any) {

	const {isOpen, toggle} = useCreateListingModal();
	return (
		<div className="professional-container">
			<h1>View Listings</h1>
			<button onClick={toggle} className="create-listing-button">Create a new Listing</button>
			<CreateListingModal isOpen={isOpen} toggle={toggle} currentUser={props.currentUser}></CreateListingModal>
			<div className="listings">
				<Listings currentUser={props.currentUser}/>
			</div>
			
		</div>
    );
    
  }
