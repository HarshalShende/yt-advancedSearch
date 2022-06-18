/*
=======
Separate functions for upload-after and upload-before
=======
*/

function compare_upload_time(videoData, check) {
    let mode = check.split("-")[1]
    let returnData = false;
    let target = new Date(`${$(".input_up_" + mode + "_year").value}-${$(".input_up_" + mode + "_month").value}-${$(".input_up_" + mode + "_day").value}`).getTime();
    let uploadDate = new Date(videoData.uploadDate).getTime();

    if(mode == "after" && target < uploadDate) {
        returnData = true;
    } else if(mode == "before" && target > uploadDate) {
        returnData = true;
    }

    return returnData;
}