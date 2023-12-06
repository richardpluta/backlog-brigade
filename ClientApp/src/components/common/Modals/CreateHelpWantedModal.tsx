import React, { ReactNode, useState, MouseEvent, FormEvent, useEffect } from "react";
import HelpWanted from "../../../models/helpWantedData";
import "./CreateHelpWantedModal.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoggedInUser from "../../../models/userData";
import { CreateHelpWanted } from "../../../services/HelpWantedService";
import User from "../../../models/userData";
import { Skillset } from "../../../models/skillSet";

interface ModalType {
	children?: ReactNode;
	isOpen: Boolean;
	toggle: () => void;
}

const CreateHelpWantedModal = ({ currentUser, isOpen, toggle }: { currentUser: User, isOpen: boolean, toggle: () => void }) => {
	useEffect(() => { }, []);

	const closeModal = useEffect(() => { toggle });
	const [currentSkillset, setCurrentSkillset] = React.useState<number>(Skillset.Carpentry);

	const onSubmit = async (event: any) => {
		event.preventDefault();

		const target = event.target;

		//updated this to constant data just for testing purposes so i could rule out the form being part of the issue
		const data: HelpWanted = {
			id: 0,
			userId: currentUser.id,
			postContent: target.description.value,
			flagged: false,
			skillSet: currentSkillset,
			expectedRate: Number(target.rate.value),
			user: currentUser
		}

		//moved call to backend to test service, probably should be broken out into a ListingService with the API calls in it
		await CreateHelpWanted(data)
			.then((res: any) => {
				console.log("Post success");
				window.location.reload();
			});
	}


	return (

		<>
			{isOpen && (
				<div className="overlay">
					<div className="box">
						<form className="create-helpwanted-form" onSubmit={onSubmit}>
							<h1>Please Enter Help Wanted Information:</h1>
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
							<select id="skills"
								value={currentSkillset.toString()}
								onChange={(e) => setCurrentSkillset(Number(e.target.value))}
							>
								{Object.values(Skillset).filter(x => isNaN(Number(x))).map((key, index) => (
									<option key={index} value={index}>
										{key}
									</option>
								))}
							</select>
							</div>
							<div className="field">
								<label htmlFor="description">Description:</label>
								<textarea name="description" id="description" />
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

export default CreateHelpWantedModal;