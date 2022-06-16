/* 
* 29/1/21 2:34pm - Mark Sturtz - created resetRequests
* 29/1/21 11:50pm - Mark Sturtz - created comments for resetRequests.js
* 30/1/21 3:47pm - Mark Sturtz - created change log and reassessed the comments
*/

// create empty requests list
const requests = [];

// function to append elements into this array. elements are: {uuid & Email}
function createResetRequest(resetRequest) {
    requests.push(resetRequest);
}

// used for resetpassword client routes. mathces the id in this request list and returns a specific uuid
function getResetRequest(id) {
    const thisRequest = requests.find(req => req.id === id);
    return thisRequest;
}

// export functions
module.exports = {
    createResetRequest,
    getResetRequest,
}