import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../../services/UserService";
import { LoggedInUser } from "../../models/user/LoggedInUser";
import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { UncontrolledAccordion, AccordionHeader, AccordionBody, Card, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import review from "../../models/reviewData";
import { DeleteReviewByIDAsync, GetAllReviewsAsync } from "../../services/ReviewService";

export const AdminReviewsView = () => {
    const  { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [flaggedList, setFlaggedList] = useState<review[]>();
  const [reviewList, setReviewList] = useState<review[]>();

  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          setCurrentUser(currentUser);
        });
        await GetAllReviewsAsync(token).then(async (result: review[]) => {
            setFlaggedList(result.filter(x => x.flagged))
            setReviewList(result.filter(x => !x.flagged));
          });
      }).finally(() => setIsLoading(false));
    })();
  }, []);

  const DeleteById = async (id: number| undefined) =>
  {
    if(id != undefined)
    await DeleteReviewByIDAsync(accessToken, id).then(async () => {
       window.location.reload();
      });
  }


  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
        
          setCurrentUser(currentUser);
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
      <UncontrolledAccordion flush defaultOpen={'1'}>
            <AccordionHeader className="border rounded" targetId="1"><h6>Flagged Reviews</h6></AccordionHeader>
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
                                    <b>Posted By</b> 
                                </Col>
                                <Col>
                                    {x.postUser?.userName == undefined ? "--" : x.postUser.userName}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <b>Date</b> 
                                </Col>
                                <Col>
                                    {x?.postDate != undefined ? format(new Date(x?.postDate), 'MM-dd-yy') : "--"} 
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <b>Reviewed User</b> 
                                </Col>
                                <Col>
                                    {x?.reviewedUser?.userName?.toString()}
                                </Col>
                            </Row> 
                        <Button
                            onClick={() => DeleteById(x.id)}
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
            <AccordionHeader className="border rounded" targetId="1" ><h6>Other Reviews</h6></AccordionHeader>
            <AccordionBody accordionId="1">
         {
            reviewList?.map((x,i) => { return(
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
                                    {x.postUser?.userName == undefined ? "--" : x.postUser.userName}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <b>Date</b> 
                                </Col>
                                <Col>
                                    {x.postDate != undefined ? format(new Date(x.postDate), 'MM-dd-yy') : "--"} 
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <b>Reviewed User</b> 
                                </Col>
                                <Col>
                                    {x?.reviewedUser?.userName?.toString()}
                                </Col>
                            </Row> 
                        <Button
                            onClick={() => DeleteById(x.id)}
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

export default AdminReviewsView;