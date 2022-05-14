function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}


/*
=======
wait for results page
=======
*/
let oldLocation = "";
let pollLocationChange = setInterval(function() {
    if(location.href !== oldLocation) {
        locationChange();
    }
    oldLocation = location.href;
}, 500)

function locationChange() {
    if(location.href.includes("/results")) {
        /*
        =======
        Wait for the filters menu & search results to render (and add a mutationObserver to results)
        =======
        */

        waitForElement("iron-collapse", () => {
            filters_add();
        })

        waitForElement(".ytd-search #contents.ytd-section-list-renderer", () => {
            let filterDebounce = false;
            let observer = new MutationObserver((mutation) => {
                if(filterDebounce) return;

                filterDebounce = true;
                setTimeout(function() {
                    filterDebounce = false;
                }, 50)

                search_results_filter("mutation");
            })
            observer.observe(document.querySelector(".ytd-search #contents.ytd-section-list-renderer"), {childList: true, attributes: false, subtree: true})
        })
    }
}

/*
=======
hh:mm:ss (mm:ss) to seconds
=======
*/
function to_seconds(input) {
    let tr = 0;

    let split = input.split(":")
    switch(split.length) {
        // ss
        case 1: {
            tr += parseInt(split[0])
            if(isNaN(parseInt(split[0]))) {
                tr = 0;
            }
            break;
        }
        // mm:ss
        case 2: {
            tr += parseInt(split[0]) * 60
            tr += parseInt(split[1])
            break;
        }
        // hh:mm:ss
        case 3: {
            tr += parseInt(split[0]) * 3600
            tr += parseInt(split[1]) * 60
            tr += parseInt(split[2])
            break;
        }
    }

    return tr;
}

/*
=======
simpleText to actual count
=======
*/
function simple_to_count(simpleText) {
    let tr = 0;

    simpleText = simpleText.replaceAll("&nbsp;", " ")
    simpleText = simpleText.split(" ")
    if(simpleText.length >= 2) {
        simpleText.pop()
    }
    simpleText = simpleText.join(" ")
    simpleText = simpleText.replaceAll(",", ".")



    let ending = simpleText.replace(/[0-9+.+ ]/gi, "").toLowerCase();

    if(ending.length == 0) {
        simpleText = simpleText.replaceAll(".", "")
    }

    tr = parseFloat(simpleText) || 0


    switch(ending.trimStart()) {
        case "k":
        case "tys":
        case "rbx":
        case "tis":
        case "þ":
        case "e":
        case "tūkst":
        case "settk":
        case "kde":
        case "t": {
            tr = tr * 1000
            break;
        }

        case "m":
        case "mln":
        case "jtx":
        case "mil":
        case "mio":
        case "mde":
        case "settmill":
        case "mde":
        case "milj":
        case "mn": {
            tr = tr * 1000000
            break;
        }

        case "b":
        case "mld":
        case "mjd":
        case "mx":
        case "mia":
        case "mrd":
        case "mdde":
        case "mir":
        case "ma":
        case "mlrd":
        case "settmrd":
        case "mmde":
        case "mr": {
            tr = tr * 1000000000
            break;
        }
    }

    return tr;
}


/*
=======
poll-based wait for element
=======
*/
function waitForElement(selector, callback) {
    let x = setInterval(function() {
        if(document.querySelector(selector)) {
            callback();
            clearInterval(x);
        }
    }, 250)
}



/*
=======
autocomplete function for filters:

specific-author
author-exclude
=======
*/
function autocomplete_creators(inputClassName) {
    $(inputClassName).addEventListener("input", () => {
        let value = $(inputClassName).value.split(", ")
        if(value[value.length - 1].length <= 1) return;
        let tempY = window.scrollY;
        window.scrollTo(0, 0);
        let bounds = $(inputClassName).getBoundingClientRect()
        window.scrollTo(0, tempY)

        // create a list of names from search results and autocomplete based on those
        let creatorList = []
        document.querySelectorAll(`ytd-video-renderer .ytd-channel-name a`).forEach(channel => {
            if(!creatorList.includes(channel.innerHTML)) {
                creatorList.push(channel.innerHTML)
            }
        })

        // remove previous suggestions
        if(document.querySelector(`.as_autocomplete_belongs_to_${inputClassName.replace(".", "")}`)) {
            document.querySelector(`.as_autocomplete_belongs_to_${inputClassName.replace(".", "")}`).remove();
        }

        // create an autocomplete div
        let autocomplete = document.createElement("div")
        
        autocomplete.classList.add("as_autocomplete")
        autocomplete.style.top = (bounds.top + bounds.height + 5) + "px"
        autocomplete.style.left = bounds.left + "px"
        autocomplete.classList.add(`as_autocomplete_belongs_to_${inputClassName.replace(".", "")}`)
        creatorList.forEach(creator => {
            if(creator.toLowerCase().startsWith(value[value.length - 1].toLowerCase())) {
                autocomplete.innerHTML += `<p>${creator}</p>`
            }
        })

        if(!autocomplete.querySelector("p")) return;
        document.body.appendChild(autocomplete)

        // append to the textbox if a name is clicked
        autocomplete.querySelectorAll("p").forEach(box => {
            box.addEventListener("click", () => {
                value[value.length - 1] = box.innerHTML
                $(inputClassName).value = value.join(", ")
                $(inputClassName).scrollTo($(inputClassName).value.length * 20, 0)
                autocomplete.remove();
            })
        })
    })

    // remove when clicked away
    document.body.addEventListener("click", (e) => {
        try {
            let autocomplete = document.querySelector(`.as_autocomplete_belongs_to_${inputClassName.replace(".", "")}`)
            if(!e.path.includes(autocomplete)) {
                autocomplete.remove();
            }
        }
        catch(error) {}
    })
}