import React, { useEffect, useState } from "react";
import { GetAllUsers, GetCurrentUser } from "../../services/UserService";
import { LoggedInUser } from "../../models/user/LoggedInUser";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Col, Row, Table } from "reactstrap";

export const AdminUserView = () => {
    const  { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState<LoggedInUser[]>();


  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          setCurrentUser(currentUser);
        });
        await GetAllUsers(token).then(async (users: LoggedInUser[]) => {
            setUserList(users);
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
        <Table
            borderless
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
            userList?.map((x,i) => { return(
               
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
                            color="danger">
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

