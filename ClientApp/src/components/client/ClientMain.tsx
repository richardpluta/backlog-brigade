import React, { useState } from "react";
import "./ClientMain.css";
import HelpWanteds from "./HelpWanteds"
import User from "../../models/userData";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import HelpWanted from "../../models/helpWantedData";
import { CreateHelpWanted } from "../../services/HelpWantedService";
import { Skillset } from "../../models/skillSet";

export default function ClientMain({currentUser} : {currentUser: User}) {
	const [showHelpWantedModal, setShowModal] = useState(false);
	const [helpWantedModalData, setHelpWantedModalData] = useState<HelpWanted>();

	const openHelpWantedModal = () => {
		let helpWanted: HelpWanted = {
			userId: currentUser.id,
			user: currentUser
		}

		setHelpWantedModalData(helpWanted);
		setShowModal(true);
	}

	const closeHelpWantedModal = (update: boolean) => {
		if (update && helpWantedModalData) {
			CreateHelpWanted(helpWantedModalData).then(() => {
				window.location.reload()
			});
		} else {
			setShowModal(false);
		}
	}

    return (
		<>
			<Row className="float-right text-right">
				<Col md={10}></Col>
				<Col md={2}>
					<Button color="primary" style={{marginLeft:"80px"}} onClick={() => openHelpWantedModal()}>Create Ad</Button>
				</Col>
			</Row>
			<Row className="text-center" style={{ margin:"3px"}}>	
				<h3>Help Wanted Ads</h3>
			</Row>
			<Row>	
				<div> 
					<HelpWanteds currentUser={currentUser as User}/>
				</div>
			</Row>	
			<Modal isOpen={showHelpWantedModal}>
				<ModalHeader>Update Help Wanted</ModalHeader>
				<ModalBody className="modal-body">
					<label htmlFor="rate">Rate:</label>
					<input id="rate" defaultValue={helpWantedModalData?.expectedRate} onChange={(e) => setHelpWantedModalData({...helpWantedModalData, expectedRate: Number(e.target.value)})}/>
					<label htmlFor="skills">Relevant Skills:</label>
					<select id="skills"
						value={helpWantedModalData?.skillSet}
						onChange={(e) => setHelpWantedModalData({...helpWantedModalData, skillSet: Number(e.target.value)})}>
						{Object.values(Skillset).filter(x => isNaN(Number(x))).map((key, index) => (
							<option key={index} value={index}>
								{key}
							</option>
						))}
					</select>
					<label htmlFor="description">Description:</label>
					<textarea name="description" id="description" defaultValue={helpWantedModalData?.postContent} onChange={(e) => setHelpWantedModalData({...helpWantedModalData, postContent: e.target.value})}/>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={() => closeHelpWantedModal(true)}>
						Create
					</Button>
					<Button color="secondary" onClick={() => closeHelpWantedModal(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
    );
    
  }