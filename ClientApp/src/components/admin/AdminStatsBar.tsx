import React, { useEffect, useState } from "react";
import { DeleteUserAsync, GetAllUsers, GetCurrentUser } from "../../services/UserService";
import { LoggedInUser, UserType } from "../../models/user/LoggedInUser";
import { useAuth0 } from "@auth0/auth0-react";
import { AccordionBody, AccordionHeader, Button, Card, CardBody, CardTitle, Col, Row, Table, UncontrolledAccordion } from "reactstrap";
import { GetAllListings } from "../../services/ListingService";
import { UserListing } from "../../models/listing/Listing";
import { GetAllHelpWantedsAsync } from "../../services/HelpWantedService";
import helpWanted from "../../models/helpWantedData";

export const AdminStatsBar = () => {
    const  { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [proCount, setProCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [listingsCount, setListingsCount] = useState(0);
  const [flaggedListingsCount, setFlaggedListingsCount] = useState(0);
  const [helpWantedCount, setHelpWantedCount] = useState(0);
  const [flaggedHelpWantedCount, setFlaggedHelpWantedCount] = useState(0);


  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          setCurrentUser(currentUser);
        });
        await GetAllUsers(token).then(async (users: LoggedInUser[]) => {
            setProCount(users.filter(x => x.userType == UserType.Professional).length);
            setClientCount(users.filter(x => x.userType == UserType.Professional).length);      
          });
          await GetAllListings(token).then(async (listings: UserListing[]) => {
            setListingsCount(listings.length);
            setFlaggedListingsCount(listings.filter(x => x.listing.flagged).length)
        });
          await GetAllHelpWantedsAsync(token).then(async (helpWanteds: helpWanted[])=> {
            setHelpWantedCount(helpWanteds.length);
            setFlaggedHelpWantedCount(helpWanteds.filter(x => x.flagged).length)
        });
      }).finally(() => setIsLoading(false));
    })();
  }, []);

 
    if(isLoading)
    {
      return(
        <>
          <p>loading...</p>
        </>
      );
    }
    else
    {
    return(
    <>
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"stretch"}}>
        <Card
            className="text-center" 
            color="light"
            style={{margin:"5px", borderColor:"#00546E", borderWidth:"2px" }} 
        >
            <CardTitle><b>Total Clients</b></CardTitle>
            <CardBody><h2>{clientCount.toString()}</h2></CardBody>
        </Card>
        <Card
            className="text-center"
            color="light"
            style={{margin:"5px", borderColor:"#00546E", borderWidth:"2px"}} 
        >
            <CardTitle><b>Total Pros</b></CardTitle>
            <CardBody><h2>{proCount.toString()}</h2></CardBody>
        </Card>
        <Card
            className="text-center"
            color="light"
            style={{margin:"5px", borderColor:"#00546E", borderWidth:"2px"}} 
        >
            <CardTitle><b>Listings</b></CardTitle>
            <CardBody>
                <Row>
                    <Col>Flagged</Col>
                    <Col>Total</Col>
                </Row>
                <Row>
                    <Col><h2>{flaggedListingsCount.toString()}</h2></Col>
                    <Col><h2>{listingsCount.toString()}</h2></Col>
                </Row>
            </CardBody>
        </Card>
        <Card
            className="text-center"
            color="light"
            style={{margin:"5px", borderColor:"#00546E", borderWidth:"2px"}} 
        >
            <CardTitle><b>Help Wanted Ads</b></CardTitle>
            <CardBody>
                <Row>
                    <Col>Flagged</Col>
                    <Col>Total</Col>
                </Row>
                <Row>
                    <Col><h2>{flaggedHelpWantedCount.toString()}</h2></Col>
                    <Col><h2>{helpWantedCount.toString()}</h2></Col>
                </Row>
            </CardBody>
        </Card>
    </div>
    </>
    );
    }

}

export default AdminStatsBar;
