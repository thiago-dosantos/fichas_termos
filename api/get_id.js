async function api_get_id(endpoint, id) {
    const response = await fetch(api_url + endpoint + id, {
        method: "get",
        headers: headers
    });
    
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        return `HTTP error: ${response.status}`;
    }
}

export { api_get_id };