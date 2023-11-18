import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../../services/UserService";
import { LoggedInUser } from "../../models/user/LoggedInUser";
import { useAuth0 } from "@auth0/auth0-react";
import { DeleteListingAsync, GetAllListings } from "../../services/ListingService";
import { Listing, UserListing } from "../../models/listing/Listing";
import { Button, Card, CardBody, CardColumns, CardSubtitle, CardText, CardTitle, Col, Row, Table } from "reactstrap";
import {format} from 'date-fns';

export const AdminListingsView = () => {
    const  { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [listingList, setListingList] = useState<UserListing[]>();


  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          setCurrentUser(currentUser);
        });
        await GetAllListings(token).then(async (listings: UserListing[]) => {
            setListingList(listings);
            console.log(listings);
          });
      }).finally(() => setIsLoading(false));
    })();
  }, []);

  const DeleteByListingId = async (listing : Listing) =>
  {
    const toDelete:Listing = listing;
    await DeleteListingAsync(accessToken, toDelete).then(async () => {
        await GetAllListings(accessToken).then(async (listings: UserListing[]) => {
            setListingList(listings);
          });
        
      });
  }


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
         {
            listingList?.map((x,i) => { return(
              
                <Card
                    color={x.listing.flagged ? "warning" : "light"}
                    body
                    key = {i}
                    style = {{border: "gray solid 1px"}}
                >

                <CardBody>
                        <CardTitle tag="h6">
                            {x.listing.content}
                        </CardTitle>
                            <Row>
                                <Col md={3}>
                                    <b>Poster</b> 
                                </Col>
                                <Col>
                                    {x.user?.userName == undefined ? "--" : x.user?.userName}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <b>Date</b> 
                                </Col>
                                <Col>
                                    {format(new Date(x.listing.creationDate), 'MM-dd-yy')} 
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <b>Rate</b> 
                                </Col>
                                <Col>
                                    ${x.listing.expectedRate.toString()}
                                </Col>
                            </Row> 
                        <Button
                            onClick={() => DeleteByListingId(x.listing)}
                            color="danger"
                            >
                            Remove
                        </Button>
                </CardBody>
                </Card>
             
            );
            }
            )
          }
    </>
    );
    }

}

export default AdminListingsView;