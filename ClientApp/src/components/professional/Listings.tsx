import React from 'react'

import "./Listings.css"

export default function Listing(){

	interface Listing{
		UserId: string,
		PostDate: Date,
		PostContent: string,
		flagged: boolean,
		SkillSet: string,
		Rate: string
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

	//const listings = [<div> Listing 1</div>, <div> Listing 2</div>, <div> Listing 3</div>];

	const loadedListings = DUMMY_LISTINGS.map(listing => {
		return(
			<div className='card'>
				<p>{listing.UserId}</p>
				<p>{listing.PostDate}</p>
				<p>{listing.PostContent}</p>
				<p>{listing.flagged}</p>
				<p>{listing.SkillSet}</p>
				<p>{listing.Rate}</p>
			</div>
		);
	})

	return (
	  	<>
			{loadedListings}
		</>
	)
}
