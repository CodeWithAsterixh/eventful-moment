<script setup>
import { onMounted, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import FooterComponent from "./components/FooterComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import useAuth from "./lib/feats/authSlice";

const { loadUser } = useAuth();
onMounted(() => {
  const res = loadUser();
  if(res.error){
    if (route.name !== "login" && route.name !== "register") {
      router.push("/auth/login");
    }
  }
});
const route = useRoute();
const router = useRouter();
</script>

<template>
  <HeaderComponent />

  <main class="w-full py-10 px-4 sm:px-8 min-h-screen">
    <RouterView />
  </main>
  <FooterComponent />
</template>
