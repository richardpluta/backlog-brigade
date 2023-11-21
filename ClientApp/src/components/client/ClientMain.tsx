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
			<div className="helpWanteds">
				<HelpWanteds />
			</div>
			
		</div>
    );
    
  }