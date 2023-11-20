import { useState } from "react";

export default function useCreateHelpWantedModal() {
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
	}

  return {
    isOpen,
    toggle
  };
}
