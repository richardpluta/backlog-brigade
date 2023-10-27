export const getTestResponse = async () => {
    console.log("In getTestResponse");
    const response = await fetch("api/Test/testget"
    ).then((response) => response.json());
    return response;
  };
  