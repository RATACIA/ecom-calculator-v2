<template>
  <v-card class="pa-2" color="grey-darken-4">
    <div>
      <v-row>
        <v-col>
          <h2 class="pa-3 mt-3 mb-5" style="margin: auto">
            <v-icon>mdi-message-text</v-icon>
            Text to speech tool for e-commerce videos/directives
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" sm="12" style="margin: auto">
          <v-select
            variant="outlined"
            :items="voiceOptions"
            v-model="selectedVoice"
            label="Select Voice"
            item-text="name"
          ></v-select>
          <v-card
            width="400"
            color="orange"
            class="pa-3 mt-3 mb-5"
            style="margin: auto"
            >Fine tune the voice settings</v-card
          >
          <v-card width="100" style="margin: auto">Stability</v-card>
          <v-slider
            v-model="stabilityTuning"
            :max="1"
            :min="0"
            :step="0.1"
            thumb-label
          ></v-slider>
          <v-card width="120" style="margin: auto">Similarity boost</v-card>
          <v-slider
            v-model="similarityTuning"
            :max="1"
            :min="0"
            :step="0.1"
            thumb-label
          ></v-slider>
          <v-checkbox label="Speaker Boost" v-model="speakerBoost"></v-checkbox>
        </v-col>
      </v-row>

      <v-textarea
        v-model="text"
        class="py-6"
        prepend-inner-icon="mdi-message-text"
        label="adauga mesaj"
        variant="outlined"
      ></v-textarea>
      <v-btn class="ma-2" color="orange" @click="convertTextToSpeech">
        Convert Text to Speech
      </v-btn>
      <v-btn
        class="ma-2"
        color="orange"
        @click="convertTextToSpeechAndDownload"
      >
        Convert Text to Speech and download
      </v-btn>
    </div>
  </v-card>
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
import { ref, watch, watchEffect } from "vue";

const voiceOptions = ["Mamaie", "Vadim", "Ana lu Ghita"];
const selectedVoice = ref("");
const voiceId = ref("");
const stabilityTuning = ref(0.4);
const similarityTuning = ref(0.5);
const speakerBoost = ref(false);
const text = ref("");
const audioBlob = ref(null);
const snackbar = ref(false);
const timeout = 2000;
const snackbarColor = ref("success");
const snackbarText = ref("Conversion successful.");

const checkVoiceId = () => {
  if (selectedVoice.value === "Mamaie") {
    voiceId.value = "531s3tRmcAgeowflt0ui";
  } else if (selectedVoice.value === "Vadim") {
    voiceId.value = "OLg73QGxWJupSLFWQ0iR";
  } else if (selectedVoice.value === "Ana lu Ghita") {
    voiceId.value = "Q5NAvieUQEodAqiQwW7w";
  }
};

const convertTextToSpeech = async () => {
  const headers = {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": "4b8dd56324399a451a423983f8b6a0b5",
  };
  const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId.value}`;
  try {
    const data = {
      text: text.value,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: stabilityTuning.value,
        similarity_boost: similarityTuning.value,
        use_speaker_boost: speakerBoost.value,
      },
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    snackbar.value = true;
    snackbarText.value = "Audio conversion successful!";
    snackbarColor.value = "success";
    const buffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    audioBlob.value = new Blob([uint8Array], { type: "audio/mpeg" });

    console.log("Audio conversion successful!");
  } catch (error) {
    snackbar.value = true;
    snackbarColor.value = "red";
    snackbarText.value = "Eroare";
    console.error("Error converting audio:", error.message);
  }
};

const downloadAudio = () => {
  if (audioBlob.value) {
    snackbar.value = true;
    snackbarColor.value = "success";
    snackbarText.value = "File downloaded successfully";
    const url = URL.createObjectURL(audioBlob.value);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audio-download.mp3";
    a.click();
    console.log("Audio file downloaded successfully!");
  } else {
    snackbar.value = true;
    snackbarColor.value = "red";
    snackbarText.value = "Eroare";
    console.error("No audio to download. Convert text to speech first.");
  }
};

const convertTextToSpeechAndDownload = () => {
  convertTextToSpeech()
    .then(() => downloadAudio())
    .catch((error) =>
      console.error("Error in conversion or download:", error.message)
    );
};

watchEffect(() => {
  checkVoiceId();
});

watch(speakerBoost, (newVal) => {
  console.log(newVal);
});

watch(stabilityTuning, (newValue, oldValue) => {
  console.log(newValue);
});

watch(similarityTuning, (newValue, oldValue) => {
  console.log(newValue);
});
</script>
