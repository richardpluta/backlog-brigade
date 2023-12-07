import React, { useEffect, useState } from 'react'
import flag from '../../../public/assets/red-flag-icon.png'
import {DeleteHelpWanted, GetHelpWanteds} from "../../services/HelpWantedService";
import { UpdateHelpWanted } from '../../services/HelpWantedService';
import "./HelpWanteds.css"
import HelpWanted from '../../models/helpWantedData';
import UpdateHelpWantedModal from '../common/Modals/UpdateHelpWantedModal';
import usePutHelpWantedModal from '../common/Hooks/usePutHelpWantedModal';
import User from '../../models/userData';
import { format } from 'date-fns';
import { Button, Card, Col, Input, Label, Row } from 'reactstrap';
import { FaFlag, FaTag } from 'react-icons/fa';
import { Skillset } from '../../models/user/LoggedInUser';
import { RiMapPin3Fill } from "react-icons/ri";


export default function HelpWanteds({currentUser} : {currentUser: User}) {
	const [helpWanteds, setHelpWanteds] = useState<HelpWanted[]>([]);
	const [helpWantedData, setHelpWantedData] = useState<HelpWanted>();
	const [postContentFilter, setPostContentFilter] = useState("");

	const GetData = () => {
		let filterParameters: {[key: string]: string} = {}

		if (postContentFilter) {
			filterParameters["postContent"] = postContentFilter;
		}

		GetHelpWanteds(filterParameters).then(result => setHelpWanteds(result))
	}

	useEffect(() => {
		GetData();
	}, []);

	async function deleteHelpWanteds(event: React.MouseEvent<HTMLButtonElement>){
		event.preventDefault();
		const deleteId = event.currentTarget.parentElement?.parentElement?.childNodes[0].childNodes[0].childNodes[0].nodeValue;
		await DeleteHelpWanted(Number(deleteId))
		.then((res:any) => {
			window.location.reload()
		});

	}

	async function openEditHelpWantedModal(event: React.MouseEvent<HTMLButtonElement>, helpwanted:HelpWanted){
		
		event.preventDefault();
		setHelpWantedData(helpwanted);
		toggle();
	}

	const {isOpen, toggle} = usePutHelpWantedModal();

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
						<Col md={9}>
							Rate: ${helpWanted.expectedRate}
						</Col>
					</Row>				
					{currentUser.id == helpWanted.userId &&(
						<Row>	
							<Col md={2}>		
								<Button color="primary" onClick={(e) => {openEditHelpWantedModal(e, helpWanted)}}>Edit</Button>
							</Col>	
							<Col md={5}>
								<Button color="danger" onClick={deleteHelpWanteds}>Delete</Button>
							</Col>
						</Row>)
						}
					{currentUser.id != helpWanted.userId && !helpWanted.flagged &&(
						<Row>	
							<Col md={2}>		
		
							</Col>	
							<Col md={6}>
							</Col>
							<Col>
								<Button color="primary" onClick={(e) => onFlagSubmit(e, helpWanted)}><FaFlag style={{color:"red"}}/> Flag</Button>
							</Col>
						</Row>)
						}
			</Card>
	
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
				<Label>By Skill/Service:</Label>
				<Input className="sortingInput" id="skillSort" />
			</Col>
		</Row>
		<Row>

			<Col>
				<Label>By Highest Price:</Label>
				<Input className="sortingInput" id="priceSort" />
			</Col>
			<Col>
				<Label>By Location:</Label>
				<Input className="sortingInput" id="locationSort" />	
			</Col>
	
		</Row>
		<Row style ={{marginTop:"10px"}}>
			<Col md={12} className="text-center">
				<Button color="warning" onClick={() => GetData()}>Apply</Button>
			</Col>
			<div className='updateHelpWantedModal'>
				<UpdateHelpWantedModal isOpen={isOpen} toggle={toggle} data={helpWantedData}></UpdateHelpWantedModal>
			</div>
		</Row>
		</Card>
		<Card className="helpwanteds">
			{loadedHelpWanteds}
		</Card>
		
		</>
	)

}
