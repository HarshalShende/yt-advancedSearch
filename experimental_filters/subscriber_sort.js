function subscriberSort() {
    let channelURLs = []
    $(".as_server_wait").classList.remove("as_wait_hide")
    document.querySelectorAll("ytd-video-renderer:not(.as_hide) #channel-thumbnail").forEach(channel => {
        if(channelURLs.includes(channel.href.replace("https://www.youtube.com/", "")) || channel.getBoundingClientRect().height == 0) return;
        channelURLs.push(channel.href.replace("https://www.youtube.com/", ""))
    })

    // move everything back from a container back if we have one
    if(document.querySelector(".as_sorted_videos")) {
        let contents = $(".as_sorted_videos").parentNode;
        $(".as_sorted_videos ytd-video-renderer").forEach(video => {
            contents.appendChild(video)
            let tooltip = video.querySelector("#channel-info tp-yt-paper-tooltip.ytd-channel-name #tooltip")
            tooltip.innerHTML = tooltip.innerHTML.split(" • ")[0]
        })
        $(".as_sorted_videos").remove();
    }

    fetch("https://ftde-projects.tk:3761/subscriber_count?channel_urls=" + encodeURIComponent(channelURLs.join()), {
        "headers": {
            "source": "advancedSearch-Extension-1.4"
        },
        "method": "POST",
    }).then(response => {response.json().then(res => {
        // sort the response first
        let sortedSubList = []
        let tempList = []

        for(let channel in res) {
            tempList.push(res[channel])
        }
        tempList = tempList.sort((a, b) => b - a)
        tempList.forEach(subCountDesc => {
            for(let channel in res) {
                if(res[channel] == subCountDesc) {
                    sortedSubList.push({
                        "channel": channel,
                        "subCount": subCountDesc
                    }) // don't ask, js is weird at times
                }
            }
        })

        // sort actual videos
        let sortedVideoList = []
        let videosList = []
        sortedSubList.forEach(creator => {
            document.querySelectorAll("ytd-video-renderer:not(.as_hide)").forEach(video => {
                let c = video.querySelector("#channel-thumbnail")
                if(c) {
                    if(c.getBoundingClientRect().height == 0) return; // ignore hidden videos (using filters like hide irrelevant)
                    c = c.href.replace("https://www.youtube.com/", "")

                    if(creator.channel == c) {
                        let parsedCount = parseInt(creator.subCount)
                        if((parsedCount / 1000000) >= 1) {
                            // m
                            parsedCount = (parsedCount / 1000000) + "M"
                        } else if((parsedCount / 1000) >= 1) {
                            // k
                            parsedCount = (parsedCount / 1000) + "K"
                        }
                        // everything below 1k stays as it is
                        video.querySelector("#channel-info tp-yt-paper-tooltip.ytd-channel-name #tooltip").innerHTML += ` • ${parsedCount}`
                        sortedVideoList.push(video)
                    }
                }
            })
        })

        console.log("[advancedsearch] sorted channel list by subscribers: ", sortedSubList)
        // add videos to container
        let container = document.createElement("div")
        if(!document.querySelector(".as_sorted_videos")) {
            container.innerHTML = `<h4 class="as_subtitle as_subcount_notice">Hover over the creator name to see their subscriber count.</h4>`
            sortedVideoList[0].parentNode.appendChild(container)
            container.className = "as_sorted_videos style-scope ytd-item-section-renderer"
        }
        sortedVideoList.forEach(video => {
            container.appendChild(video)
            video.style.marginBottom = "16px"
        })

        // mark as done
        external_done++;
        $(".as_server_wait .as_subtitle").innerHTML = `Waiting for server... (${external_done}/${external_checked_count})`
        if(external_done == external_checked_count) {
            $(".as_server_wait").classList.add("as_wait_hide")
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