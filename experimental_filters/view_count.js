/*
=======
Separate function for view counts

moved over to experimental for accuracy :)
=======
*/
function view_count_compare(video, check) {
    let pass = false;
    if(!video.views) return;

    switch(check) {
        case "views-more": {
            let count = simple_to_count($(".input_views_more").value);
            if(count <= video.views) {
                pass = true;
            }
            break;
        }
        case "views-less": {
            let count = simple_to_count($(".input_views_less").value);
            if(count >= video.views) {
                pass = true;
            }
            break;
        }
    }

    return pass;
}