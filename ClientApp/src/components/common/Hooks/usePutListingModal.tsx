import { useState } from "react";
import listing from "../../../models/listingData";

export default function usePutListingModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle
  };
}