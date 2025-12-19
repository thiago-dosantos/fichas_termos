import { showSpinner, hideSpinner } from "../form.js";

async function api_put(endpoint, id, body) {
    try {
        showSpinner();
        const response = await fetch(api_url + endpoint + id, {
          method: "put",
          headers: headers,
          body: body
        });

        if (response.ok) {
            let json = await response.json();
            return json;
        } else {
            return `HTTP error: ${response.status}`;
        }
    } catch (err) {
        console.error(err);
    } finally {
        hideSpinner();
    }
}

export { api_put };