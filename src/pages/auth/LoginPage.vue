<script setup>
import useAuth from "@/lib/feats/authSlice.js";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const {loginUser} = useAuth();

const router = useRouter();
const handleSubmit = (form) => {
  const formData = new FormData(form.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const loggedIn = loginUser(email, password);
  if(!loggedIn.error){
    router.push("/")
    toast.success(`Welcome back, ${loggedIn.user.username}`)
  }else{
    toast.error(loggedIn.error)
  }
};

</script>
<template>
  <div
    class="w-full min-h-[calc(100vh-10rem)] flex items-center justify-center"
  >
    <div
      class="w-full text-black p-2 max-w-md flex justify-center flex-col gap-3"
    >
      <h1 class="text-3xl">Welcome back,</h1>
      <p>
        Hi, my name is Eventful Moments, I am a bucket… no, not the bucket of
        water but I store awesome moments you will like to have in coming years.
      </p>
      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-5 items-center"
      >
        <label for="email" class="w-full flex flex-col gap-2">
          <span class="text-sm">Email</span>
          <input
            required
            class="w-full p-2 border-2 border-accent rounded-md"
            type="email"
            name="email"
            id="email"
          />
        </label>
        <label for="password" class="w-full flex flex-col gap-2">
          <span class="text-sm">Password</span>
          <input
            required
            class="w-full p-2 border-2 border-accent rounded-md"
            type="password"
            name="password"
            id="password"
          />
        </label>
        <button
          type="submit"
          class="min-w-48 py-3 rounded-xl text-white px-2 bg-tertiary border-accent border-[1px]"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
