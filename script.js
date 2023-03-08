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