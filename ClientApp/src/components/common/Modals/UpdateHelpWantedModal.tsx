import React, { ReactNode, useState, MouseEvent, FormEvent, useEffect } from "react";
import helpWanted from "../../../models/helpWantedData";
import { useAuth0 } from "@auth0/auth0-react";
import LoggedInUser from "../../../models/userData";
import {HelpWantedPutService} from "../../../services/HelpWantedPutService";
import "./UpdateHelpWantedModal.css";

interface ModalType {
	children?: ReactNode;
	isOpen: Boolean;
	toggle: () => void;
    data?: helpWanted;
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

const UpdateHelpWantedModal = (props: ModalType) => {

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
        const newRate = event.currentTarget[1].value;
		const newSkills = event.currentTarget[2].value;
		const newDesc = event.currentTarget[3].value;

		const newHelpWanted = props.data;
		newHelpWanted!.expectedRate = Number(newRate);
		newHelpWanted!.skillSet = Number(newSkills);
		newHelpWanted!.postContent = newDesc;
		newHelpWanted!.user = DUMMY_USER;

		await HelpWantedPutService(newHelpWanted).then(
			(res:any) => {
				window.location.reload();
			}	
		)
	}

	return(

		<>
			{props.isOpen && (
				<div className="overlay">
					<div className="box">
						<form className="update-helpwanted-form" onSubmit={onSubmit}>
							<h1>Please Enter Help Wanted Information:</h1>
							<div className="field">
								<label htmlFor="location">Location:</label>
								<input id="location" />
							</div>
							<div className="field">
								<label htmlFor="rate">Rate:</label>
								<input id="rate" defaultValue={props.data?.expectedRate}/>
							</div>
							<div className="field">
								<label htmlFor="skills">Relevant Skills:</label>
								<input id="skills" defaultValue={props.data?.skillSet}/>
							</div>
							<div className="field">
								<label htmlFor="description">Description:</label>
								<textarea name="description" id="description" defaultValue={props.data?.postContent}/>
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

export default UpdateHelpWantedModal;
