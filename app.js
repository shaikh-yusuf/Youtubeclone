const videoCardContainer = document.querySelector(".video-container");

// let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

// fetch(
//   video_http +
//     new URLSearchParams({
//       key: api_key,
//       part: "snippet",
//       chart: "mostPopular",
//       maxResults: 50,
//       regionCode: "IN",
//     })
// )
//   .then((res) => res.json())
//   .then((data) => {
//     data.items.forEach((item) => {
//       getChannelIcon(item);
//     });
//   })
//   .catch((err) => console.log(err));

// const getChannelIcon = (video_data) => {
//   fetch(
//     channel_http +
//       new URLSearchParams({
//         key: api_key,
//         part: "snippet",
//         // part: "statistics", // it is for viewcount
//         id: video_data.snippet.channelId,
//       })
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       video_data.channelThumbnail =
//         data.items[0].snippet.thumbnails.default.url;
//       makeVideoCard(video_data);
//     });
// };

// const makeVideoCard = (data) => {
//   videoCardContainer.innerHTML += `
//     <div class="video" onclick="location.href ='https://youtube.com/watch?v=${data.id}'">
//         <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
//         <div class="content">
//             <img src="${data.channelThumbnail}" class="channel-icon" alt="">
//             <div class="info">
//              <h4 class="title">${data.snippet.title}</h4>
//                 <p class="channel-name">${data.snippet.channelTitle}</p>
//             </div>
//         </div>
//     </div>
//     `;
// };

// search bar

{
  /* <div class="video" onclick=" location.href = 'https://youtube.com/watch?v=${data.id}'"> */
}

// const searchInput = document.querySelector(".search-bar");
// const searchBtn = document.querySelector(".search-btn");
// let searchLink = "https://www.youtube.com/results?search_query=";

// searchBtn.addEventListener("click", () => {
//   if (searchInput.value.length) {
//     location.href = searchLink + searchInput.value;
//   }
// });

// function videoId1(data) {
//   console.log(data.id);
// }

/////////////////

const API_KEY = "AIzaSyAFWs679G2VgCiGEga8gXNKffMZM6u8K80";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

document.getElementById("search-btn").addEventListener("click", () => {
  getVideos(document.getElementById("search-input").value);
});

function getVideos(query) {
  fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${query}&type=video&maxResults=20&part=snippet`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayVideos(data.items);
    });
}

getVideos("");

function displayVideos(videos) {
  // videos - is array
  document.getElementById("videos-container").innerHTML = "";

  videos.forEach((video) => {
    document.getElementById("videos-container").innerHTML += `
      <a href='/video.html?videoId=${video.id.videoId}'>

      <img src="${video.snippet.thumbnails.high.url}" class="thumbnail" alt="">
      <div class="content">
      <img src="${video.snippet.thumbnails.high.url}" class="channel-icon" alt="">
          <div class="info">
           <h4 class="title">${video.snippet.title}</h4>
              <p class="channel-name">${video.snippet.channelTitle}</p>
          </div>
      </div>
 
      </a>
      `;
  });
}
