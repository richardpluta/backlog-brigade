import React, { useEffect, useState } from "react";
import { DeleteUserAsync, GetAllUsers, GetCurrentUser } from "../../services/UserService";
import { LoggedInUser, UserType } from "../../models/user/LoggedInUser";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Col, Row, Table } from "reactstrap";

export const AdminUserView = () => {
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
        <h6>Admins</h6>
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

        <h6>Clients</h6>
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

        <h6>Professionals</h6>
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
    </>
    );
    }

}

export default AdminUserView;

