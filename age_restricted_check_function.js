/*
=======
Separate function for age-restricted
=======
*/
let age_restricted_check_ongoing = false;
let age_restricted_interval;
function age_restricted_check() {
    if(age_restricted_check_ongoing) return;

    let list = []
    document.querySelectorAll("ytd-video-renderer:not(.as_hide)").forEach(result => {
        // darken
        result.classList.add("as_wait")
        list.push(result)
    })


    age_restricted_check_ongoing = true;
    
    age_restricted_interval = setInterval(function() {
        let videoId = list[0].querySelector("a").href.split("=")[1].split("&")[0]
        get_video_info(videoId, (info) => {

            // is it age restricted?
            if(info.ageRestricted) {
                list[0].classList.add("as_hide")
                list[0].classList.add("hide_source_requests")
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
                age_restricted_check_stop();
            }
        })
    }, 1500)
}


/*
=======
Stop filtering
=======
*/
function age_restricted_check_stop() {
    clearInterval(age_restricted_interval);
    age_restricted_check_ongoing = false;

    document.querySelectorAll(".as_wait").forEach(waiting => {
        waiting.classList.remove("as_wait")
    })
}