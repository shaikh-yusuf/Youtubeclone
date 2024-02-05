const API_KEY = "AIzaSyAFWs679G2VgCiGEga8gXNKffMZM6u8K80";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

window.addEventListener("load", () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const videoId = params.get("videoId");
  // or do it using localstorage
  if (YT) {
    new YT.Player("video-container", {
      height: "500",
      width: "1000",
      videoId: videoId,
    });
  }

  function getChannelDetails(channelId) {
    fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&id=${channelId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("lll", data);
        console.log("channel", data.items[0].id);
        let name = data.items[0].snippet.title;
        document.getElementById("channel_Name").innerText = name;
        loadRecommendedVideos(name);
      });
  }

  function getVideoStats() {
    fetch(`${BASE_URL}/videos?key=${API_KEY}&part=statistics&id=${videoId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("stats", data);
      });
  }

  function getVideoDetails() {
    fetch(`${BASE_URL}/videos?key=${API_KEY}&part=snippet&id=${videoId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("video details", data);
        console.log(data.items[0].snippet.channelId);
        getChannelDetails(data.items[0].snippet.channelId);
      });
  }

  function getComments() {
    fetch(
      `${BASE_URL}/commentThreads?key=${API_KEY}&part=snippet&videoId=${videoId}&maxResults=25`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("comments", data);
        data.items.forEach((data) => {
          document.getElementById("comment-section").innerHTML += `
         
          <img src="${data.snippet.topLevelComment.snippet.authorProfileImageUrl}" class="" alt="">
         <h4 class="title" >${data.snippet.topLevelComment.snippet.textDisplay}</h4>
         `;
        });

        //
        // [0].snippet.topLevelComment.snippet.textDisplay
      });
  }

  async function loadRecommendedVideos(channelName) {
    try {
      const response = await fetch(
        `${BASE_URL}/search?key=${API_KEY}&maxResults=10&part=snippet&q=${channelName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Recommended videos", data);
      if (data.items) {
        displayRecommendedVideos(data.items);
      } else {
        console.log("No recommended videos available or data is undefined.");
      }
    } catch (error) {
      console.error("Error fetching recommended videos: ", error);
    }
  }

  function displayRecommendedVideos(videos) {
    const recommendedSection = document.getElementById("recommended-videos");
    recommendedSection.innerHTML = "";

    videos.forEach((video) => {
      const videoId = video.id.videoId;
      const title = video.snippet.title;
      const thumbnail = video.snippet.thumbnails.default.url;
      const videoCard = document.createElement("div");
      videoCard.innerHTML = `
            <a href="video.html?videoId=${videoId}">
                <img src="${thumbnail}" alt="${title}" >
                <div class="content">
                <div class="info">
                <p class="channel-name">${title}</p>
                </div>
                </div>
            </a>
        `;

      recommendedSection.appendChild(videoCard);
    });
  }

  getVideoStats();
  getVideoDetails();
  getComments();
});
