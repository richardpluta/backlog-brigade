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
							<label>
								Title:
								<input type="text" name="title" />
							</label>
							<label>
								Description:
								<textarea name="description" />
							</label>
							<label>
								Location:
								<input type="text" name="location" />
							</label>
							<label>
								Rate:
								<input type="text" name="rate" />
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
