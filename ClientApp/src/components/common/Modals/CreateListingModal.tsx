import React, { ReactNode, useState, MouseEvent, FormEvent, useEffect } from "react";
import listing from "../../../models/listingData";
import "./CreateListingModal.css";
import { useAuth0 } from "@auth0/auth0-react";
import Test from "../../test/Test";
import { testPostListing } from "../../../services/TestService";
import listingData from "../../../models/listingData";
import LoggedInUser from "../../../models/userData";
import {ListingService} from "../../../services/ListingService";


interface ModalType {
	children?: ReactNode;
	isOpen: Boolean;
	toggle: () => void;
}

const DUMMY_USER:LoggedInUser = {
		userID: 123,
		userType: 0,
		userName: "DummyUserFromModal",
		phone: 987654321,
		email: "nam@email.com",
		skillset: 0,
		zip: '12345',
		userRate: 0,
	}



const CreateListingModal = (props: ModalType) => {

	const {getAccessTokenSilently} = useAuth0();
	const [accessToken, setAccessToken] = useState("");

	useEffect(() => {
		(async () => {
		  await getAccessTokenSilently().then(async (token) => {
			setAccessToken(token);
		  });
		})();
	  }, []);

	  
	const onSubmit = async (event: any) => {
		event.preventDefault();

		const target = event.target;

		//updated this to constant data just for testing purposes so i could rule out the form being part of the issue
		const data:listing = {
			id: 0,
			userId: 1,
			postDate: "2023-11-10T04:41:44.124Z",
			postContent: target.description.value,
			flagged: false,
			skillSet: Number(target.skills.value),
			expectedRate: Number(target.rate.value),
			user: DUMMY_USER
		}

		//moved call to backend to test service, probably should be broken out into a ListingService with the API calls in it
		await ListingService(data)
		.then((res:any) => {
			console.log("Post success");
			window.location.reload();
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

export default CreateListingModal;

