import { useState } from "react";
import helpWanted from "../../../models/helpWantedData";

export default function usePutHelpWantedModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle
  };
}