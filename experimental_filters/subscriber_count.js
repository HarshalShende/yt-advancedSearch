function checkSubscribers(targetCount) {
    let channelURLs = []
    $(".as_server_wait").classList.remove("as_wait_hide")
    document.querySelectorAll("#channel-thumbnail").forEach(channel => {
        if(channelURLs.includes(channel.href.replace("https://www.youtube.com/", ""))) return;
        channelURLs.push(channel.href.replace("https://www.youtube.com/", ""))
    })

    // M/K to absolute numbers
    if(targetCount.endsWith("M")) {
        targetCount = parseFloat(targetCount) * 1000000
    } else if(targetCount.endsWith("K")) {
        targetCount = parseFloat(targetCount) * 1000
    } else {
        targetCount = parseInt(targetCount)
    }

    fetch("https://ftde-projects.tk:3761/subscriber_count?channel_urls=" + encodeURIComponent(channelURLs.join()), {
        "headers": {
            "source": "advancedSearch-Extension-1.4"
        },
        "method": "POST",
    }).then(response => {response.json().then(res => {
        // match received numbers to targetCount
        external_done++;
        $(".as_server_wait .as_subtitle").innerHTML = `Waiting for server... (${external_done}/${external_checked_count})`
        if(external_done == external_checked_count) {
            $(".as_server_wait").classList.add("as_wait_hide")
        }
        document.querySelectorAll("ytd-video-renderer:not(.as_hide)").forEach(video => {
            let creator = video.querySelector("#channel-thumbnail")
            if(creator) {
                creator = creator.href.replace("https://www.youtube.com/", "")
                if(res[creator] && res[creator] <= targetCount) {
                    // hide if less than targetCount
                    video.classList.add("as_hide")
                    video.classList.add("hide_source_requests")
                }
            }
        })

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