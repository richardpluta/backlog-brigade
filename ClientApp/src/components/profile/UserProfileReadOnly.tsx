import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { LoggedInUser, Skillset, UserType } from "../../models/user/LoggedInUser";
import { useNavigate, useParams } from "react-router-dom";
import { GetUserByIdAsync } from "../../services/UserService";
import { GetAllListings } from "../../services/ListingService";
import { UserListing } from "../../models/listing/Listing";
import { Button, Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";
import { format } from "date-fns";
import { FaFlag } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";


const UserProfileReadOnly = () =>
{
    let { id } = useParams();
    let navigate = useNavigate();
    const  { getAccessTokenSilently, user } = useAuth0();
    const [currUser, setUserProfile] = useState<LoggedInUser>();
    const [accessToken, setAccessToken] = useState("");
    const [listingList, setListingList] = useState<UserListing[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
          await getAccessTokenSilently().then(async (token) => {
            setAccessToken(token);
        if (id != null){
            let userid:number = parseInt(id);
            await GetUserByIdAsync(accessToken, parseInt(id)).then(async (returnedUser: LoggedInUser) => {
              console.log(returnedUser);
              setUserProfile(returnedUser);
            });
            await GetAllListings(accessToken).then(async (listings: UserListing[]) => {
                console.log(listings);
                setListingList(listings.filter(x => x.listing.userId == userid));
              });
        }
          }).then(() => setIsLoading(false));
        })();
      }, []);



if(isLoading)
{
    return(
<p>Page is loading...</p>
    );
}
return(
    <>
    <Card
        color="secondary"
        inverse
        style={{margin:"5px"}}
    >
        <CardTitle><h5>User Details</h5></CardTitle>
        <Row>
            <Col md={3}>
                <b>Username</b>
            </Col>
            <Col md={3}>
                {currUser?.userName}
            </Col>
        </Row>
        <Row>
            <Col  md={3}>
                <b>Email</b>
            </Col>
            <Col  md={3}>
                {currUser?.email}
            </Col>
        </Row>
        <Row>
            <Col  md={3}>
                <b>Phone</b>
            </Col>
            <Col  md={3}>
            {currUser?.phoneNumber}
            </Col>
        </Row>
        <Row>
            <Col  md={3}>
                <b>Zip</b>
            </Col>
            <Col  md={3}>
                {currUser?.zip}
            </Col>
        </Row>
        <Row>
            <Col  md={3}>
                <b>User Type</b>
            </Col>
            <Col  md={3}>
                {currUser?.userType == undefined ? "--" : UserType[currUser?.userType]}
            </Col>
        </Row>
    </Card>
    <Card
        style={{backgroundColor:"#2F0045", margin:"5px"}}
        inverse
    >
    <CardTitle><h5>User's Listings</h5></CardTitle>
    <div style={{display:"flex", flexDirection:"row"}}>
    {
            listingList?.map((x,i) => { return(
              
                <Card
                    color="light"
                    body
                    key = {i}
                    style = {{border: "gray solid 1px", margin:"2px", color:"black"}}
                >
                <CardBody>
                        <CardTitle tag="h6">
                            {x.listing.content}
                        </CardTitle>
                            <Row>
                                <Col md={4}>
                                    <b>Date</b> 
                                </Col>
                                <Col>
                                    {format(new Date(x.listing.creationDate), 'MM-dd-yy')} 
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <b>Rate</b> 
                                </Col>
                                <Col>
                                    ${x.listing.expectedRate.toString()}
                                </Col>
                            </Row> 
                            <Row>
                                <Col md={4}>
                                    <b>Skillset</b> 
                                </Col>
                                <Col>
                                    {Skillset[x.listing.skillSet]}
                                </Col>
                            </Row> 
                            <Row>
                                <Col md={4}>
                                    <b>Flagged?</b> 
                                </Col>
                                <Col>
                                    {x.listing.flagged ? <>Yes <FaFlag style={{color:"red"}}/></> : <>No <AiFillSafetyCertificate style={{color:"green"}} /></>}
                                </Col>
                            </Row> 
                </CardBody>
                </Card>
             
            );
            }
            )
          }
        </div>
    </Card>
    <Button
        color="primary"
        onClick={() => navigate(-1)}
    >
        Go Back
    </Button>
    </>
);
}

export default UserProfileReadOnly;