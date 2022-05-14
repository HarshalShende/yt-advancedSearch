/*
========
Retrieve the appropriate data (such as INNERTUBE_API_KEY) required for requests.
========
*/


let data = {}
function get_cfg_data(callback) {
    // if we already have this filled out callback
    if(data["api-key"]) {
        data["source"] = "cache"
        callback(data)
        return;
    }

    // fetch the mainpage to fill stuff
    fetch("https://www.youtube.com/").then(r => {
        r.text().then(response => {
            data["api-key"] = response.split(`"INNERTUBE_API_KEY":"`)[1].split(`"`)[0] || ""
            try {
                // wrap this in a try/catch, as it only works for logged in users
                data["pageid"] = response.split(`"DELEGATED_SESSION_ID":"`)[1].split(`"`)[0]
            }
            catch(error) {
                data["pageid"] = ""
            }
            data["visitor"] = response.split(`"visitorData":"`)[1].split(`"`)[0] || ""
            data["client_ver"] = response.split(`"interfaceVersion":"`)[1].split(`"`)[0] || ""
            data["lang"] = response.split(`"hl":"`)[1].split(`"`)[0] || "en"
            data["source"] = "live"
            callback(data)
        })
    })

}