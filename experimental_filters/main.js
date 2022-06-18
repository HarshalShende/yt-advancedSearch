/*
=======
"Experimental" controller

gives us more flexibility over experimental filters which aren't synchronous
=======
*/

let experimental = {
    "checks": [],
    "video_queue": []
}

function experimental_start(source) {
    if(source == "mutation") return;
    experimental.checks = []

    // push appropriate checks
    document.querySelectorAll(`[data-filtername="upload-after"].checked, [data-filtername="upload-before"].checked, [data-filtername="hide-age-restricted"].checked, [data-filtername="views-more"].checked, [data-filtername="views-less"].checked`).forEach(check => {
        experimental.checks.push(check.getAttribute("data-filtername"))
    })

    // put video elements in video_queue
    $("ytd-video-renderer:not(.as_hide)").forEach(result => {
        if(experimental.checks.length !== 0) {
            result.classList.add("as_wait")
        }
        experimental.video_queue.push(result)
    })

    // check videos, use "passing" for each video - let all the checks go through and then decide
    let video_checks = setInterval(() => {
        if(experimental.video_queue.length <= 0) {
            clearInterval(video_checks)
            return;
        }

        let videoElement = experimental.video_queue[0]
        let videoId = videoElement.querySelector("#video-title").href.split("watch?v=")[1] || videoElement.querySelector("#video-title").href.split("shorts/")[1]
        videoId = videoId.split("&")[0]

        get_video_info(videoId, (video) => {
            
            let passing = true
            experimental.checks.forEach(check => {
                if(!passing) return;
                // iterate through each check
                switch(check) {
                    // Uploaded after/before a specified date - pass to upload_date.js
                    case "upload-after":
                    case "upload-before": {
                        passing = compare_upload_time(video, check);
                        break;
                    }
                    // Age restricted
                    case "hide-age-restricted": {
                        passing = is_age_restricted(video);
                        break;
                    }
                    // View count
                    case "views-more":
                    case "views-less": {
                        passing = view_count_compare(video, check);
                        break;
                    }
                }
            })

            // Hide if at least one of the checks haven't passed          
            if(!passing) {
                videoElement.classList.add("as_hide")
                videoElement.classList.add("hide_source_requests")
            }

            // remove from queue once we're done
            experimental.video_queue.shift();

            if(experimental.video_queue.length <= 0) {
                clearInterval(video_checks)
            }

            // count
            if(document.querySelectorAll(".as_hide").length !== 0) {
                $(".as_primary").innerHTML = `${lang.header} (${document.querySelectorAll(".as_hide").length} ${lang.stats_filter_1} ${lang.stats_filter_2})`
            }



            videoElement.classList.remove("as_wait")
        })
    }, 1200)
}

function experimental_stop() {
    experimental.video_queue = []
    experimental.checks = []

    document.querySelectorAll(".as_wait").forEach(waiting => {
        waiting.classList.remove("as_wait")
    })
}