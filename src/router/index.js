import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../components/HelloWorld.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/history",
      name: "History",
      component: () => import("../components/HistoryComponent.vue"),
    },
    {
      path: "/ai-speech",
      name: "AiSpeech",
      component: () => import("../components/TextToSpeech.vue"),
    },
    {
      path: "/tts-history",
      name: "tts-history",
      component: () => import("../components/TTSHistory.vue"),
    },
    {
      path: "/yt-mp3",
      name: "yt-mp3",
      component: () => import("../components/YtToMp3Comp.vue"),
    },
    {
      path: "/currency-convert",
      name: "currency-convert",
      component: () => import("../components/CurrencyConvertComp.vue"),
    },
  ],
});
export default router;
