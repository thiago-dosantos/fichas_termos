async function api_get(endpoint, params, api_url, headers) {
    try {
        // Garantir que a URL tenha a barra no final
        const baseUrl = api_url.endsWith('/') ? api_url : api_url + '/';
        const url = baseUrl + endpoint + '?' + new URLSearchParams(params);
        
        const response = await fetch(url, {
            method: "get",
            headers: headers
        });
        
        if (response.ok) {
            let json = await response.json();
            return json;
        } else {
            return `HTTP error: ${response.status}`;
        }
    } catch (err) {
        console.error('Erro na requisição GET:', err);
        throw err;
    }
}

export { api_get };