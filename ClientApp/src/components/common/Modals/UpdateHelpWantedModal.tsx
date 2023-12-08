import React, { ReactNode, useState, MouseEvent, FormEvent, useEffect } from "react";
import HelpWanted from "../../../models/helpWantedData";
import { useAuth0 } from "@auth0/auth0-react";
import LoggedInUser from "../../../models/userData";
import {UpdateHelpWanted} from "../../../services/HelpWantedService";
import "./UpdateHelpWantedModal.css";
import User from "../../../models/userData";
import { Skillset } from "../../../models/skillSet";

interface ModalType {
	children?: ReactNode;
	isOpen: Boolean;
	toggle: () => void;
    data?: HelpWanted;
}

const UpdateHelpWantedModal = ({data, currentUser, isOpen, toggle}: {data: HelpWanted | undefined, currentUser: User, isOpen: boolean, toggle: () => void}) => {
	const [helpWanted, setHelpWanted] = useState<HelpWanted>();

	useEffect(() => {
		if (data) {
			setHelpWanted(data)
		}
	}, []);
	  
	const onSubmit = async (event: any) => {
		event.preventDefault();
        const newRate = event.currentTarget[0].value;
		const newSkills = event.currentTarget[1].value;
		const newDesc = event.currentTarget[2].value;

		const newHelpWanted = helpWanted;
		newHelpWanted!.expectedRate = Number(newRate);
		newHelpWanted!.skillSet = Number(newSkills);
		newHelpWanted!.postContent = newDesc;
		newHelpWanted!.user = currentUser;
	}

	return(

		<>
			{isOpen && (
				<div className="overlay">
					<div className="box">
						<form className="update-helpwanted-form" onSubmit={onSubmit}>
							<h1>Update Ad</h1>
							<div className="field">
								<label htmlFor="rate">Rate:</label>
								<input id="rate" defaultValue={helpWanted?.expectedRate}/>
							</div>
							<div className="field">
								<label htmlFor="skills">Relevant Skills:</label>
								{/* <input id="skills" defaultValue={data?.skillSet ? Skillset[data.skillSet] : ""}/>								 */}
								<select id="skills"
									value={helpWanted?.skillSet}
									onChange={(e) => {
										setHelpWanted({...helpWanted, skillSet: Number(e.target.value)})
									}}
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
								<textarea name="description" id="description" defaultValue={helpWanted?.postContent}/>
							</div>
							<div>
								<button type="submit">Submit</button>
								<button onClick={toggle}>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default UpdateHelpWantedModal;


