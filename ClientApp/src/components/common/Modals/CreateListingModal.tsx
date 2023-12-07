import React, { useEffect, useState } from "react";
import "./CreateListingModal.css";
import {CreateListing} from "../../../services/ListingService";
import User from "../../../models/userData";
import { Listing } from "../../../models/listing/Listing";
import { GetCurrentUser } from "../../../services/UserService";
import { useAuth0 } from "@auth0/auth0-react";
import { LoggedInUser } from "../../../models/user/LoggedInUser";

const CreateListingModal = ({currentUser, isOpen, toggle}: {currentUser: User, isOpen: boolean, toggle: () => void}) => {
	const {getAccessTokenSilently} = useAuth0();
	const [accessToken, setAccessToken] = useState("");
	const[ loggedInUser, setLoggedInUser] = useState<LoggedInUser>();

	useEffect(() => {
		(async () => {
		  await getAccessTokenSilently().then(async (token) => {
			setAccessToken(token);
			await GetCurrentUser(token, currentUser.email).then((response:LoggedInUser) => {
				setLoggedInUser(response);
			})
		  });
		})();
	  }, []);

	const onSubmit = async (event: any) => {
		event.preventDefault();

		const target = event.target;

		//updated this to constant data just for testing purposes so i could rule out the form being part of the issue
		const data:Listing = {
			id: 0,
			userId: currentUser.id,
			postContent: target.description.value,
			flagged: false,
			skillSet: Number(target.skills.value),
			expectedRate: Number(target.rate.value),
			creationDate: new Date(),
			user: loggedInUser
		}

		//moved call to backend to test service, probably should be broken out into a ListingService with the API calls in it
		await CreateListing(data)
		.then((res:any) => {
			window.location.reload();
		});
	}

	
	return(

		<>
			{isOpen && (
				<div className="overlay">
					<div className="box">
						<form className="create-listing-form" onSubmit={onSubmit}>
							<h1>Please Enter Listing Information:</h1>
							
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
								<button onClick={toggle}>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
			}

export default CreateListingModal;

