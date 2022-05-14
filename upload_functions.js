/*
=======
Separate function for upload-after and upload-before
=======
*/
let upload_check_ongoing = false;
let upload_interval;
function upload_functions(mode) {
    if(upload_check_ongoing) return;

    let list = []
    document.querySelectorAll("ytd-video-renderer:not(.as_hide)").forEach(result => {
        // darken
        result.classList.add("as_wait")
        list.push(result)
    })


    upload_check_ongoing = true;

    upload_interval = setInterval(function() {
        // get video info
        let videoId = list[0].querySelector("a").href.split("=")[1].split("&")[0]
        get_video_info(videoId, (info) => {
            let target = new Date(`${$(".input_up_" + mode + "_year").value}-${$(".input_up_" + mode + "_month").value}-${$(".input_up_" + mode + "_day").value}`).getTime();
            let uploadDate = new Date(info.uploadDate).getTime();

            switch(mode) {
                // uploaded after check
                case "after": {
                    if(target > uploadDate) {
                        // hide videos uploaded before
                        list[0].classList.add("as_hide")
                        list[0].classList.add("hide_source_requests")
                    }
                    break;
                }
                // uploaded before check
                case "bef": {
                    if(target < uploadDate) {
                        // hide videos uploaded after
                        list[0].classList.add("as_hide")
                        list[0].classList.add("hide_source_requests")
                    }
                    break;
                }
            }

            // update the counter if an element was filtered out
            if(document.querySelectorAll(".as_hide").length !== 0) {
                $(".as_primary").innerHTML = `${lang.header} (${document.querySelectorAll(".as_hide").length} ${lang.stats_filter_1} ${lang.stats_filter_2})`
            }

            // undarken
            list[0].classList.remove("as_wait")

            // remove this element from waiting list
            list.shift()

            if(list.length <= 0) {
                upload_check_stop();
            }
        })

    }, 1500)
}


/*
=======
Stop filtering
=======
*/
function upload_check_stop() {
    clearInterval(upload_interval);
    upload_check_ongoing = false;

    document.querySelectorAll(".as_wait").forEach(waiting => {
        waiting.classList.remove("as_wait")
    })
}