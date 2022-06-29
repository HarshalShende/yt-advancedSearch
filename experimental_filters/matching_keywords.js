/*
=======
Separate functions for matching-keywords
=======
*/

function includes_keywords(videoData, keywords) {
    let pass = false;
    let tags = []

    // trim off start spaces
    keywords.split(",").forEach(keyword => {
        tags.push(keyword.toLowerCase().trimStart())
    })

    // lowercase all tags
    try {
        videoData.tags.forEach(tag => {
            videoData.tags[videoData.tags.indexOf(tag)] = tag.toLowerCase()
        })
    }
    catch(error) {}

    // if we have at least 1 matching, set pass to true
    tags.forEach(keyword => {
        try {
            if(videoData.tags.includes(keyword)) {
                pass = true;
            }
        }
        catch(error) {}
    })
    return pass;
}