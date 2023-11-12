import React, { useEffect, useState } from 'react'
import HelpWanted from '../../models/helpWantedData'
import flag from '../../../public/assets/red-flag-icon.png'

import "./HelpWanteds.css"

export default function HelpWanted(){

	
	const DUMMY_HelpWanteds = [
		{
			id: "user1",
			postDate: "11052023",
			postContent: "This is the content of post # 1",
			flagged: false,
			skillSet: "Skill1",
			expectedRate: "$50.00/hr",
			user: {
				userID: "123",
				userType: "type",
				userName: "mrProgramGuy",
				phone: "123-456-7890",
				skillset: "none",
				zip: "12345",
				userRate: "0",
			}
		},
		{
			id: "user2",
			postDate: "11072023",
			postContent: "This is the content of post # 2",
			flagged: false,
			skillSet: "Skill1, skill2",
			expectedRate: "$75.00/hr",
			user: {
				userID: "321",
				userType: "type3",
				userName: "XxMyUsernamexX",
				phone: "098-765-4321",
				skillset: "none",
				zip: "12345",
				userRate: "0",
			}
		},
	];

	const [result, setResult] = useState<HelpWanted[]>([]);

	useEffect(() => {
		const api = async () => {
			const data = await fetch("api/helpwanted", {method:"GET"});
			const json = await data.json();
			setResult(json);
		}
		api();
	}, []);

	const helpWanteds = [<div> Help Wanted 1</div>, <div> Help Wanted 2</div>, <div> Help Wanted 3</div>];

	const loadedHelpWanteds = result.map(helpWanteds => {
		return(
			<div className='card'>
				<div className='cardHeader'>
					<p className='cardHeader-element'>{helpWanteds.id}</p>
					<p className='cardHeader-element'>{/*listing.user.userID*/}DUMMY NAME</p>
					<p className='cardHeader-element'>{helpWanteds.postDate}</p>
				</div>
				<div className='cardContent'>
					<p>{helpWanteds.postContent}</p>
					<p>{helpWanteds.skillSet}</p>
					<p>{helpWanteds.expectedRate}</p>
				</div>
				<div className='cardFooter'>
					<p className='cardFooter-element'>{helpWanteds.flagged}</p>
					<img src={flag} alt="Flagged" className='cardFooter-flagIcon'/>
					<button className='cardFooter-edit'>Edit</button>
					<button className='cardFooter-delete'>Delete</button>
				</div>
			</div>
		);
	})

	return (
	  	<>
			{loadedHelpWanteds}
		</>
	)
}
