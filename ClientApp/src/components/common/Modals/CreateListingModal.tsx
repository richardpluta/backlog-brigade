import React, { ReactNode, useState, MouseEvent, FormEvent } from "react";
import listing from "../../../models/listingData";
import "./CreateListingModal.css";


interface ModalType {
	children?: ReactNode;
	isOpen: Boolean;
	toggle: () => void;
}

const DUMMY_USER = {
		userID: 123,
		userType: 0,
		userName: "DummyUserFromModal",
		phone: 0,
		email: "nam@email.com",
		skillset: 0,
		zip: 12345,
		userRate: 0,
	}



export default function CreateListingModal(props: ModalType){
	const onSubmit = async (event: any) => {
		event.preventDefault();

		const target = event.target;

		const data = {
			id: 123,
			userId: 0,
			postDate: "2023-11-10T04:41:44.124Z",
			postContent: target.description.value,
			flagged: false,
			skillSet: Number(target.skills.value),
			expectedRate: Number(target.rate.value),
			user: DUMMY_USER,
		}

		console.log(data);

		await fetch("api/listing",
			{
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				
				body: JSON.stringify(data)
			}
		).then(res => {
			console.log(res.json)
		});
	}
	return(
		<>
			{props.isOpen && (
				<div className="overlay">
					<div className="box">
						<form className="create-listing-form" onSubmit={onSubmit}>
							<h1>Please Enter Listing Information:</h1>
							<div className="field">
								<label htmlFor="location">Location:</label>
								<input id="location" />
							</div>
							<div className="field">
								<label htmlFor="rate">Rate:</label>
								<input id="rate" />
							</div>
							<div className="field">
								<label htmlFor="skills">Relevant Skills:</label>
								<input id="skills" />
							</div>
							<div className="field">
								<label htmlFor="description">Description:</label>
								<textarea name="description" id="description"/>
							</div>
							<div>
								<button>Create</button>
								<button onClick={props.toggle}>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
