import React from "react";
import { Component } from "react";
import CreateHelpWantedModal from "../common/Modals/CreateHelpWantedModal";
import useCreateHelpWantedModal from "../common/Hooks/useCreateHelpWantedModal";
import "./ClientMain.css";
import HelpWanteds from "./HelpWanteds"
import User from "../../models/userData";
import { Button, Card, Col, Row } from "reactstrap";

export default function ClientMain({currentUser} : {currentUser: User}) {

	const {isOpen, toggle} = useCreateHelpWantedModal();
    return (
		<>
			<Row className="float-right text-right">
				<Col md={10}></Col>
				<Col md={2}>
					<Button color="primary" onClick={toggle}>Create Ad</Button>
				</Col>
			</Row>
			<CreateHelpWantedModal isOpen={isOpen} toggle={toggle} currentUser={currentUser}></CreateHelpWantedModal>
		<Row
	        className="text-center"
			style={{ margin:"3px"}}
		>	
		
			<h3>Help Wanted Ads</h3>
			
		</Row>
		<Row
		>
				
			<div> 
				<HelpWanteds currentUser={currentUser as User}/>
			</div>
		</Row>	
		</>
    );
    
  }