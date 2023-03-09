const videoElement = document.getElementById('videoCamera');

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then((stream) => {
    videoElement.srcObject = stream;
    videoElement.onloadedmetadata = () => {
        videoElement.play();
    }
}).catch((error) => {
    console.error('Erreur lors de l\'accès à la caméra :', error);
});

let facingMode = "environment";

async function toggleCamera() {
    facingMode = facingMode === "environment" ? "user" : "environment";
    const constraints = {
        video: { facingMode: { exact: facingMode } }
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
}

let firstTapTime = 0;
let tappedElement = null;

document.addEventListener("touchstart", (event) => {
    const now = Date.now();
    const timeSinceLastTap = now - firstTapTime;
    if (timeSinceLastTap < 300 && event.target === tappedElement) {
        toggleCamera();
    } else {
        firstTapTime = now;
        tappedElement = event.target;
    }
});

fetch('https://dummyjson.com/comments')
.then(res => res.json())
.then(json => {

    function generateComment(json) {
        // Select the container where the comment will be added
        const commentContainer = document.querySelector(".comment-section");
        console.log(commentContainer);
            const comInfo = document.createElement("div");
            comInfo.classList.add('com-info');

            const userImages = document.createElement("img");
            userImages.setAttribute('src', 'https://xsgames.co/randomusers/avatar.php?g=male');

            const userNames = document.createElement("span");
            const userComments = document.createElement("span");

            userNames.innerHTML = json.comments[i].user.username;
            userComments.innerHTML = json.comments[i].body;

            comInfo.appendChild(userNames);
            comInfo.appendChild(userComments);

            const comments = document.createElement("div");
            comments.classList.add("comments");
            comments.appendChild(userImages);
            comments.appendChild(comInfo);

            commentContainer.appendChild(comments);

        i++;   


        // Set a timer to call the function again every 2 seconds
        setTimeout(() => generateComment(json), 2000);
    }      
    let i = 0;

    generateComment(json);
});
