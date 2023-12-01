import React from "react";
import { Component } from "react";
import CreateHelpWantedModal from "../common/Modals/CreateHelpWantedModal";
import useCreateHelpWantedModal from "../common/Hooks/useCreateHelpWantedModal";
import "./ClientMain.css";
import HelpWanteds from "./HelpWanteds"

export default function ClientMain() {

	const {isOpen, toggle} = useCreateHelpWantedModal();
    return (
		<div className="client-container">
			<h1>View Help Wanteds</h1>
			<button onClick={toggle} className="create-helpwanted-button">Create a new Help Wanted</button>
			<CreateHelpWantedModal isOpen={isOpen} toggle={toggle}></CreateHelpWantedModal>
			<div className="sorting">
				<label>General Search:</label>
				<input className="sortingInput" id="generalSearch" />
				<label>Skill/Service Sort:</label>
				<input className="sortingInput" id="skillSort" />
				<label>Highest Price Sort:</label>
				<input className="sortingInput" id="priceSort" />
				<label>Location Sort:</label>
				<input className="sortingInput" id="locationSort" />		
			</div>
				<button className="applyButton">Apply Filters and Searches</button>		
			<div className="helpwanteds">
				<HelpWanteds />
			</div>
			
		</div>
    );
    
  }