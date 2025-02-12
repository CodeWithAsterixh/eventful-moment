<script setup>
import { onMounted } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import MainLayout from "./layout/MainLayout.vue";
import useAuth from "./lib/feats/authSlice";

const { loadUser } = useAuth();

const route = useRoute();
const router = useRouter();
onMounted(() => {
  const res = loadUser();
  if(res.error){
    if (route.name !== "login" && route.name !== "register") {
      router.push("/auth/login");
    }
  }
});
</script>

<template>
  <MainLayout>
    <RouterView/>
  </MainLayout>
</template>
