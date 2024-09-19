<template>
  <h1>YouTube to mp3 download</h1>
  <h2 class="ma-4">Paste the url here</h2>
  <v-text-field v-model="videoUrl" class="ma-3"></v-text-field>

  <v-card v-if="isLoaded" class="ma-3">
    <v-img :src="thumbnail"></v-img>
    <v-card-title>{{ author }}</v-card-title>
    <v-card-subtitle>{{ title }}</v-card-subtitle>
    <v-btn @click="download" class="ma-2" color="success">Download</v-btn>
  </v-card>

  <v-btn v-else @click="fetchInfo" class="ma-3" color="blue-lighten-1"
    >Fetch Info</v-btn
  >
</template>

<script setup>
import { ref } from "vue";

let videoUrl = ref("");
const thumbnail = ref("");
const title = ref("");
const author = ref("");
const isLoaded = ref(false);
let downloadLink = "";

const formatUrl = () => {
  return videoUrl.value.slice(32);
};

const fetchInfo = async () => {
  const url = `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${formatUrl(
    videoUrl.value
  )}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "096339dfcdmshf459ee8181b2b9fp18d767jsn61250751abc6",
      "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    downloadLink = result.link;
    thumbnail.value = result.thumb;
    author.value = result.author;
    title.value = result.title;
    isLoaded.value = true;
  } catch (error) {
    console.error(error);
  }
};

const download = async () => {
  const newTab = window.open(downloadLink, "_blank");
  setTimeout(() => {
    window.onload ? document.querySelector(".dlbtn").click() : "";
    setTimeout(() => {
      newTab.close();
    }, 3000);
  }, 4000); // Nested setTimeout to ensure proper timing
};

// const apiFetch = async () => {
//   console.log(videoUrl.value);
//   const url = `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/?url=${videoUrl.value}`;
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "096339dfcdmshf459ee8181b2b9fp18d767jsn61250751abc6",
//       "X-RapidAPI-Host": "youtube-mp3-downloader2.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     videoTitle.value = result.title;
//     const downloadLink = result.link;
//     initiateDownload(downloadLink);

//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const initiateDownload = (downloadLink) => {
//   const anchor = document.createElement("a");
//   anchor.href = downloadLink;
//   anchor.download = "audio.mp3";

//   // Append the anchor to the body and trigger the click event
//   document.body.appendChild(anchor);
//   anchor.click();
//   document.body.removeChild(anchor);
// };
</script>
