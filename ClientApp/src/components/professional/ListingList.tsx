import React, { Component } from 'react'
import "./ListingList.css"
import Listing from './Listing'

export default class ListingList extends Component {
	
  render() {
	const listings = [<div> Listing 1</div>, <div> Listing 2</div>, <div> Listing 3</div>];
	const listingItems = listings.map((Listing) => <li>{Listing}</li>)
	return (
	  <ul>{listingItems}</ul>
	)
  }
}
