import React, { useEffect, useState } from 'react'
import flag from '../../../public/assets/red-flag-icon.png'
import {DeleteHelpWanted, GetHelpWanteds} from "../../services/HelpWantedService";
import { UpdateHelpWanted } from '../../services/HelpWantedService';
import "./HelpWanteds.css"
import HelpWanted from '../../models/helpWantedData';
import UpdateHelpWantedModal from '../common/Modals/UpdateHelpWantedModal';
import usePutHelpWantedModal from '../common/Hooks/usePutHelpWantedModal';
import User from '../../models/userData';
import { Skillset } from '../../models/skillSet';

export default function HelpWanteds({currentUser} : {currentUser: User}) {
	const [helpWanteds, setHelpWanteds] = useState<HelpWanted[]>([]);
	const [helpWantedData, setHelpWantedData] = useState<HelpWanted>();
	const [postContentFilter, setPostContentFilter] = useState("");
	const [priceFilter, setPriceFilter] = useState("");
	const [userNameFilter, setUserNameFilter] = useState("");

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
			
			<div className='card'>
				<div className='cardHeader'>
					<p className='cardHeader-element'>{helpWanted.user?.userName}</p>
					<p className='cardHeader-element'>{helpWanted.postDate}</p>
				</div>
				<div className='cardContent'>
					<p>{helpWanted.postContent}</p>
					<p>{helpWanted.skillSet ? Skillset[helpWanted.skillSet] : null}</p>
					<p>{helpWanted.expectedRate}</p>
				</div>
				<div className='cardFooter'>
				<p className='cardFooter-element'>{helpWanted.flagged}</p>
					<button onClick={(e) => onFlagSubmit(e, helpWanted)}><img src={flag} alt="Flagged" className='cardFooter-flagIcon'/></button>
					{currentUser.id == helpWanted.userId &&(
						<div>				
							<button className='cardFooter-edit' onClick={(e) => {openEditHelpWantedModal(e, helpWanted)}}>Edit</button>
							<button className='cardFooter-delete' onClick={deleteHelpWanteds}>Delete</button>
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
				<input className="sortingInput" id="skillSort" value={userNameFilter} onChange={(e) => setUserNameFilter(e.target.value)}/>
				<label>Username Sort:</label>
				<input className="sortingInput" id="userNameSort" value={userNameFilter} onChange={(e) => setUserNameFilter(e.target.value)}/>
				<label>Highest Price Sort:</label>
				<input className="sortingInput" id="priceSort" type="number" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}/>
				<label>Location Sort:</label>
				<input className="sortingInput" id="locationSort" />		
			</div>
			<button className="applyButton" onClick={() => GetData()}>Apply Filters and Searches</button>
			<div className='updateHelpWantedModal'>
				<UpdateHelpWantedModal isOpen={isOpen} toggle={toggle} data={helpWantedData} currentUser={currentUser}></UpdateHelpWantedModal>
			</div>
			{loadedHelpWanteds}
		</>
	)

}
