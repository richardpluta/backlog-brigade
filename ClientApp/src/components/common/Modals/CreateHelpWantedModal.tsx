import React, { ReactNode, useState, MouseEvent, FormEvent, useEffect } from "react";
import HelpWanted from "../../../models/helpWantedData";
import "./CreateHelpWantedModal.css";
import { CreateHelpWanted } from "../../../services/HelpWantedService";
import User from "../../../models/userData";
import { Skillset } from "../../../models/skillSet";
import { Label, Input, Button, Card, Row, Col } from "reactstrap";

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
				window.location.reload();
			});
	}


	return (
		<>
			{isOpen && (
				<div className="overlay modal">
					<Card style={{width:"25%", border:"black solid 1px"}}>
						<form onSubmit={onSubmit}>
							<h3>Create Ad</h3>
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
								<Input type="textarea" name="description" id="description" />
							</Row>
							<Row>
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

export default CreateHelpWantedModal;