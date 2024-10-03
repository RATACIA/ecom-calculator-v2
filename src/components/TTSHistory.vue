<template>
  <div>
    <v-row>
      <v-col>
        <h2 class="pa-3 mt-3 mb-5" style="margin: auto">
          <v-icon>mdi-history</v-icon>
          AI Generated Content History
        </h2>
      </v-col>
    </v-row>
  </div>
  <v-row>
    <v-col
      v-for="(item, index) in historyItems"
      :key="index"
      cols="12"
      sm="12"
      md="6"
      lg="4"
    >
      <v-card class="my-6 mx-2 py-2 px-4" color="grey-darken-4">
        <v-row class="pa-1 ma-1">
          <v-col class="d-flex">
            <v-chip class="pa-2 ma-1" color="orange">{{
              item.voice_name
            }}</v-chip>
            <v-chip class="pa-2 ma-1" color="orange">{{ item.source }}</v-chip>
          </v-col>

          <v-col class="d-flex justify-end">
            <v-chip>{{ UnixToDate(item.date_unix) }}</v-chip>
          </v-col>
        </v-row>
        <div
          style="border: solid white 1px; border-radius: 15px; padding: 5px 2px"
        >
          <span>Text:</span><br />
          {{ item.text }}
        </div>
        <v-divider class="my-1"></v-divider>
        <v-row class="ma-2">
          <v-col class="py-2 px-0">
            <v-card-text class="mx-2">Play</v-card-text>
            <v-icon @click="toggleAudio(index)">
              {{ isAudioPlaying[index] ? "mdi-stop" : "mdi-play" }}
            </v-icon>

            <v-card-text class="mx-2">Download</v-card-text>
            <v-icon @click="downloadItem(item.history_item_id)"
              >mdi-download</v-icon
            >
          </v-col>
          <v-col>
            <v-spacer></v-spacer>
          </v-col>
          <v-col class="py-2 px-0">
            <v-card-text class="mx-2">Delete</v-card-text>
            <v-icon @click="toggleModal(item)">mdi-delete</v-icon>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="modalVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline text-center">Sterge produs</v-card-title>
      <v-card-text class="text-center">
        Esti sigur(a) ca doresti sa stergi acest produs?
      </v-card-text>
      <v-card-actions class="text-center">
        <v-btn @click="deleteItem(currentItemId)">Sterge</v-btn>
        <v-btn @click="toggleModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">
    {{ snackbarText }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
const historyItems = ref([]);
const isAudioPlaying = ref([]);
const snackbar = ref(false);
const timeout = 2000;
const snackbarColor = ref("green-accent-1");
const snackbarText = ref("Item deleted successfully.");
const currentItemId = ref(null);
const modalVisible = ref(false);
let audio = null;

const toggleModal = (item) => {
  modalVisible.value = !modalVisible.value;
  if (item) {
    currentItemId.value = item.history_item_id;
    console.log("Current Item ID:", currentItemId.value);
  }
};

const closeModal = () => {
  modalVisible.value = false;
};

const UnixToDate = (input) => {
  const date = new Date(input * 1000);
  const currentTime = new Date();

  const secondsDifference = Math.floor((currentTime - date) / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);

  if (secondsDifference < 60) {
    return `${secondsDifference} ${
      secondsDifference === 1 ? "second" : "seconds"
    } ago`;
  } else if (minutesDifference < 60) {
    return `${minutesDifference} ${
      minutesDifference === 1 ? "minute" : "minutes"
    } ago`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago`;
  } else {
    const daysDifference = Math.floor(hoursDifference / 24);
    return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
  }
};

const fetchHistory = async () => {
  const options1 = {
    method: "GET",
    headers: { "xi-api-key": import.meta.env.VITE_TEXT_TO_SPEECH_KEY },
  };

  try {
    const response = await fetch(
      "https://api.elevenlabs.io/v1/history",
      options1
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    historyItems.value = data.history;

    console.log(historyItems.value);
  } catch (error) {
    console.error("Error fetching history:", error);
  }
  isAudioPlaying.value = Array(historyItems.value.length).fill(false);
};

const deleteItem = (historyItemId) => {
  const options = {
    method: "DELETE",
    headers: { "xi-api-key": import.meta.env.VITE_TEXT_TO_SPEECH_KEY },
  };

  fetch(`https://api.elevenlabs.io/v1/history/${historyItemId}`, options)
    .then((response) => {
      if (response.ok) {
        console.log(`Item ${historyItemId} deleted`);
        snackbar.value = true;
        snackbarColor.value = "success";
        fetchHistory();
        closeModal();
      } else {
        snackbar.value = true;
        snackbarColor.value = "red";
        snackbarText.value = "Eroare API";
        console.log("error", response);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const downloadItem = (historyItemId) => {
  const options = {
    method: "POST",
    headers: {
      "xi-api-key": import.meta.env.VITE_TEXT_TO_SPEECH_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ history_item_ids: [historyItemId] }),
  };

  fetch("https://api.elevenlabs.io/v1/history/download", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "downloaded_file.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((err) => console.error(err));
};

const getAudioForItem = (historyItemId, index) => {
  const options = {
    method: "GET",
    headers: { "xi-api-key": import.meta.env.VITE_TEXT_TO_SPEECH_KEY },
  };

  fetch(`https://api.elevenlabs.io/v1/history/${historyItemId}/audio`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const audioUrl = URL.createObjectURL(blob);

      if (audio && !audio.paused) {
        audio.pause();
        isAudioPlaying.value[index] = false;
      } else {
        audio = new Audio(audioUrl);

        audio.addEventListener(
          "play",
          () => (isAudioPlaying.value[index] = true)
        );

        audio.addEventListener(
          "pause",
          () => (isAudioPlaying.value[index] = false)
        );

        audio.play();
      }
    })
    .catch((err) => console.error(err));
};

const toggleAudio = (index) => {
  getAudioForItem(historyItems.value[index].history_item_id, index);
};

onMounted(() => {
  fetchHistory();
});
</script>
