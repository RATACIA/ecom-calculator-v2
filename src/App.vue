<script setup></script>

<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-sm-and-down pl-5"
        >Ecom Tools</v-toolbar-title
      >
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="mt-0" width="200">
      <v-list>
        <v-list-item @click="$router.push('/')">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-calculator</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Ecom Calculator</v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="$router.push('/history')">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Ecom Calculator History</v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="$router.push('/ai-speech')">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-message</v-icon>
          </v-list-item-icon>
          <v-list-item-content>AI Text to speech</v-list-item-content>
        </v-list-item>
        <v-divider> </v-divider>
        <v-list-item @click="$router.push('/tts-history')">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-content>TTS history</v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="$router.push('/yt-mp3')">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-cloud-download</v-icon>
          </v-list-item-icon>
          <v-list-item-content>YouTube to Mp3</v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="$router.push('/currency-convert')">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-currency-eur</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Currency</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-2">
      <v-row no-gutters>
        <v-col class="mr-3">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>
