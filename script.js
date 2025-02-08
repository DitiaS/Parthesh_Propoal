// Floating hearts animation
function createHearts() {
    for (let i = 0; i < 10; i++) { 
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw"; 
        heart.style.animationDuration = Math.random() * 3 + 4 + "s"; 
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 6000);
    }
}
setInterval(createHearts, 1000);

// Opening the letter when clicked
function openLetter() {
    document.querySelector(".envelope").classList.toggle("open");
}

// Show the video modal when "Yes" or "No" is clicked
function showVideo(videoSrc, callback) {
    let videoPlayer = document.getElementById("videoPlayer");
    let videoModal = document.getElementById("videoModal");

    videoPlayer.src = videoSrc;  
    videoModal.style.display = "block";  
    videoPlayer.play();

    // Wait for video to finish, then call callback function
    videoPlayer.onended = function () {
        closeVideo();
        if (callback) callback();
    };
}

// Close the video modal
function closeVideo() {
    let videoModal = document.getElementById("videoModal");
    let videoPlayer = document.getElementById("videoPlayer");

    videoPlayer.pause();  
    videoPlayer.src = ""; 
    videoModal.style.display = "none"; 

    // Enable "No" button after closing the video
    document.getElementById("noBtn").disabled = false;
}

// Handle "Yes" button click (Plays video)
function handleYes() {
    showVideo("videos/yes-video.mp4");
}

// Handle "No" button click logic (Plays video 1 first, then video 2)
let noClickCount = 0;

function handleNo() {
    document.getElementById("noBtn").disabled = true; // Disable No button while video plays

    if (noClickCount === 0) {
        showVideo("videos/no-video1.mp4", () => {
            noClickCount++; // Increase after video 1 finishes
        });
    } else if (noClickCount === 1) {
        showVideo("videos/no-video2.mp4", () => {
            addYesButtons(2);
            document.getElementById("noBtn").remove(); // Remove "No" button after second video
        });
    }
}

// Adding more "Yes" buttons dynamically
function addYesButtons(count) {
    for (let i = 0; i < count; i++) {
        let yesBtn = document.createElement("button");
        yesBtn.innerText = "Yes! 💕";
        yesBtn.classList.add("yesBtn");
        yesBtn.onclick = () => showVideo("videos/yes-video.mp4"); 
        document.querySelector(".buttons").appendChild(yesBtn);
    }
}

// Attach event listeners to buttons
document.getElementById("yesBtn").addEventListener("click", handleYes);
document.getElementById("noBtn").addEventListener("click", handleNo);
document.getElementById("closeVideo").addEventListener("click", closeVideo);