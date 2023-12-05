import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../../services/UserService";
import { LoggedInUser } from "../../models/user/LoggedInUser";
import { useAuth0 } from "@auth0/auth0-react";
import { DeleteListingAsync, GetAllListings } from "../../services/ListingService";
import { Accordion, AccordionBody, AccordionHeader, Button, Card, CardBody, CardColumns, CardSubtitle, CardText, CardTitle, Col, Row, Table, UncontrolledAccordion } from "reactstrap";
import {format} from 'date-fns';
import { Listing } from "../../models/listing/Listing";


export const AdminListingsView = () => {
    const  { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [flaggedList, setFlaggedList] = useState<Listing[]>();
  const [listingList, setListingList] = useState<Listing[]>();

  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          setCurrentUser(currentUser);
        });
        await GetAllListings(token).then(async (listings: Listing[]) => {
            setFlaggedList(listings.filter(x => x.flagged))
            setListingList(listings.filter(x => !x.flagged));
          });
      }).finally(() => setIsLoading(false));
    })();
  }, []);

  const DeleteByListingId = async (id:number|undefined) =>
  {
    if(id != undefined)
    await DeleteListingAsync(accessToken, id).then(async () => {
       window.location.reload();
        
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
    <UncontrolledAccordion flush defaultOpen={'1'}>
            <AccordionHeader className="border rounded" targetId="1"><h6>Flagged Listings</h6></AccordionHeader>
            <AccordionBody accordionId="1">
     {
            flaggedList?.map((x,i) => { return(
              
                <Card
                    color={x.flagged ? "warning" : "light"}
                    body
                    key = {i}
                    style = {{border: "gray solid 1px", margin:"5px"}}
                >

                <CardBody>
                        <CardTitle tag="h6">
                            {x.postContent}
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
                                    {x?.creationDate != undefined ? format(new Date(x.creationDate), 'MM-dd-yy') : "--"} 
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <b>Rate</b> 
                                </Col>
                                <Col>
                                    ${x?.expectedRate?.toString()}
                                </Col>
                            </Row> 
                        <Button
                            onClick={() => DeleteByListingId(x.id)}
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
          </AccordionBody>
          </UncontrolledAccordion>
          <UncontrolledAccordion flush>
            <AccordionHeader className="border rounded" targetId="1" ><h6>Other Listings</h6></AccordionHeader>
            <AccordionBody accordionId="1">
         {
            listingList?.map((x,i) => { return(
                <Card
                    color={x.flagged ? "warning" : "light"}
                    body
                    key = {i}
                    style = {{border: "gray solid 1px", margin:"5px"}}
                >

                <CardBody>
                        <CardTitle tag="h6">
                            {x.postContent}
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
                                    {x.creationDate != undefined ? format(new Date(x.creationDate), 'MM-dd-yy') : "--"} 
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <b>Rate</b> 
                                </Col>
                                <Col>
                                    ${x?.expectedRate?.toString()}
                                </Col>
                            </Row> 
                        <Button
                            onClick={() => DeleteByListingId(x.id)}
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
          </AccordionBody>
          </UncontrolledAccordion>
    </>
    );
    }

}

export default AdminListingsView;