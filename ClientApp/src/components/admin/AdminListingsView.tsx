import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../../services/UserService";
import { LoggedInUser } from "../../models/user/LoggedInUser";
import { useAuth0 } from "@auth0/auth0-react";
import { GetAllListings } from "../../services/ListingService";
import { Listing } from "../../models/listing/Listing";
import { Button, Card, CardBody, CardColumns, CardSubtitle, CardText, CardTitle, Row, Table } from "reactstrap";
import {format} from 'date-fns';

export const AdminListingsView = () => {
    const  { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [listingList, setListingList] = useState<Listing[]>();


  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          setCurrentUser(currentUser);
        });
        await GetAllListings(token).then(async (listings: Listing[]) => {
            //TEMPORARY just to test the flagged color stuff
            listings[0].flagged = true;
            listings[3].flagged = true;
            setListingList(listings);
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
         
         {
            listingList?.map((x,i) => { return(
              <CardColumns>
                <Card
                    color={x.flagged ? "warning" : "light"}
                    body
                >

                <CardBody>
                        <CardTitle tag="h6">
                            {x.content}
                        </CardTitle>
                        <CardText>
                            <p>Date: {format(new Date(x.creationDate), 'MM-dd-yy')}</p>
                            <p>Rate: ${x.expectedRate.toString()}</p>
                        </CardText>
                        <Button
                            color="danger">
                            Remove
                        </Button>
                </CardBody>
                </Card>
             </CardColumns> 
            );
            })
          }
    </>
    );
    }

}

export default AdminListingsView;