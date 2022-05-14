/*
========
Video info
use the youtubei/v1/player endpoint
========
*/

function actual_fetch(id, callback) {
    // fetch it
    get_cfg_data((config) => {
        sapisidhash((sapisidhash) => {
            let request_headers = {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-goog-pageid": config.pageid,
                "x-goog-visitor-id": config.visitor,
                "x-youtube-client-name": "1",
                "x-youtube-client-version": config.client_ver
            }
            if(sapisidhash.length !== 0) {
                request_headers["authorization"] = "SAPISIDHASH " + sapisidhash
            }
            fetch("https://www.youtube.com/youtubei/v1/player?key=" + config["api-key"] + "&prettyPrint=false", {
                "headers": request_headers,
                "referrer": "https://www.youtube.com/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": JSON.stringify({
                    "context": {
                        "client": {
                            "deviceMake": "",
                            "deviceModel": "",
                            "visitorData": config.visitor,
                            "userAgent": navigator.userAgent,
                            "clientName": "WEB",
                            "clientVersion": config.client_ver,
                            "osName": "Windows",
                            "osVersion": "10.0",
                            "originalUrl": "https://www.youtube.com/watch?v=" + id + "&pp=YAHIAQE%3D",
                            "platform": "DESKTOP",
                            "clientFormFactor": "UNKNOWN_FORM_FACTOR",
                            "browserName": "Chrome",
                            "clientScreen": "WATCH",
                            "mainAppWebInfo": {
                                "graftUrl": "/watch?v=" + id + "&pp=YAHIAQE%3D",
                                "pwaInstallabilityStatus": "PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED",
                                "webDisplayMode": "WEB_DISPLAY_MODE_BROWSER",
                                "isWebNativeShareAvailable": true
                            }
                        },
                        "user": {
                            "lockedSafetyMode": false
                        },
                        "request": {
                            "useSsl": true,
                            "internalExperimentFlags": [],
                            "consistencyTokenJars": []
                        },
                    },
                    "videoId": id,
                    "params": "YAHIAQE%3D",
                    "playbackContext": {
                        "contentPlaybackContext": {
                            "currentUrl": "/watch?v=" + id + "&pp=YAHIAQE%3D",
                            "vis": 5,
                            "splay": false,
                            "autoCaptionsDefaultOn": false,
                            "autonavState": "STATE_OFF",
                            "html5Preference": "HTML5_PREF_WANTS",
                            "signatureTimestamp": 19110,
                            "autoplay": true,
                            "autonav": true,
                            "mutedAutoplay": true,
                            "referer": "https://www.youtube.com/",
                            "lactMilliseconds": "-1"
                        }
                    },
                    "racyCheckOk": false,
                    "contentCheckOk": false
                }),
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
            })
            .then(r => {
                r.json().then(response => {
                    let parsedData = {};
                    try {
                        parsedData["tags"] = response.videoDetails.keywords
                    }
                    catch(error) {
                        // send an empty array if no tags
                        parsedData["tags"] = []
                    }
                    parsedData["uploadDate"] = response.microformat.playerMicroformatRenderer.uploadDate
                    parsedData["ageRestricted"] = !response.microformat.playerMicroformatRenderer.isFamilySafe
                    parsedData["id"] = id
                    parsedData["views"] = parseInt(response.videoDetails.viewCount)
                    parsedData["source"] = "live"
                    callback(parsedData);
                    let toSet = {};
                    toSet[id] = parsedData;
                    try {
                        chrome.storage.local.set(toSet, () => {});
                    }
                    catch(error) {}
                })
            })
        })
    })
}

function get_video_info(id, callback) {
    // if we already have video data, callback it
    try {
        chrome.storage.local.get([id], (videoData) => {
            if(videoData[id]) {
                videoData[id]["source"] = "cache"
                callback(videoData[id])
            } else {
                actual_fetch(id, (fetchedData) => {
                    callback(fetchedData)
                })
            }
        });
    }
    catch(error) {
        // clean fetch if something goes wrong with chrome.storage
        actual_fetch(id, (fetchedData) => {
            callback(fetchedData)
        })
    }
}