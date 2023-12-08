import React, { ReactNode, useState, MouseEvent, FormEvent, useEffect } from "react";
import Listing from "../../../models/listingData";
import { useAuth0 } from "@auth0/auth0-react";
import LoggedInUser from "../../../models/userData";
import {ListingPutService} from "../../../services/ListingPutService";
import "./UpdateListingModal.css";
import { Button, Card, Col, Input, Label, Row } from "reactstrap";
import { Skillset } from "../../../models/skillSet";
import User from "../../../models/userData";

interface ModalType {
	children?: ReactNode;
	isOpen: Boolean;
	toggle: () => void;
    data?: Listing;
}

const UpdateListingModal = ({data, currentUser, isOpen, toggle}: {data: Listing | undefined, currentUser: User, isOpen: boolean, toggle: () => void}) => {
	const [currentSkillset, setCurrentSkillset] = React.useState<number>(Skillset.Carpentry);
	const {getAccessTokenSilently} = useAuth0();
	const [accessToken, setAccessToken] = useState("");
	const [listing, setListing] = useState<Listing>();

	useEffect(() => {
		if (data) {
			setListing(data)
		}
	}, []);
	  
	const onSubmit = async (event: any) => {
		event.preventDefault();
        const newRate = event.currentTarget[0].value;
		const newDesc = event.currentTarget[2].value;

		const newListing = listing;
		newListing!.expectedRate = Number(newRate);
		newListing!.skillSet = currentSkillset;
		newListing!.postContent = newDesc;
		newListing!.user = currentUser;

		await ListingPutService(newListing).then(
			(res:any) => {
				window.location.reload();
			}	
		)
	}

	return(

		<>
				{isOpen && (
				<div className="overlay modal">
					<Card style = {{width:"25%"}}>
						<form onSubmit={onSubmit}>
							<h3>Update Listing</h3>
							<Row style={{marginBottom:"10px"}}>
								<Label htmlFor="rate">Rate:</Label>
								<Input id="rate" value={data?.expectedRate}/>
							</Row>
							<Row style={{marginBottom:"10px"}}>
								<Label htmlFor="skills">Relevant Skills:</Label>
								<Input id="skills"
								type="select"
								value={data?.skillSet?.toString()}
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

export default UpdateListingModal;

