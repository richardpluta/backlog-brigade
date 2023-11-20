import { useState } from "react";
import listing from "../../../models/listingData";

export default function usePutListingModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
	if(!isOpen){
		document.body.style.overflow = 'hidden';
	}
	else{
		document.body.style.overflow = 'unSet';
	}
	window.scrollTo({top: 0});
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle
  };
}