<script setup>
import useAuth from "@/lib/feats/authSlice";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const { registerUser } = useAuth();
const router = useRouter()
const handleSubmit = (form) => {
  const formData = new FormData(form.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const fullname = formData.get("fullname");
  const res = registerUser(email, password, fullname);
  if (res.error) {
    toast.error(res.error);
  } else {
    toast.success(`Welcome ${res.user.username}, Account has been created`);
    router.push({name:"home"})
  }
};
</script>
<template>
  <div
    class="w-full min-h-[calc(100vh-10rem)] flex items-center justify-center"
  >
    <div
      class="w-full text-black p-2 max-w-md flex justify-center flex-col gap-8"
    >
      <h1 class="text-3xl">Create an account,</h1>
      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-5 items-center"
      >
        <label for="fullname" class="w-full flex flex-col gap-2">
          <span class="text-sm">Fullname</span>
          <input
            required
            :minlength="2"
            class="w-full p-2 border-2 border-accent rounded-md"
            type="text"
            name="fullname"
            id="fullname"
          />
        </label>
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
            :minlength="8"
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
          Create
        </button>
      </form>
    </div>
  </div>
</template>
