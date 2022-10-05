/*
=======
Separate functions for upload-after and upload-before
=======
*/

function compare_upload_time(videoData, check) {
    let mode = check.split("-")[1]
    let returnData = false;
    let target = new Date(`${$(".input_up_" + mode + "_year").value}-${$(".input_up_" + mode + "_month").value}-${$(".input_up_" + mode + "_day").value}`).getTime();
    let uploadDate = new Date(videoData.uploadDate).getTime();

    if(mode == "after" && target < uploadDate) {
        returnData = true;
    } else if(mode == "before" && target > uploadDate) {
        returnData = true;
    }

    return returnData;
}


// external test implementation: leaving the old code just in case

function checkUploadDate(targetDate, check) {
    let idList = []
    $(".as_server_wait").classList.remove("as_wait_hide")
    document.querySelectorAll("ytd-video-renderer:not(.as_hide)").forEach(video => {
        let id = video.querySelector("#thumbnail").href.split("?v=")[1].split("&")[0]
        idList.push(id)
    })

    fetch("https://ftde-projects.tk:3761/get_videos_batch?videos=" + encodeURIComponent(idList.join()), {
        "headers": {
            "source": "advancedSearch-Extension-1.4",
            "type": "uploadDate"
        },
        "method": "POST",
    }).then(response => {response.json().then(res => {
        // match received dates to targetDate
        external_done++;
        $(".as_server_wait .as_subtitle").innerHTML = `Waiting for server... (${external_done}/${external_checked_count})`
        if(external_done == external_checked_count) {
            $(".as_server_wait").classList.add("as_wait_hide")
        }

        // TODO: parse res
        for(let video in res) {
            // create unix date and compare
            let unix = Math.floor(new Date(res[video]).getTime() / 1000)

            switch(check) {
                // uploaded after
                case "after": {
                    if(unix <= targetDate) {
                        // no match, hide
                        hideVideoById(video)
                    }
                    break;
                }
                // uploaded before
                case "before": {
                    if(unix >= targetDate) {
                        hideVideoById(video)
                    }
                    break;
                }
            }
        }

        // actually hide
        function hideVideoById(id) {
            document.querySelectorAll("ytd-video-renderer").forEach(video => {
                if(video.querySelector("#thumbnail").href.includes(id)) {
                    video.classList.add("as_hide")
                    video.classList.add("hide_source_requests")
                }
            })
        }

        $(".as_primary").innerHTML = `${lang.header} (${document.querySelectorAll(".as_hide").length} ${lang.stats_filter_1} ${lang.stats_filter_2})`
    })}).catch(error => {
        external_done++;
        $(".as_server_wait .as_subtitle").innerHTML = `Waiting for server... (${external_done}/${external_checked_count})`
        if(external_done == external_checked_count) {
            $(".as_server_wait").classList.add("as_wait_hide")
        }
        alert("Server temporarily unavailable.")
    })
}