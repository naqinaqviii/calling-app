const createUserBtn = document.getElementById("create-user");
const username = document.getElementById("username");
const allusersHtml = document.getElementById("allusers");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const endCallBtn = document.getElementById("end-call-btn");
const micBtn = document.getElementById("mic-btn");
const cameraBtn = document.getElementById("camera-btn");
const screenShareBtn = document.getElementById("screen-share-btn");
const statusText = document.getElementById("status-text");
const incomingCallModal = document.getElementById("incoming-call-modal");
const outgoingCallModal = document.getElementById("outgoing-call-modal");
const callTypeModal = document.getElementById("call-type-modal");
const acceptCallBtn = document.getElementById("accept-call-btn");
const rejectCallBtn = document.getElementById("reject-call-btn");
const cancelCallBtn = document.getElementById("cancel-call-btn");
const videoCallBtn = document.getElementById("video-call-btn");
const audioCallBtn = document.getElementById("audio-call-btn");
const closeCallTypeBtn = document.getElementById("close-call-type-btn");
const callerNameElement = document.getElementById("caller-name");
const outgoingUserName = document.getElementById("outgoing-user-name");
const outgoingStatus = document.getElementById("outgoing-status");
const callTypeUserName = document.getElementById("call-type-user");
const incomingCallTypeText = document.getElementById("incoming-call-type");
const remoteVideoWrapper = document.querySelector(".video-wrapper.remote");
const localVideoWrapper = document.querySelector(".video-wrapper.local");
const remotePlaceholder = document.getElementById("remote-placeholder");
const localPlaceholder = document.getElementById("local-placeholder");
const ringSound = document.getElementById("ring-sound");

const socket = io();
let localStream;
let caller = [];
let isMicOn = true;
let isCameraOn = true;
let incomingCallData = null;
let currentOutgoingCall = null;
let pendingCallUser = null;
let isVideoCall = true;
let currentCallType = null;
let currentPeer = null;
let iceCandidateQueue = [];
let screenStream = null;

// Single Method for peer connection
const PeerConnection = (function () {
    let peerConnection;

    const createPeerConnection = () => {
        const config = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' }
            ]
        };
        peerConnection = new RTCPeerConnection(config);

        // add local stream to peer connection based on call type
        localStream.getTracks().forEach(track => {
            // Only add video track if it's a video call
            if (track.kind === 'video' && !currentCallType) return;
            if (track.kind === 'video' && currentCallType === 'audio') return;
            peerConnection.addTrack(track, localStream);
        })

        // listen to remote stream and add to peer connection
        peerConnection.ontrack = function (event) {
            remoteVideo.srcObject = event.streams[0];
            // Show video once stream is received
            if (currentCallType === 'video') {
                remotePlaceholder.classList.add('hidden');
                remoteVideoWrapper.classList.remove('hidden');
                localPlaceholder.classList.remove('hidden');
                localVideoWrapper.classList.remove('hidden');
            }
        }

        // listen for ice candidate
        peerConnection.onicecandidate = function (event) {
            if (event.candidate && currentPeer) {
                socket.emit("icecandidate", { candidate: event.candidate, to: currentPeer });
            }
        }

        return peerConnection;
    }

    return {
        getInstance: () => {
            if (!peerConnection) {
                peerConnection = createPeerConnection();
            }
            return peerConnection;
        },
        closePeerConnection: () => {
            if (peerConnection) {
                peerConnection.close();
                peerConnection = null;
            }
        }
    }
})();

// Function to show incoming call notification
const showIncomingCallNotification = (callerName) => {
    callerNameElement.textContent = callerName;
    incomingCallModal.classList.remove('hidden');

    // Play ring sound
    playRingSound();

    statusText.textContent = `Incoming call from ${callerName}...`;
};

// Function to hide incoming call notification
const hideIncomingCallNotification = () => {
    incomingCallModal.classList.add('hidden');
    stopRingSound();
};

// Function to show outgoing call notification
const showOutgoingCallNotification = (userName) => {
    currentOutgoingCall = userName;
    outgoingUserName.textContent = userName;
    outgoingStatus.textContent = "Ringing...";
    outgoingCallModal.classList.remove('hidden');

    // Play ring sound for caller too
    playRingSound();
};

// Function to hide outgoing call notification
const hideOutgoingCallNotification = () => {
    outgoingCallModal.classList.add('hidden');
    stopRingSound();
    currentOutgoingCall = null;
};

// Update outgoing call status
const updateOutgoingCallStatus = (status) => {
    if (currentOutgoingCall) {
        outgoingStatus.textContent = status;
    }
};

// Function to play ring sound
const playRingSound = () => {
    // Create a simple ring tone using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

    // Create ring pattern: 800Hz for 0.5s, silence 0.5s, repeat
    let time = audioContext.currentTime;
    const pattern = [
        { freq: 800, duration: 0.5 },
        { freq: 0, duration: 0.3 }
    ];

    const patternDuration = 0.8;
    let repetitions = 0;
    const maxRepetitions = 10;

    const playPattern = () => {
        if (repetitions >= maxRepetitions) {
            oscillator.stop();
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            return;
        }

        pattern.forEach(note => {
            if (note.freq === 0) {
                gainNode.gain.setValueAtTime(0, time);
            } else {
                oscillator.frequency.setValueAtTime(note.freq, time);
                gainNode.gain.setValueAtTime(0.3, time);
            }
            time += note.duration;
        });

        repetitions++;
        setTimeout(playPattern, patternDuration * 1000);
    };

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.start();
    playPattern();
};

// Function to stop ring sound
const stopRingSound = () => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.close();
    } catch (e) { }
};

// Toggle Microphone
micBtn.addEventListener("click", (e) => {
    if (localStream) {
        localStream.getAudioTracks().forEach(track => {
            track.enabled = !track.enabled;
        });
        isMicOn = !isMicOn;
        micBtn.style.background = isMicOn ? 'var(--gray-100)' : '#fca5a5';
        micBtn.style.color = isMicOn ? 'var(--gray-900)' : '#dc2626';
    }
});

// Toggle Camera
cameraBtn.addEventListener("click", (e) => {
    if (localStream) {
        localStream.getVideoTracks().forEach(track => {
            track.enabled = !track.enabled;
        });
        isCameraOn = !isCameraOn;
        cameraBtn.style.background = isCameraOn ? 'var(--gray-100)' : '#fca5a5';
        cameraBtn.style.color = isCameraOn ? 'var(--gray-900)' : '#dc2626';
    }
});

// Toggle Screen Share
screenShareBtn.addEventListener("click", async () => {
    try {
        if (!screenStream) {
            screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            const screenTrack = screenStream.getVideoTracks()[0];
            const pc = PeerConnection.getInstance();
            const sender = pc.getSenders().find(s => s.track && s.track.kind === screenTrack.kind);
            if (sender) sender.replaceTrack(screenTrack);

            localVideo.srcObject = screenStream;
            screenShareBtn.style.background = 'var(--primary-light)';
            screenShareBtn.style.color = 'white';

            screenTrack.onended = () => {
                const videoTrack = localStream.getVideoTracks()[0];
                if (sender) sender.replaceTrack(videoTrack);
                localVideo.srcObject = localStream;
                screenStream = null;
                screenShareBtn.style.background = 'var(--gray-100)';
                screenShareBtn.style.color = 'var(--gray-900)';
            };
        } else {
            const screenTrack = screenStream.getVideoTracks()[0];
            screenTrack.stop();
            const videoTrack = localStream.getVideoTracks()[0];
            const pc = PeerConnection.getInstance();
            const sender = pc.getSenders().find(s => s.track && s.track.kind === videoTrack.kind);
            if (sender) sender.replaceTrack(videoTrack);

            localVideo.srcObject = localStream;
            screenStream = null;
            screenShareBtn.style.background = 'var(--gray-100)';
            screenShareBtn.style.color = 'var(--gray-900)';
        }
    } catch (e) {
        console.error("Screen sharing failed", e);
    }
});

// Accept incoming call
acceptCallBtn.addEventListener("click", async (e) => {
    if (incomingCallData) {
        hideIncomingCallNotification();
        const { from, to, offer } = incomingCallData;

        const pc = PeerConnection.getInstance();
        await pc.setRemoteDescription(new RTCSessionDescription(offer));

        // Process queued ICE candidates
        while (iceCandidateQueue.length > 0) {
            const candidate = iceCandidateQueue.shift();
            try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch (e) { console.error(e); }
        }

        currentPeer = from;
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { from, to, answer: pc.localDescription });
        caller = [from, to];

        // Show videos for video calls
        if (currentCallType === 'video') {
            localVideo.srcObject = localStream;
            remotePlaceholder.classList.add('hidden');
            remoteVideoWrapper.classList.remove('hidden');
            localPlaceholder.classList.add('hidden');
            localVideoWrapper.classList.remove('hidden');
            screenShareBtn.classList.remove('hidden');
        } else {
            // For audio calls, show placeholder instead of video
            localPlaceholder.classList.remove('hidden');
            localVideoWrapper.classList.add('hidden');
            remotePlaceholder.classList.remove('hidden');
            remoteVideoWrapper.classList.add('hidden');
            screenShareBtn.classList.add('hidden');
        }

        endCallBtn.classList.remove('hidden');
        statusText.textContent = `In call with ${from}`;
    }
});

// Reject incoming call
rejectCallBtn.addEventListener("click", (e) => {
    if (incomingCallData) {
        hideIncomingCallNotification();
        const { from, to } = incomingCallData;
        socket.emit("call-rejected", { from, to, rejectingUser: to });
        incomingCallData = null;
        statusText.textContent = "Call rejected";
    }
});

// Cancel outgoing call
cancelCallBtn.addEventListener("click", (e) => {
    if (currentOutgoingCall) {
        hideOutgoingCallNotification();
        socket.emit("call-cancelled", { from: username.value, to: currentOutgoingCall });
        statusText.textContent = "Call cancelled";
    }
});

// Video call button
videoCallBtn.addEventListener("click", (e) => {
    if (pendingCallUser) {
        currentCallType = 'video';
        isVideoCall = true;
        callTypeModal.classList.add('hidden');
        startCall(pendingCallUser);
        pendingCallUser = null;
    }
});

// Audio call button
audioCallBtn.addEventListener("click", (e) => {
    if (pendingCallUser) {
        currentCallType = 'audio';
        isVideoCall = false;
        cameraBtn.style.display = 'none';
        callTypeModal.classList.add('hidden');
        startCall(pendingCallUser);
        pendingCallUser = null;
    }
});

// Close call type modal
closeCallTypeBtn.addEventListener("click", (e) => {
    callTypeModal.classList.add('hidden');
    pendingCallUser = null;
});

// handle browser events
createUserBtn.addEventListener("click", (e) => {
    if (username.value.trim() !== "") {
        const authOverlay = document.getElementById("auth-overlay");
        const appWrapper = document.getElementById("app-wrapper");

        socket.emit("join-user", username.value.trim());
        statusText.textContent = "Connected ✓";

        // Hide auth screen and show main app
        authOverlay.classList.add("hidden");
        appWrapper.classList.remove("hidden");
    }
});

username.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        createUserBtn.click();
    }
});

endCallBtn.addEventListener("click", (e) => {
    socket.emit("call-ended", caller);
    endCall();
})

// handle socket events
socket.on("joined", allusers => {
    console.log({ allusers });
    const createUsersHtml = () => {
        allusersHtml.innerHTML = "";

        for (const user in allusers) {
            const li = document.createElement("li");
            const userSpan = document.createElement("span");
            userSpan.textContent = `${user} ${user === username.value ? "(You)" : ""}`;
            li.appendChild(userSpan);

            if (user !== username.value) {
                const button = document.createElement("button");
                button.classList.add("call-btn");
                button.addEventListener("click", (e) => {
                    // Show call type selection modal
                    callTypeUserName.textContent = user;
                    pendingCallUser = user;
                    callTypeModal.classList.remove('hidden');
                });
                const icon = document.createElement("i");
                icon.classList.add("fas", "fa-phone");
                button.appendChild(icon);

                li.appendChild(button);
            }

            allusersHtml.appendChild(li);
        }
    }

    createUsersHtml();

})

socket.on("offer", async ({ from, to, offer, callType }) => {
    console.log(`Incoming call from ${from}`);
    currentCallType = callType || 'video';
    incomingCallData = { from, to, offer };

    // Update incoming call type text
    const callTypeText = callType === 'audio' ? 'Audio Call' : 'Video Call';
    incomingCallTypeText.textContent = callTypeText;

    // Hide camera button for audio calls
    if (callType === 'audio') {
        cameraBtn.style.display = 'none';
    } else {
        cameraBtn.style.display = 'inline-flex';
    }

    showIncomingCallNotification(from);
});

socket.on("answer", async ({ from, to, answer }) => {
    const pc = PeerConnection.getInstance();
    await pc.setRemoteDescription(new RTCSessionDescription(answer));

    // Process queued candidates
    while (iceCandidateQueue.length > 0) {
        const candidate = iceCandidateQueue.shift();
        try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch (e) { console.error(e); }
    }

    endCallBtn.classList.remove('hidden');
    hideOutgoingCallNotification();

    // Show videos for video calls
    if (currentCallType === 'video') {
        localVideo.srcObject = localStream;
        remotePlaceholder.classList.add('hidden');
        remoteVideoWrapper.classList.remove('hidden');
        screenShareBtn.classList.remove('hidden');
    } else {
        // For audio calls, show placeholder instead of video
        remotePlaceholder.classList.remove('hidden');
        remoteVideoWrapper.classList.add('hidden');
        screenShareBtn.classList.add('hidden');
    }

    statusText.textContent = `In call with ${to}`;
    socket.emit("end-call", { from, to });
    caller = [from, to];
});

socket.on("icecandidate", async candidate => {
    console.log({ candidate });
    const pc = PeerConnection.getInstance();
    if (!pc.remoteDescription) {
        iceCandidateQueue.push(candidate);
        return;
    }
    try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
        console.error("Error adding ICE candidate:", error);
    }
});

socket.on("end-call", ({ from, to }) => {
    endCallBtn.classList.remove('hidden');
});

socket.on("call-ended", (caller) => {
    endCall();
});

socket.on("call-rejected", ({ from, to }) => {
    if (currentOutgoingCall) {
        hideOutgoingCallNotification();
        statusText.textContent = `${from} declined your call`;
        setTimeout(() => {
            statusText.textContent = "Ready for new calls";
        }, 3000);
    }
});

socket.on("call-cancelled", ({ from, to }) => {
    if (incomingCallData && incomingCallData.from === from) {
        hideIncomingCallNotification();
        incomingCallData = null;
        statusText.textContent = "Call cancelled by caller";
    }
});

// start call method
const startCall = async (user) => {
    console.log({ user })
    const pc = PeerConnection.getInstance();
    currentPeer = user;
    const offer = await pc.createOffer();
    console.log({ offer })
    await pc.setLocalDescription(offer);
    showOutgoingCallNotification(user);
    statusText.textContent = `Calling ${user}...`;
    socket.emit("offer", { from: username.value, to: user, offer: pc.localDescription, callType: currentCallType });
}

const endCall = () => {
    PeerConnection.closePeerConnection();
    endCallBtn.classList.add('hidden');
    statusText.textContent = "Call ended";
    incomingCallData = null;
    stopRingSound();

    // Reset video visibility (Keep local video active)
    remotePlaceholder.classList.remove('hidden');
    remoteVideoWrapper.classList.add('hidden');

    // Reset camera & screen share button visibility
    cameraBtn.style.display = 'inline-flex';
    screenShareBtn.classList.add('hidden');

    // Reset call type
    currentCallType = null;
    currentPeer = null;
    iceCandidateQueue = [];

    setTimeout(() => {
        statusText.textContent = "Ready for new calls";
    }, 2000);
}

// initialize app
const startMyVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        console.log({ stream });
        localStream = stream;

        // Show local video up front
        localVideo.srcObject = stream;
        localPlaceholder.classList.add('hidden');
        localVideoWrapper.classList.remove('hidden');

        statusText.textContent = "Ready to connect";
    } catch (error) {
        statusText.textContent = "⚠ Camera/Mic permission denied";
        console.error(error);
    }
}

startMyVideo();