/*
=======
AdvancedSearch
=======
*/

const lang = {
    "header": "AdvancedSearch",
    "target": "Load until ",
    "target2": " or more results",
    "subheader_show_only": "Show only:",
    "hide_irrelevant": "Hide irrelevant sections",
    "hide_default": "Hide",
    "channels": " channels",
    "playlists": " playlists",
    "live": "livestreams",
    "premiere": "premieres",
    "ad": "marked ads",
    "shorts": "Shorts",
    "author_remove": "content by: ",
    "author": "Content made by: ",
    "author_placeholder": "comma separated names",
    "author_verified": "Results from verified channels",
    "author_artist": "Results from music artists",
    "content_shorter_than": "Content shorter than: ",
    "content_exact": "Exact video length: ",
    "content_longer_than": "Content longer than: ",
    "title_includes": "Titles including: ",
    "topic_uploads": "Automatic Music uploads",


    "view_count_more": "Videos with more than: ",
    "view_count_less": "Videos with less than: ",
    "views": "views",


    "slow_warning": "Experimental: Following options may slow down filtering significantly and don't work well with other selections.",
    "uploaded_before": "Videos uploaded before: ",
    "uploaded_after": "Videos uploaded after: ",
    "age_restricted": "age restricted videos",
    "matching_keywords": "Videos including 1 or more tags: ",



    "stats_filter_1": "filtered",
    "stats_filter_2": "elements"

}

/*
=======
Add filters
=======
*/

function filters_add() {
    if(document.querySelector(".as_button")) return;
    let custom_settings = document.createElement("div")
    custom_settings.innerHTML = `
    <div class="as_group">
        <h4 class="as_title as_primary">${lang.header}</h4>
        <hr>
        <h4 class="as_title">${lang.hide_default}:</h4>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="hide-irrelevant">✔</span>
            <p>${lang.hide_irrelevant}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="hide-channels">✔</span>
            <p>${lang.hide_default} ${lang.channels}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="hide-playlists">✔</span>
            <p>${lang.hide_default} ${lang.playlists}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="hide-live">✔</span>
            <p>${lang.hide_default} ${lang.live}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="hide-shorts">✔</span>
            <p>${lang.hide_default} ${lang.shorts}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="hide-premiere">✔</span>
            <p>${lang.hide_default} ${lang.premiere}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="hide-ad">✔</span>
            <p>${lang.hide_default} ${lang.ad}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="author-exclude">✔</span>
            <p>${lang.hide_default} ${lang.author_remove}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input input_creatorname_2" placeholder="${lang.author_placeholder}"></input>
        </div>

        <button class="as_button button_filter">Filter</button>
    </div>
    <div class="as_group">
        <h4 class="as_title">${lang.subheader_show_only}</h4>

        <div class="as_filter">
            <span class="as_checkbox" data-filtername="specific-author">✔</span>
            <p>${lang.author}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input input_creatorname" placeholder="${lang.author_placeholder}"></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="verified-creators">✔</span>
            <p>${lang.author_verified}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="artist-creators">✔</span>
            <p>${lang.author_artist}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="shorter-than">✔</span>
            <p>${lang.content_shorter_than}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_shorter"></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="longer-than">✔</span>
            <p>${lang.content_longer_than}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_longer"></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="exact-length">✔</span>
            <p>${lang.content_exact}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_exact"></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="title-includes">✔</span>
            <p>${lang.title_includes}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input input_titleincludes"></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="topic-uploads">✔</span>
            <p>${lang.topic_uploads}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="views-more">✔</span>
            <p>${lang.view_count_more}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_views_more"></input>
            <p>${lang.views}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="views-less">✔</span>
            <p>${lang.view_count_less}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_views_less"></input>
            <p>${lang.views}</p>
        </div>
    </div>
    <div class="as_group">
        <p class="as_warning">${lang.slow_warning}</p>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="upload-after">✔</span>
            <p>${lang.uploaded_after}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_after_day" placeholder="dd"></input>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_after_month" placeholder="mm"></input>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_after_year" placeholder="yyyy"></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="upload-before">✔</span>
            <p>${lang.uploaded_before}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_bef_day" placeholder="dd"></input>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_bef_month" placeholder="mm"></input>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_bef_year" placeholder="yyyy"></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="hide-age-restricted">✔</span>
            <p>${lang.hide_default} ${lang.age_restricted}</p>
        </div>
        <a class="as_link link_stop">Stop experimental filters</a>
    </div>
    `
    custom_settings.classList.add("as_list")
    waitForElement("iron-collapse", () => {
        if(document.querySelector(".as_list")) return;
        $("iron-collapse").appendChild(custom_settings)
        appendCount++;


        // post-add stuff
        // add checking to all checkboxes
        $(".as_checkbox").forEach(checkbox => {
            checkbox.addEventListener("click", () => {
                checkbox.classList.toggle("checked")
                checkbox.parentNode.classList.toggle("enabled")
            })
        })

        // autocomplete for input_creatorname and input_creatorname_2
        autocomplete_creators(".input_creatorname")
        autocomplete_creators(".input_creatorname_2")

        // let the filter button do its magic when clicked
        $(".button_filter").addEventListener("click", () => {
            search_results_filter("click");
        })

        // stop experimental filters doing their thing
        $(".link_stop").addEventListener("click", () => {
            upload_check_stop();
            age_restricted_check_stop()
        })
    })
}

/*
=======
Filter!
=======
*/

function search_results_filter(source) {
    $("ytd-video-renderer, ytd-shelf-renderer, ytd-channel-renderer, ytd-playlist-renderer, ytd-radio-renderer, ytd-horizontal-card-list-renderer").forEach(result => {
        if(result.classList.contains("hide_source_requests") && source == "mutation") return;
        result.classList.remove("as_hide")
        result.classList.remove("hide_source_requests")
    })


    document.querySelectorAll(".as_checkbox.checked").forEach(check => {

        switch(check.getAttribute("data-filtername")) {
            /*
            Hide other sections
            */
            case "hide-irrelevant": {
                document.querySelectorAll("ytd-shelf-renderer, ytd-horizontal-card-list-renderer").forEach(section => {
                    section.classList.add("as_hide")
                })
                break;
            }
            /*
            Hide channels
            */
            case "hide-channels": {
                document.querySelectorAll("ytd-channel-renderer").forEach(section => {
                    section.classList.add("as_hide")
                })
                break;
            }
            /*
            Hide playlists
            */
            case "hide-playlists": {
                document.querySelectorAll("ytd-playlist-renderer, ytd-radio-renderer").forEach(section => {
                    section.classList.add("as_hide")
                })
                break;
            }
            /*
            Hide marked ads
            */
            case "hide-ad": {
                $("ytd-video-renderer, ytd-promoted-sparkles-web-renderer").forEach(result => {
                    if(result.querySelector(".badge-style-type-ad")) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Hide shorts
            */
            case "hide-shorts": {
                $("ytd-video-renderer").forEach(result => {
                    if(result.querySelector(`[overlay-style="SHORTS"]`)) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Hide live streams
            */
            case "hide-live": {
                $("ytd-video-renderer").forEach(result => {
                    if(result.querySelector(".badge-style-type-live-now")) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Hide premieres
            */
            case "hide-premiere": {
                $("ytd-video-renderer").forEach(result => {
                    if(result.querySelector(`[aria-label="PREMIERE"]`)) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            By specific creators
            */
            case "specific-author": {
                let target = $(".input_creatorname").value.toLowerCase().split(",");

                // trim off start spaces
                target.forEach(creator => {
                    target[target.indexOf(creator)] = creator.trimStart(" ")
                })

                // check if target (creator array) includes uploader name
                $("ytd-video-renderer").forEach(result => {
                    if(!target.includes(result.querySelector(".ytd-channel-name a").innerHTML.toLowerCase())) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Excluding specific creators
            */
            case "author-exclude": {
                let target = $(".input_creatorname_2").value.toLowerCase().split(",");

                // trim off start spaces
                target.forEach(creator => {
                    target[target.indexOf(creator)] = creator.trimStart(" ")
                })

                // check if target (creator array) includes uploader name
                $("ytd-video-renderer").forEach(result => {
                    if(target.includes(result.querySelector(".ytd-channel-name a").innerHTML.toLowerCase())) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            By verified channels
            */
            case "verified-creators": {
                $("ytd-video-renderer").forEach(result => {
                    if(!result.querySelector(".badge-style-type-verified")) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            By artists
            */
            case "artist-creators": {
                $("ytd-video-renderer").forEach(result => {
                    if(!result.querySelector(".badge-style-type-verified-artist")) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Shorter than
            */
            case "shorter-than": {
                let target = to_seconds($(".input_shorter").value)
                if(target == 0) return;
                $("ytd-video-renderer").forEach(result => {
                    if(!result.querySelector("span.ytd-thumbnail-overlay-time-status-renderer") ||
                    to_seconds(result.querySelector("span.ytd-thumbnail-overlay-time-status-renderer").innerHTML) > target) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Longer than
            */
            case "longer-than": {
                let target = to_seconds($(".input_longer").value)
                if(target == 0) return;
                $("ytd-video-renderer").forEach(result => {
                    if(!result.querySelector("span.ytd-thumbnail-overlay-time-status-renderer") ||
                    to_seconds(result.querySelector("span.ytd-thumbnail-overlay-time-status-renderer").innerHTML) < target) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Exact length
            */
            case "exact-length": {
                let target = to_seconds($(".input_exact").value)
                if(target == 0) return;
                $("ytd-video-renderer").forEach(result => {
                    if(!result.querySelector("span.ytd-thumbnail-overlay-time-status-renderer") ||
                    to_seconds(result.querySelector("span.ytd-thumbnail-overlay-time-status-renderer").innerHTML) !== target) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Content title includes
            */
            case "title-includes": {
                let target = $(".input_titleincludes").value.toLowerCase()
                $("ytd-video-renderer").forEach(result => {
                    if(!result.querySelector("#video-title yt-formatted-string").innerHTML.toLowerCase().includes(target)) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Automatic music uploads
            */
            case "topic-uploads": {
                $("ytd-video-renderer").forEach(result => {
                    if(!result.querySelector(".metadata-snippet-text") ||
                        !result.querySelector(".metadata-snippet-text").innerHTML.includes("Provided to YouTube by ")) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            More views than
            */
            case "views-more": {
                let target = simple_to_count($(".input_views_more").value)
                if(target == 0) return;
                $("ytd-video-renderer").forEach(result => {
                    if(!result.querySelector("#metadata-line .ytd-video-meta-block") ||
                        simple_to_count(result.querySelector("#metadata-line .ytd-video-meta-block").innerText) < target) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Less views than
            */
            case "views-less": {
                let target = simple_to_count($(".input_views_less").value)
                if(target == 0) return;
                $("ytd-video-renderer").forEach(result => {
                    if(!result.querySelector("#metadata-line .ytd-video-meta-block") ||
                        simple_to_count(result.querySelector("#metadata-line .ytd-video-meta-block").innerText) > target) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Uploaded after
            */
            case "upload-after": {
                if(!$(".input_up_after_year").value || !$(".input_up_after_month").value ||
                    !$(".input_up_after_day").value || source == "mutation") return;
                upload_functions("after")
                break;
            }
            /*
            Uploaded before
            */
            case "upload-before": {
                if(!$(".input_up_bef_year").value || !$(".input_up_bef_month").value ||
                    !$(".input_up_bef_day").value || source == "mutation") return;
                upload_functions("bef")
                break;
            }
            /*
            Hide age restricted content
            */
            case "hide-age-restricted": {
                if(source == "mutation") return;
                age_restricted_check()
                break;
            }
        }
    })

    $(".as_primary").innerHTML = `${lang.header}`
    if(document.querySelectorAll(".as_hide").length !== 0) {
        $(".as_primary").innerHTML = `${lang.header} (${document.querySelectorAll(".as_hide").length} ${lang.stats_filter_1} ${lang.stats_filter_2})`
    }
}