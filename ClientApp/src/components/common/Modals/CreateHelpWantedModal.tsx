import React, { ReactNode, useState, MouseEvent, FormEvent, useEffect } from "react";
import HelpWanted from "../../../models/helpWantedData";
import "./CreateHelpWantedModal.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoggedInUser from "../../../models/userData";
import {CreateHelpWanted} from "../../../services/HelpWantedService";
import User from "../../../models/userData";
import { Button, Input, Label } from "reactstrap";


interface ModalType {
	children?: ReactNode;
	isOpen: Boolean;
	toggle: () => void;
}

const CreateHelpWantedModal = ({currentUser, isOpen, toggle}: {currentUser: User, isOpen: boolean, toggle: () => void}) => {
	useEffect(() => { }, []);

	const closeModal = useEffect(() => {toggle});
	  
	const onSubmit = async (event: any) => {
		event.preventDefault();

		const target = event.target;

		//updated this to constant data just for testing purposes so i could rule out the form being part of the issue
		const data:HelpWanted = {
			id: 0,
			userId: currentUser.id,
			postContent: target.description.value,
			flagged: false,
			skillSet: Number(target.skills.value),
			expectedRate: Number(target.rate.value),
			user: currentUser
		}

		//moved call to backend to test service, probably should be broken out into a ListingService with the API calls in it
		await CreateHelpWanted(data)
		.then((res:any) => {
			console.log("Post success");
			window.location.reload();
		});
	}

	
	return(

		<>
			{isOpen && (
				<div className="overlay">
					<div className="box">
						<form className="create-helpwanted-form" onSubmit={onSubmit}>
							<h1>Please Enter Help Wanted Information:</h1>
							<div className="field">
								<Label htmlFor="location">Location:</Label>
								<Input id="location" />
							</div>
							<div className="field">
								<Label htmlFor="rate">Rate:</Label>
								<Input id="rate" />
							</div>
							<div className="field">
								<Label htmlFor="skills">Relevant Skills:</Label>
								<Input id="skills" />
							</div>
							<div className="field">
								<Label htmlFor="description">Description:</Label>
								<textarea name="description" id="description"/>
							</div>
							<div>
								<Button>Create</Button>
								<Button onClick={toggle}>Cancel</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
			}

export default CreateHelpWantedModal;

