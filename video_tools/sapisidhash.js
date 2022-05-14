/*
========
Retrieve the SAPISIDHASH required for request authorization.
========
*/





/*
=======
SHA1
=======
*/
function sha1(input, callback) {
    crypto.subtle.digest("SHA-1", new TextEncoder().encode(input)).then(digest => {
        let hash = Array.from(new Uint8Array(digest));
        let hex = hash.map(b => b.toString(16).padStart(2, "0")).join("");

        callback(hex)
    })
}

/*
=======
SAPISIDHASH generate (used to get more video metadata)
=======
*/
function sapisidhash(callback) {
    // SAPISIDHASH: rounded unix / 1000_sha1
    // sha1: rounded unix / 1000, SAPISIDID (from cookies), request origin
    // ex.:  1651504796 e8LN...QNhE https://www.youtube.com

    // or return nothing if we're not logged in (no sapisid)
    let tr = "";

    if(!document.cookie.includes("SAPISID")) {
        callback(tr);
        return;
    }

    let unix = Math.floor(new Date().getTime() / 1000)
    let sapisid = document.cookie.split("; SAPISID=")[1].split(";")[0]
    let origin = location.href;

    tr = unix + "_"

    sha1(`${unix} ${sapisid} ${origin}`, (hash) => {
        tr += hash;
        callback(tr);
    })
    

} 