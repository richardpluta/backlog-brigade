import React, { useEffect, useState } from 'react'
import Listing from '../../models/listingData'
import flag from '../../../public/assets/red-flag-icon.png'
import {ListingDeleteService} from "../../services/ListingDeleteService";

import "./Listings.css"

export default function Listing(){

	
	const DUMMY_LISTINGS = [
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

	const [result, setResult] = useState<Listing[]>([]);

	useEffect(() => {
		const api = async () => {
			const data = await fetch("api/listing", {method:"GET"});
			const json = await data.json();
			setResult(json);
		}
		api();
	}, []);

	function deleteListings(event: React.MouseEvent<HTMLButtonElement>){
		event.preventDefault();
		const deleteId = event.currentTarget.parentElement?.parentElement?.childNodes[0].childNodes[0].childNodes[0].nodeValue;


	}

	const listings = [<div> Listing 1</div>, <div> Listing 2</div>, <div> Listing 3</div>];

	const loadedListings = result.map(listing => {
		return(
			<div className='card'>
				<div className='cardHeader'>
					<p className='cardHeader-element'>{listing.id}</p>
					<p className='cardHeader-element'>{/*listing.user.userID*/}DUMMY NAME</p>
					<p className='cardHeader-element'>{listing.postDate}</p>
				</div>
				<div className='cardContent'>
					<p>{listing.postContent}</p>
					<p>{listing.skillSet}</p>
					<p>{listing.expectedRate}</p>
				</div>
				<div className='cardFooter'>
					<p className='cardFooter-element'>{listing.flagged}</p>
					<img src={flag} alt="Flagged" className='cardFooter-flagIcon'/>
					<button className='cardFooter-edit'>Edit</button>
					<button className='cardFooter-delete' onClick={deleteListings}>Delete</button>
				</div>
			</div>
		);
	})

	return (
	  	<>
			{loadedListings}
		</>
	)
}
