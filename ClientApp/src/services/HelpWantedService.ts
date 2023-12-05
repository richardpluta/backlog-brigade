
export const GetAllHelpWantedsAsync = async (token:string) => {
    
    return await fetch('/api/helpwanted/',
    {
		method: 'GET',
		headers: {
			"Content-Type": "application/json"
		},

    }).then((response) => response.json());
}