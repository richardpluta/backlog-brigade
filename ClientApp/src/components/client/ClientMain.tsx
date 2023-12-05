import React from "react";
import { Component } from "react";
import CreateHelpWantedModal from "../common/Modals/CreateHelpWantedModal";
import useCreateHelpWantedModal from "../common/Hooks/useCreateHelpWantedModal";
import "./ClientMain.css";
import HelpWanteds from "./HelpWanteds"
import User from "../../models/userData";

export default function ClientMain({currentUser} : {currentUser: User}) {

	const {isOpen, toggle} = useCreateHelpWantedModal();
    return (
		<div className="client-container">
			<h1>View Help Wanteds</h1>
			<button onClick={toggle} className="create-helpwanted-button">Create a new Help Wanted</button>
			<CreateHelpWantedModal isOpen={isOpen} toggle={toggle} currentUser={currentUser}></CreateHelpWantedModal>
			<div className="helpwanteds">
				<HelpWanteds currentUser={currentUser as User}/>
			</div>
			
		</div>
    );
    
  }