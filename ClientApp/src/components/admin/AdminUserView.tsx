import React, { useEffect, useState } from "react";
import { DeleteUserAsync, GetAllUsers, GetCurrentUser } from "../../services/UserService";
import { LoggedInUser, UserType } from "../../models/user/LoggedInUser";
import { useAuth0 } from "@auth0/auth0-react";
import { AccordionBody, AccordionHeader, Button, Col, Row, Table, UncontrolledAccordion } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const AdminUserView = () => {
    let navigate = useNavigate();
    const  { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [proList, setProList] = useState<LoggedInUser[]>();
  const [adminList, setAdminList] = useState<LoggedInUser[]>();
  const [clientList, setClientList] = useState<LoggedInUser[]>();


  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          setCurrentUser(currentUser);
        });
        await GetAllUsers(token).then(async (users: LoggedInUser[]) => {
            setAdminList(users.filter(x => x.userType == UserType.Admin));
            setProList(users.filter(x => x.userType == UserType.Professional));
            setClientList(users.filter(x => x.userType == UserType.Client));
          });
      }).finally(() => setIsLoading(false));
    })();
  }, []);

  const routeChange = (id: number) => {
    navigate(`/profile/${id}`);
  };

  const DeleteUserById = async (user : LoggedInUser) =>
  {
    const toDelete:LoggedInUser = user;
    await DeleteUserAsync(accessToken, toDelete).then(async () => {
        await GetAllUsers(accessToken).then(async (users: LoggedInUser[]) => {
            setAdminList(users.filter(x => x.userType == UserType.Admin));
            setProList(users.filter(x => x.userType == UserType.Professional));
            setClientList(users.filter(x => x.userType == UserType.Client));
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
    <UncontrolledAccordion flush>
    <AccordionHeader className="border rounded" targetId="1"><h6>Admins</h6></AccordionHeader>
    <AccordionBody accordionId="1">
        <Table
            hover
            responsive
            striped
            >
         <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th> 
            </tr>
         </thead>
         <tbody>
         {
            adminList?.map((x,i) => { return(
               
                <tr key={i}>
                    <td>
                       <p>{x.userName}</p>
                    </td>
                    <td>
                        <p>{x.email}</p>
                    </td>
                    <td>
                        <p>{x.phoneNumber}</p>
                    </td>
                </tr>
            );
            })
          }
          </tbody>
        </Table>
        </AccordionBody>
        </UncontrolledAccordion>
        <UncontrolledAccordion flush>
        <AccordionHeader className="border rounded" targetId="1"><h6>Clients</h6></AccordionHeader>
        <AccordionBody accordionId="1">
        <Table
            hover
            responsive
            striped
            >
         <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th> 
                <th>Info</th>
                <th>Remove</th>
            </tr>
         </thead>
         <tbody>
         {
            clientList?.map((x,i) => { return(
               
                <tr key={i}>
                    <td>
                       <p>{x.userName}</p>
                    </td>
                    <td>
                        <p>{x.email}</p>
                    </td>
                    <td>
                        <p>{x.phoneNumber}</p>
                    </td>
                    <td>
                        <Button
                            color="primary"
                         onClick={() => routeChange(x.id)}
                        >
                            Info
                        </Button>
                    </td>
                    <td>
                        <Button
                            color="danger"
                            onClick = {() => DeleteUserById(x)}
                        >
                            Remove
                        </Button>
                    </td>
                </tr>
            );
            })
          }
          </tbody>
        </Table>
        </AccordionBody>
        </UncontrolledAccordion>
        <UncontrolledAccordion flush>
        <AccordionHeader className="border rounded" targetId="1"><h6>Professionals</h6></AccordionHeader>
        <AccordionBody accordionId="1">
        <Table
            hover
            responsive
            striped
            >
         <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th> 
                <th>Info</th>
                <th>Remove</th>
            </tr>
         </thead>
         <tbody>
         {
            proList?.map((x,i) => { return(
               
                <tr key={i}>
                    <td>
                       <p>{x.userName}</p>
                    </td>
                    <td>
                        <p>{x.email}</p>
                    </td>
                    <td>
                        <p>{x.phoneNumber}</p>
                    </td>
                    <td>
                        <Button
                            color="primary"
                         onClick={() => routeChange(x.id)}
                        >
                            Info
                        </Button>
                    </td>
                    <td>
                        <Button
                            color="danger"
                            onClick = {() => DeleteUserById(x)}
                        >
                            Remove
                        </Button>
                    </td>
                </tr>
            );
            })
          }
          </tbody>
        </Table>
        </AccordionBody>
        </UncontrolledAccordion>
    </>
    );
    }

}

export default AdminUserView;

