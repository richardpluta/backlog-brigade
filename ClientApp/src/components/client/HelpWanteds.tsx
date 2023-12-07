import React, { useEffect, useState } from 'react'
import {DeleteHelpWanted, GetHelpWanteds} from "../../services/HelpWantedService";
import { UpdateHelpWanted } from '../../services/HelpWantedService';
import "./HelpWanteds.css"
import HelpWanted from '../../models/helpWantedData';
import User from '../../models/userData';
import { format } from 'date-fns';
import { Button, Card, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { FaFlag, FaTag } from 'react-icons/fa';
import { Skillset } from '../../models/user/LoggedInUser';
import { RiMapPin3Fill } from "react-icons/ri";
import { PiPhoneFill } from "react-icons/pi";


export default function HelpWanteds({currentUser} : {currentUser: User}) {
	const [helpWanteds, setHelpWanteds] = useState<HelpWanted[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState<HelpWanted>();
	const [postContentFilter, setPostContentFilter] = useState("");
	const [priceFilter, setPriceFilter] = useState("");
	const [userNameFilter, setUserNameFilter] = useState("");
	const [currentSkillsetFilter, setCurrentSkillset] = React.useState<number | undefined>();
	const [locationFilter, setLocationFilter] = useState("");

	const GetData = () => {
		let filterParameters: {[key: string]: string} = {}

		if (postContentFilter) {
			filterParameters["postContent"] = postContentFilter;
		}

		if (priceFilter) {
			filterParameters["expectedRate"] = priceFilter;
		}

		if (userNameFilter) {
			filterParameters["userName"] = userNameFilter;
		}

		if(currentSkillsetFilter !== undefined)
		{
			filterParameters["skillSet"] = currentSkillsetFilter.toString();
		}

		if (locationFilter) {
			filterParameters["zip"] = locationFilter;
		}

		GetHelpWanteds(filterParameters).then(result => setHelpWanteds(result))
	}

	useEffect(() => {
		GetData();
	}, []);

	const deleteHelpWanteds = (helpWanted: HelpWanted) => {
		if (helpWanted.id) {
			DeleteHelpWanted(helpWanted.id).then(() => {
				setHelpWanteds(helpWanteds.filter(x => x.id != helpWanted.id));
			});
		}
	}

	const openModal = (helpWanted: HelpWanted) => {
		setModalData(helpWanted);
		setShowModal(true);
	}

	const closeModal = (update: boolean) => {
		if (update && modalData) {
			UpdateHelpWanted(modalData).then(helpWanted => {
				helpWanteds[helpWanteds.findIndex(x => x.id === helpWanted.id)] = helpWanted
				setHelpWanteds(helpWanteds);
				setShowModal(false);
			});
		} else {
			setShowModal(false);
		}
	}

	async function onFlagSubmit(event: React.MouseEvent<HTMLButtonElement>, helpwanted:HelpWanted)
	{
		event.preventDefault();
		helpwanted.flagged = true;
		helpwanted.user = currentUser; 

		console.log(helpwanted)

		await UpdateHelpWanted(helpwanted).then(
			(res:any) => {
				console.log(res);
				window.location.reload();
			}	
		)
	}

	const loadedHelpWanteds = helpWanteds.map(helpWanted => {

		return(
			<>
			<Card
				style={{width:"30%", margin:"5px", padding:"10px", border:"black 1px solid", backgroundColor:helpWanted?.flagged ? "lightcoral" : "lightgray"}}
				>
				<Row className="text-center">
				<RiMapPin3Fill />
				</Row>
				<Row>
					<Col md={8}>
						<b>{helpWanted.postDate != undefined ? format(new Date(helpWanted?.postDate), 'MM-dd-yyyy') : "--"}</b>
					</Col>
					<Col md={4}>
						{helpWanted.skillSet != undefined? Skillset[helpWanted?.skillSet] : "--"}
					</Col>
				</Row>
					<Row className="text-center">
						<Col md={12}><h5>{helpWanted.postContent}</h5></Col></Row>
					<Row>
						<Col md={12}>
							<h5>Rate: ${helpWanted.expectedRate}</h5>
						</Col>
					</Row>		
					<Row>
						<Col>
							{helpWanted.user != undefined? helpWanted.user?.userName : "unknown"}
						</Col>	
					</Row>		
					{currentUser.id == helpWanted.userId &&(
						<Row>	
							<Col md={2}>		
								<Button color="primary" onClick={(e) => {openModal(helpWanted)}}>Edit</Button>
							</Col>	
							<Col md={5}>
								<Button color="danger" onClick={() => deleteHelpWanteds(helpWanted)}>Delete</Button>
							</Col>
						</Row>)
						}
					{currentUser.id != helpWanted.userId && !helpWanted.flagged &&(
						<Row>	
							<Col md={2}>		
								<Button color="info"><PiPhoneFill style={{color:"white"}} /></Button>
							</Col>	
							<Col md={6}>
							</Col>
							<Col>
								<Button color="primary" onClick={(e) => onFlagSubmit(e, helpWanted)}><FaFlag style={{color:"red"}}/> Flag</Button>
							</Col>
						</Row>)
						}
			</Card>
		</>
		);
	})

	return (
	  	<>
		<Card
		style={{backgroundColor:"light", border:"1px black solid", margin:"3px"}}
		>
		<Row className="text-center">
			<Col>
				<h5>Filter Content</h5>
			</Col>
		</Row>
		<Row>
			<Col>
				<Label>Content Search:</Label>
				<Input className="sortingInput" id="contentSearch" value={postContentFilter} onChange={(e) => setPostContentFilter(e.target.value)}/>
			</Col>
			<Col>
				<Label>Location Sort:</Label>
				<Input className="sortingInput" id="locationSort" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}/>	
			</Col>
			<Col>
				<Label>By Highest Price:</Label>
				<Input className="sortingInput" id="priceSort" />
			</Col>
		</Row>
		<Row>
			<Col>
				<Label>By Location:</Label>
				<Input className="sortingInput" id="locationSort" />	
			</Col>
			<Col>
			<Label>Skill/Service Sort:</Label>
				<Input id="skills"
					   type="select"
								value={currentSkillsetFilter?.toString()}
								onChange={(e) => setCurrentSkillset(Number(e.target.value))}
							>
								{Object.values(Skillset).filter(x => isNaN(Number(x))).map((key, index) => (
									<option key={index} value={index}>
										{key}
									</option>
								))}
							</Input>
			</Col>
			<Col className="text-center" style={{marginTop:"20px"}}>
				<Button size="lg" color="warning" onClick={() => GetData()}>Apply</Button>
			</Col>
		</Row>
		<Row style ={{marginTop:"10px"}}>

		</Row>
		</Card>
		<Card className="helpwanteds">
			{loadedHelpWanteds}
			<Modal isOpen={showModal}>
				<ModalHeader>Update Help Wanted</ModalHeader>
				<ModalBody className="modal-body">
					<label htmlFor="rate">Rate:</label>
					<input id="rate" defaultValue={modalData?.expectedRate} onChange={(e) => setModalData({...modalData, expectedRate: Number(e.target.value)})}/>
					<label htmlFor="skills">Relevant Skills:</label>
					<select id="skills"
						value={modalData?.skillSet}
						onChange={(e) => setModalData({...modalData, skillSet: Number(e.target.value)})}>
						{Object.values(Skillset).filter(x => isNaN(Number(x))).map((key, index) => (
							<option key={index} value={index}>
								{key}
							</option>
						))}
					</select>
					<label htmlFor="description">Description:</label>
					<textarea name="description" id="description" defaultValue={modalData?.postContent} onChange={(e) => setModalData({...modalData, postContent: e.target.value})}/>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={() => closeModal(true)}>
						Update
					</Button>
					<Button color="secondary" onClick={() => closeModal(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</Card>
		</>
	)
}
