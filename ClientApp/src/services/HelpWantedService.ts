import HelpWanted from "../models/helpWantedData";

export const CreateHelpWanted = async (data: HelpWanted) => {

  const body = JSON.stringify(data);

  const response = await fetch('api/helpwanted',
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body
    }
  );
  return response;
}

export const UpdateHelpWanted = async (data: HelpWanted | undefined) => {

  const body = JSON.stringify(data);
  console.log(body);
  const response = await fetch('api/helpwanted/' + data?.id?.valueOf().toString(),
    {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    });
  return response;
}

export const DeleteHelpWanted = async (id: number) => {

  const response = await fetch('api/helpwanted/' + id,
    {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
    }
  );
  return response;
}

export const GetHelpWanteds = async (filterParameters: {}) => {
  const response = await fetch('api/helpwanted?' + new URLSearchParams(filterParameters),
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    }
  );

  const helpWanteds = await response.json() as HelpWanted[]

  return helpWanteds;
}