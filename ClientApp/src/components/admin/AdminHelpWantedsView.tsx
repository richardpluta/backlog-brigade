import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../../services/UserService";
import { LoggedInUser } from "../../models/user/LoggedInUser";
import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { UncontrolledAccordion, AccordionHeader, AccordionBody, Card, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import { GetAllHelpWantedsAsync } from "../../services/HelpWantedService";
import helpWanted from "../../models/helpWantedData";
import { HelpWantedDeleteService } from "../../services/HelpWantedDeleteService";

export const AdminHelpWantedsView = () => {
    const  { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [flaggedList, setFlaggedList] = useState<helpWanted[]>();
  const [helpWantedList, setHelpWantedList] = useState<helpWanted[]>();

  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          setCurrentUser(currentUser);
        });
        await GetAllHelpWantedsAsync(token).then(async (result: helpWanted[]) => {
            setFlaggedList(result.filter(x => x.flagged))
            setHelpWantedList(result.filter(x => !x.flagged));
          });
      }).finally(() => setIsLoading(false));
    })();
  }, []);

  const DeleteById = async (id: number | undefined) =>
  {
    if(id != undefined)
    await HelpWantedDeleteService(id).then(async () => {
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
            <AccordionHeader className="border rounded" targetId="1"><h6>Flagged Help Wanteds</h6></AccordionHeader>
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
                                    {x?.postDate != undefined ? format(new Date(x.postDate), 'MM-dd-yy') : "--"} 
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
            <AccordionHeader className="border rounded" targetId="1" ><h6>Other Help Wanteds</h6></AccordionHeader>
            <AccordionBody accordionId="1">
         {
            helpWantedList?.map((x,i) => { return(
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
                                    {x?.postDate != undefined ? format(new Date(x.postDate), 'MM-dd-yy') : "--"} 
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

export default AdminHelpWantedsView;