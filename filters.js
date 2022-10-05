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
    "movies": "movies",
    "watched_content": "fully watched videos",
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
    "chapters": "Videos containing chapters",
    "subscribed-creators": "Content from creators you subscribe",
    "invert_filter": "Invert filtering",

    "form_invite": "Want to improve AdvancedSearch?",

    "view_count_more": "Videos with more than: ",
    "view_count_less": "Videos with less than: ",
    "views": "views",


    "slow_warning": "Experimental: Following options may slow down filtering significantly and don't work well with other selections.",
    "uploaded_before": "Videos uploaded before: ",
    "uploaded_after": "Videos uploaded after: ",
    "age_restricted": "age restricted videos",
    "matching_keywords": "Videos including tags: ",

    "serverside": "External filters (?)",
    "serverside_explain": "External filters are filters that connect to my server to work. This offloads the load you would have to make on your behalf.\n\nIf this is successful, I will slowly move more and more experimental filters as external.\n\nNo personally identifiable data is used during usage.",

    "only_where": "Show only videos matching:",
    "subscriber_count": "Creator has more than: ",
    "subscribers": "subscribers",
    "keywords_placeholder": "comma separated",
    "other": "Other filters:",
    "sub_sort": "Sort by creators with most subscribers (descending)",

    "server_wait": "Waiting for server...",



    "stats_filter_1": "filtered",
    "stats_filter_2": "elements",



    "logged_in": "(only logged in users)",


    "time": "(mm:ss)"

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
        <!--<button class="as_button button_save">Load preset (todo)</button>
        <button class="as_button button_save">Save preset (todo)</button>-->
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
            <span class="as_checkbox" data-filtername="hide-movies">✔</span>
            <p>${lang.hide_default} ${lang.movies}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="author-exclude">✔</span>
            <p>${lang.hide_default} ${lang.author_remove}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input input_creatorname_2" placeholder="${lang.author_placeholder}" readonly></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="watched-videos">✔</span>
            <p>${lang.hide_default} ${lang.watched_content}</p>
        </div>

        <button class="as_button button_filter">Filter</button>
    </div>
    <div class="as_group">
        <h4 class="as_title">${lang.subheader_show_only}</h4>

        <div class="as_filter">
            <span class="as_checkbox" data-filtername="specific-author">✔</span>
            <p>${lang.author}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input input_creatorname" placeholder="${lang.author_placeholder}" readonly></input>
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
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_shorter" placeholder="${lang.time}" readonly></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="longer-than">✔</span>
            <p>${lang.content_longer_than}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_longer" placeholder="${lang.time}" readonly></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="exact-length">✔</span>
            <p>${lang.content_exact}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_exact" placeholder="${lang.time}" readonly></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="title-includes">✔</span>
            <p>${lang.title_includes}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input input_titleincludes" readonly></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="topic-uploads">✔</span>
            <p>${lang.topic_uploads}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="chapters">✔</span>
            <p>${lang.chapters}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="subscribed-creators">✔</span>
            <p>${lang["subscribed-creators"]}</p>
        </div>
    </div>
    <div class="as_group">
        <p class="as_warning">${lang.slow_warning}</p>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="hide-age-restricted">✔</span>
            <p>${lang.hide_default} ${lang.age_restricted}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="views-more">✔</span>
            <p>${lang.view_count_more}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_views_more" readonly></input>
            <p>${lang.views}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="views-less">✔</span>
            <p>${lang.view_count_less}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_views_less" readonly></input>
            <p>${lang.views}</p>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="matching-keywords">✔</span>
            <p>${lang.matching_keywords}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input input_keywords" placeholder="${lang.keywords_placeholder}" readonly></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="invert-others">✔</span>
            <p>${lang.invert_filter}</p>
        </div>
        <a class="as_link link_stop">Stop experimental filters</a>
        <h4 class="as_title serverside_listener" style="cursor: pointer;">${lang.serverside}</h4>
        <h4 class="as_subtitle">${lang.only_where}</h4>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="upload-after">✔</span>
            <p>${lang.uploaded_after}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_after_day" placeholder="dd" readonly></input>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_after_month" placeholder="mm" readonly></input>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_after_year" placeholder="yyyy" readonly></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="upload-before">✔</span>
            <p>${lang.uploaded_before}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_before_day" placeholder="dd" readonly></input>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_before_month" placeholder="mm" readonly></input>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number small input_up_before_year" placeholder="yyyy" readonly></input>
        </div>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="subscriber-count">✔</span>
            <p>${lang.subscriber_count}</p>
            <input type="text" autocomplete="off" spellcheck="false" class="as_input number input_subcount" placeholder="number" readonly></input>
            <p>${lang.subscribers}</p>
        </div>
        <h4 class="as_subtitle">${lang.other}</h4>
        <div class="as_filter">
            <span class="as_checkbox" data-filtername="subscriber-sort">✔</span>
            <p>${lang.sub_sort}</p>
        </div>
        <div class="as_server_wait as_wait_hide">
            <p class="as_loading_anim"></p>
            <h4 class="as_subtitle">${lang.server_wait}</h4>
        </div>
        <br>
        <a href="https://docs.google.com/forms/d/1iukscBQdxam-pUQ1C7WYmWfL2SMCPFKe85GuVlCs1YA/" class="as_link" target="_blank" style="font-size: 10px;">${lang.form_invite}</a>
    </div>
    `
    custom_settings.classList.add("as_list")
    waitForElement("iron-collapse", () => {
        if(document.querySelector(".as_list")) return;
        $("iron-collapse").appendChild(custom_settings)

        $(".serverside_listener").addEventListener("click", () => {
            alert(lang.serverside_explain)
        })


        // post-add stuff
        // add checking to all checkboxes
        $(".as_checkbox").forEach(checkbox => {
            checkbox.addEventListener("click", () => {
                checkbox.classList.toggle("checked")
                checkbox.parentNode.classList.toggle("enabled")

                // enable/disable textboxes upon click
                checkbox.parentNode.querySelectorAll(`input[type="text"]`).forEach(input => {
                    if(checkbox.classList.contains("checked")) {
                        input.removeAttribute("readonly")
                    } else {
                        input.setAttribute("readonly", "")
                    }
                })
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
            experimental_stop();
        })
    })
}

/*
=======
Filter!
=======
*/

const all_filterable = `ytd-video-renderer, ytd-shelf-renderer, ytd-channel-renderer, ytd-playlist-renderer, ytd-radio-renderer, ytd-horizontal-card-list-renderer, ytd-video-renderer, ytd-promoted-sparkles-web-renderer, ytd-promoted-video-renderer, ytd-movie-renderer`
let external_checked_count = 0;
let external_done = 0;
function search_results_filter(source) {
    document.querySelectorAll(all_filterable).forEach(result => {
        if(result.classList.contains("hide_source_requests") && source == "mutation") return;
        result.classList.remove("as_hide")
        result.classList.remove("hide_source_requests")
    })
    
    if(source !== "mutation") {
        external_checked_count = 0;
        external_done = 0;
        $(".as_server_wait .as_subtitle").innerHTML = "Waiting for server..."
    }

    if(document.querySelector(".as_subcount_notice") && source !== "mutation") {
        $(".as_subcount_notice").remove();
    }

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
                $("ytd-video-renderer, ytd-promoted-sparkles-web-renderer, ytd-promoted-video-renderer").forEach(result => {
                    if(result.querySelector(".badge-style-type-ad") || result.querySelector("#ad-badge-container")) {
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
            Videos with chapters
            */
            case "chapters": {
                $("ytd-video-renderer").forEach(result => {
                    if(!result.querySelector("ytd-expandable-metadata-renderer")) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            From creators you subscribe
            */
            case "subscribed-creators": {
                // til you can actually do functions like that
                function hide_sub() {
                    $("ytd-video-renderer").forEach(result => {
                        if(!subscribed_names.includes(result.querySelector(".ytd-channel-name a").innerText)) {
                            result.classList.add("as_hide")
                        }
                    })
                }


                if(source !== "mutation") {
                    get_subscribed(() => {
                        hide_sub();
                    });
                } else {
                    hide_sub();
                }
                break;
            }
            /*
            Hide watched videos
            */
            case "watched-videos": {
                $("ytd-video-renderer").forEach(result => {
                    if(result.querySelector(`ytd-thumbnail-overlay-resume-playback-renderer #progress[style="width: 100%;"]`)) {
                        result.classList.add("as_hide")
                    }
                })
                break;
            }
            /*
            Hide movies
            */
            case "hide-movies": {
                document.querySelectorAll("ytd-movie-renderer").forEach(result => {
                    result.classList.add("as_hide")
                })
                break;
            }
            /*
            Auto invert filtering
            */
            case "invert-others": {
                let filtered = document.querySelectorAll(".as_hide")
                let unfiltered = document.querySelectorAll(`${all_filterable}:not(.as_hide)`)
                console.log(filtered, unfiltered)

                unfiltered.forEach(el => {
                    el.classList.add("as_hide")
                })
                filtered.forEach(el => {
                    el.classList.remove("as_hide")
                })
                break;
            }
            /*
            Filter by subscriber count
            */
            case "subscriber-count": {
                if(source == "mutation") return;
                external_checked_count++;
                let targetCount = $(".input_subcount").value
                checkSubscribers(targetCount)
                break;
            }
            /*
            New implementation: upload dates
            */
            case "upload-after": {
                if(source == "mutation") return;
                external_checked_count++;
                $(".as_server_wait .as_subtitle").innerHTML = `Waiting for server... (${external_done}/${external_checked_count})`
                let targetUnix = Math.floor(new Date(`${$(".input_up_after_year").value}-${$(".input_up_after_month").value}-${$(".input_up_after_day").value}`).getTime() / 1000);
                checkUploadDate(targetUnix, "after");
                break;
            }
            case "upload-before": {
                if(source == "mutation") return;
                external_checked_count++;
                $(".as_server_wait .as_subtitle").innerHTML = `Waiting for server... (${external_done}/${external_checked_count})`
                let targetUnix = Math.floor(new Date(`${$(".input_up_before_year").value}-${$(".input_up_before_month").value}-${$(".input_up_before_day").value}`).getTime() / 1000);
                checkUploadDate(targetUnix, "before");
                break;
            }
            /*
            Sort videos by subscriber count
            */
            case "subscriber-sort": {
                if(source == "mutation") return;
                external_checked_count++;
                $(".as_server_wait .as_subtitle").innerHTML = `Waiting for server... (${external_done}/${external_checked_count})`
                subscriberSort();
                break;
            }
        }
    })

    experimental_start(source);

    $(".as_primary").innerHTML = `${lang.header}`
    if(document.querySelectorAll(".as_hide").length !== 0) {
        $(".as_primary").innerHTML = `${lang.header} (${document.querySelectorAll(".as_hide").length} ${lang.stats_filter_1} ${lang.stats_filter_2})`
    }
}