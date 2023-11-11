export const getTestResponse = async () => {
    console.log("In getTestResponse");
    const response = await fetch("api/testget"
    ).then((response) => response.json());
    return response;
  };
  