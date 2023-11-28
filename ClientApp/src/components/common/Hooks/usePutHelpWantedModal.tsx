import { useState } from "react";
import listing from "../../../models/helpWantedData";

export default function usePutHelpWantedModal() {
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