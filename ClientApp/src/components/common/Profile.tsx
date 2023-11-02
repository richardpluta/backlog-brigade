import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getAccessTokenSilently();
      setLoading(false);
    })();
  }, []);
  
  return (
    (
      <div>
        <img style={{borderRadius:"50%"}} src={user?.picture} alt={user?.name} />
        <h3>{user?.name}</h3>
        <p>{user?.email}</p>
      </div>
    )
  );
};

export default Profile;