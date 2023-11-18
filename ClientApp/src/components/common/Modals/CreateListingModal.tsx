import React, { ReactNode } from "react";
import "./CreateListingModal.css";

interface ModalType {
	children?: ReactNode;
	isOpen: Boolean;
	toggle: () => void;
}

export default function CreateListingModal(props: ModalType){
	return(
		<>
			{props.isOpen && (
				<div className="overlay">
					<div className="box">
						<form className="create-listing-form">
							<h1>Please Enter Listing Information:</h1>
							<label>
								<p>Location:</p>
								<input type="text" name="location" />
							</label>
							<label>
								<p>Rate:</p>
								<input type="text" name="rate" />
							</label>
							<label>
								<p>Relevant Skills:</p>
								<input type="text" name="title" />
							</label>
							<label>
								<p>Description:</p>
								<textarea name="description" />
							</label>
							<div>
								<button >Create</button>
								<button onClick={props.toggle}>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
