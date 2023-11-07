import React, { useEffect, useState } from 'react'

import "./Listings.css"

export default function Listing(){

	interface User{

	}

	interface Listing{
		id: string,
		postDate: String,
		postContent: string,
		flagged: boolean,
		skillSet: string,
		expectedRate: string,
		user: User
	}
	
	const DUMMY_LISTINGS = [
		{
			UserId: "user1",
			PostDate: "11052023",
			PostContent: "This is the content of post # 1",
			flagged: false,
			SkillSet: "Skill1",
			Rate: "$50.00/hr"
		},
		{
			UserId: "user2",
			PostDate: "11052023",
			PostContent: "This is the content of post # 2",
			flagged: false,
			SkillSet: "Skill2",
			Rate: "$75.00/hr"
		},
	];

	const [result, setResult] = useState<Listing[]>([]);

	useEffect(() => {
		const api = async () => {
			const data = await fetch("api/listing", {method:"GET"});
			const json = await data.json();
			console.log(json);
			setResult(json);
		}
		api();
	}, []);

	//const listings = [<div> Listing 1</div>, <div> Listing 2</div>, <div> Listing 3</div>];

	const loadedListings = result.map(listing => {
		return(
			<div className='card'>
				<p>{listing.id}</p>
				<p>{listing.postDate}</p>
				<p>{listing.postContent}</p>
				<p>{listing.flagged}</p>
				<p>{listing.skillSet}</p>
				<p>{listing.expectedRate}</p>
			</div>
		);
	})

	return (
	  	<>
			{loadedListings}
		</>
	)
}
