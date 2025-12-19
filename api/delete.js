async function api_delete(endpoint, id) {
    try {
        const response = await fetch(api_url + endpoint + id, {
            method: "delete",
            headers: headers
        });

        if (response.ok) {
            let json = await response.json();
            return json;
        } else {
            return `HTTP error: ${response.status}`;
        }
    } catch (err) {
        console.error(err);
    }
}

export { api_delete };