import { showSpinner, hideSpinner } from "../form.js";

async function api_post(endpoint, body, is_blob = false) {
    if(is_blob) {
        delete headers["Content-Type"];
    }
    try {
        showSpinner();
        const response = await fetch(api_url + endpoint, {
            method: "post",
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
        console.log(err)
        throw err
        //console.error(err);
    } finally {
        hideSpinner();
    }
}

export { api_post };