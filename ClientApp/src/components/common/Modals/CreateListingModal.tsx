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
				<div className="overlay" onClick={props.toggle}>
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
								Price:
								<input type="text" name="price" />
							</label>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
