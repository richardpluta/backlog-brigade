// import {useState} from "react";

// import Listing from '../../../models/listingData';

// function useListingForm({data: Listing}){
//     const [status, setStatus] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setStatus('loading');
//         setMessage('');

//         const listingEndpoint = e.target.action;
//         const formdata = Array.from(e.target.elements)
//             .filter((listingdata) => {listingdata.name});

//         fetch(listingEndpoint, {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type' : 'application/json',
//             },
//             body: JSON.stringify(formdata);
//         })
//     }
// }