import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../../services/UserService";
import { LoggedInUser } from "../../models/user/LoggedInUser";
import { useAuth0 } from "@auth0/auth0-react";

export const AdminReviewsView = () => {
    const  { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);


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
        <p>Admin Reviews List here!</p>
    </>
    );
    }

}

export default AdminReviewsView;