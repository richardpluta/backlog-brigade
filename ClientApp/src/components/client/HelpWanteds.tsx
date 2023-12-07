import React, { useEffect, useState } from 'react'
import flag from '../../../public/assets/red-flag-icon.png'
import {DeleteHelpWanted, GetHelpWanteds} from "../../services/HelpWantedService";
import { UpdateHelpWanted } from '../../services/HelpWantedService';
import "./HelpWanteds.css"
import HelpWanted from '../../models/helpWantedData';
import User from '../../models/userData';
import { Skillset } from '../../models/skillSet';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

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
			<div key={helpWanted.id} className='card'>
				<div className='cardHeader'>
					<p className='cardHeader-element'>{helpWanted.user?.userName}</p>
					<p className='cardHeader-element'>{helpWanted.postDate}</p>
					<p className='cardHeader-element'>{helpWanted.user?.zip}</p>
				</div>
				<div className='cardContent'>
					<p>{helpWanted.postContent}</p>
					<p>{helpWanted.skillSet !== undefined ? Skillset[helpWanted.skillSet] : null}</p>
					<p>{helpWanted.expectedRate}</p>
				</div>
				<div className='cardFooter'>
				<p className='cardFooter-element'>{helpWanted.flagged}</p>
					<button onClick={(e) => onFlagSubmit(e, helpWanted)}><img src={flag} alt="Flagged" className='cardFooter-flagIcon'/></button>
					{currentUser.id == helpWanted.userId &&(
						<div>				
							<button className='cardFooter-edit' onClick={() => openModal(helpWanted)}>Edit</button>
							<button className='cardFooter-delete' onClick={() => deleteHelpWanteds(helpWanted)}>Delete</button>
						</div>)
					}
				</div>
			</div>
		);
	})

	return (
	  	<>
			<div className="sorting">
				<label>Content Search:</label>
				<input className="sortingInput" id="contentSearch" value={postContentFilter} onChange={(e) => setPostContentFilter(e.target.value)}/>
				<label>Skill/Service Sort:</label>
				<select id="skills"
								value={currentSkillsetFilter?.toString()}
								onChange={(e) => setCurrentSkillset(Number(e.target.value))}
							>
								{Object.values(Skillset).filter(x => isNaN(Number(x))).map((key, index) => (
									<option key={index} value={index}>
										{key}
									</option>
								))}
							</select>
				<label>Username Sort:</label>
				<input className="sortingInput" id="userNameSort" value={userNameFilter} onChange={(e) => setUserNameFilter(e.target.value)}/>
				<label>Highest Price Sort:</label>
				<input className="sortingInput" id="priceSort" type="number" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}/>
				<label>Location Sort:</label>
				<input className="sortingInput" id="locationSort" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}/>		
			</div>
			<button className="applyButton" onClick={() => GetData()}>Apply Filters and Searches</button>
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
		</>
	)
}
