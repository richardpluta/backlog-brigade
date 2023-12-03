import React, { useEffect, useState } from "react";
import { getTestResponse } from "../../services/TestService";
import { TestResponseObject } from "../../models/test/TestResponseObject";

export const Test = () => {
    const [response, setResponse] = useState<TestResponseObject>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await getTestResponse().then(async (resp:TestResponseObject[]) => {
            setResponse(resp[0]);
            console.log(resp);
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
        <p>Test Component, here is the response from the backend API: </p>
        <p>Id: {response?.id}</p>
        <p>content: {response?.content}</p>
        <p>flagged: {response?.flagged.toString()} </p>
    </>
    );
    }

}

export default Test;

