import React, { useEffect, useState } from "react";
import "./CreateListingModal.css";
import {CreateListing} from "../../../services/ListingService";
import User from "../../../models/userData";
import Listing from "../../../models/listingData";
import { GetCurrentUser } from "../../../services/UserService";
import { useAuth0 } from "@auth0/auth0-react";
import { LoggedInUser, Skillset } from "../../../models/user/LoggedInUser";
import { Button, Card, Col, Input, Label, Row } from "reactstrap";

const CreateListingModal = ({currentUser, isOpen, toggle}: {currentUser: User, isOpen: boolean, toggle: () => void}) => {
	const {getAccessTokenSilently} = useAuth0();
	const [accessToken, setAccessToken] = useState("");
	const[ loggedInUser, setLoggedInUser] = useState<LoggedInUser>();
	const [currentSkillset, setCurrentSkillset] = React.useState<number>(Skillset.Carpentry);

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
			skillSet: currentSkillset,
			expectedRate: Number(target.rate.value),
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
				<div className="overlay modal">
					<Card style = {{width:"25%"}}>
						<form onSubmit={onSubmit}>
							<h3>Create Listing</h3>
							<Row style={{marginBottom:"10px"}}>
								<Label htmlFor="rate">Rate:</Label>
								<Input id="rate" />
							</Row>
							<Row style={{marginBottom:"10px"}}>
								<Label htmlFor="skills">Relevant Skills:</Label>
								<Input id="skills"
								type="select"
								value={currentSkillset.toString()}
								onChange={(e) => setCurrentSkillset(Number(e.target.value))}
							>
								{Object.values(Skillset).filter(x => isNaN(Number(x))).map((key, index) => (
									<option key={index} value={index}>
										{key}
									</option>
								))}
							</Input>
							</Row>
							<Row style={{marginBottom:"10px"}}>
								<Label htmlFor="description">Description:</Label>
								<Input type="textarea" name="description" id="description"/>
							</Row>
							<Row style={{marginBottom:"10px"}}>
								<Col md={3}>
									<Button color="primary">Create</Button>
								</Col>
								<Col>
								<Button color="danger" onClick={toggle}>Cancel</Button>
								</Col>
							</Row>
						</form>
					</Card>
				</div>
			)}
		</>
	)
			}

export default CreateListingModal;

