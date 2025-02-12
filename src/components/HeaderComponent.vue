<script setup>
import useAuth from "@/lib/feats/authSlice";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const { $state, logout } = useAuth();
const isSmallMenuOpened = ref(false);
const toggleOpen = () => {
  isSmallMenuOpened.value = !isSmallMenuOpened.value;
};

</script>

<template>
  <header
    class="bg-primary sticky top-0 w-full text-white py-4 px-4 sm:px-8 flex items-center justify-between"
  >
    <RouterLink to="/" class="italic !bg-transparent !font-semibold">Eventful moments</RouterLink>

    <nav class="hidden min-[498px]:flex gap-2 min-[498px]:gap-6 duration-300 *:p-2 items-center">
      <RouterLink v-if="!$state.isAuthenticated" to="/auth/login"> Login </RouterLink>
      <RouterLink v-if="!$state.isAuthenticated" to="/auth/register"> Register </RouterLink>
      <button @click="logout" v-if="$state.isAuthenticated"> Log out </button>
      <RouterLink v-if="$state.isAuthenticated" to="/add"> My Buckets </RouterLink>
    </nav>

    <!--for really small screens-->
    <button
      @click="toggleOpen"
      :class="[
        'size-5 cursor-pointer relative flex items-center justify-center gap-2 flex-col min-[498px]:hidden z-20',
        'before:absolute after:absolute before:duration-300 after:duration-300',
        'before:w-full after:w-full',
        'before:h-0.5 after:h-0.5',
        'before:bg-white after:bg-white',
        isSmallMenuOpened
          ? 'before:rotate-45 before:top-1/2 before:-translate-y-1/2 after:-rotate-45 after:top-1/2 after:-translate-y-1/2'
          : 'before:-translate-y-1.5 after:translate-y-1.5',
      ]"
    ></button>
    <nav
      :class="[
        'flex flex-col bg-primary duration-300 text-white p-2 rounded-bl-md absolute gap-2 min-[498px]:hidden right-0',
        isSmallMenuOpened
          ? 'top-[100%] z-10'
          : 'top-0 !p-0 -z-10 pointer-events-none opacity-0',
      ]"
    >
    
      <RouterLink
        v-if="!$state.isAuthenticated"
        to="/auth/login"
        class="px-2 py-1 min-w-32 max-w-[70vw] duration-300 rounded-md w-full hover:bg-black/20"
      >
        Login
      </RouterLink>
      <RouterLink
      v-if="!$state.isAuthenticated"

        to="/auth/register"
        class="px-2 py-1 min-w-32 max-w-[70vw] duration-300 rounded-md w-full hover:bg-black/20"
      >
        Register
      </RouterLink>
      <button
      @click="logout"
        v-if="$state.isAuthenticated"
        class="px-2 py-1 min-w-32 max-w-[70vw] duration-300 rounded-md w-full hover:bg-black/20"
      >
        Log out
      </button>
      <RouterLink
      v-if="$state.isAuthenticated"

        to="/add"
        class="px-2 py-1 min-w-32 max-w-[70vw] duration-300 rounded-md w-full hover:bg-black/20"
      >
        My Bucket
      </RouterLink>
    </nav>
  </header>
</template>


