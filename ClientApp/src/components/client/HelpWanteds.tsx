import React, { useEffect, useState } from 'react'
import HelpWanted from '../../models/helpWantedData'
import flag from '../../../public/assets/red-flag-icon.png'
import {HelpWantedDeleteService} from "../../services/HelpWantedDeleteService";
import { HelpWantedPutService } from '../../services/HelpWantedPutService';

import "./HelpWanteds.css"
import helpWanted from '../../models/helpWantedData';
import UpdateHelpWantedModal from '../common/Modals/UpdateHelpWantedModal';
import usePutHelpWantedModal from '../common/Hooks/usePutHelpWantedModal';

export default function HelpWanted(){

	const [result, setResult] = useState<helpWanted[]>([]);
	const [helpWantedData, setHelpWantedData] = useState<helpWanted>();

	useEffect(() => {
		const api = async () => {
			const data = await fetch("api/helpwanted", {method:"GET"});
			const json = await data.json();
			setResult(json);
		}
		api();
	}, []);

	async function deleteHelpWanteds(event: React.MouseEvent<HTMLButtonElement>){
		event.preventDefault();
		const deleteId = event.currentTarget.parentElement?.parentElement?.childNodes[0].childNodes[0].childNodes[0].nodeValue;
		await HelpWantedDeleteService(Number(deleteId))
		.then((res:any) => {
			window.location.reload()
		});

	}

	async function openEditHelpWantedModal(event: React.MouseEvent<HTMLButtonElement>, helpwanted:helpWanted){
		
		event.preventDefault();
		setHelpWantedData(helpwanted);
		toggle();
	}

	const {isOpen, toggle} = usePutHelpWantedModal();

	const loadedHelpWanteds = result.map(helpWanted => {

		return(
			<div className='card'>
				<div className='cardHeader'>
					<p className='cardHeader-element'>{helpWanted.id}</p>
					<p className='cardHeader-element'>{/*listing.user.userID*/}DUMMY NAME</p>
					<p className='cardHeader-element'>{helpWanted.postDate}</p>
				</div>
				<div className='cardContent'>
					<p>{helpWanted.postContent}</p>
					<p>{helpWanted.skillSet}</p>
					<p>{helpWanted.expectedRate}</p>
				</div>
				<div className='cardFooter'>
				<p className='cardFooter-element'>{helpWanted.flagged}</p>
					<button><img src={flag} alt="Flagged" className='cardFooter-flagIcon'/></button>
					<button className='cardFooter-edit' onClick={(e) => {openEditHelpWantedModal(e, helpWanted)}}>Edit</button>
					<button className='cardFooter-delete' onClick={deleteHelpWanteds}>Delete</button>
				</div>
			</div>
		);
	})

	return (
	  	<>
			<div className='updateHelpWantedModal'>
				<UpdateHelpWantedModal isOpen={isOpen} toggle={toggle} data={helpWantedData}></UpdateHelpWantedModal>
			</div>
			{loadedHelpWanteds}
		</>
	)
}
