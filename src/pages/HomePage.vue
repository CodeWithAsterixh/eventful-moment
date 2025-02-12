<script setup>
import BucketCardComponent from "@/components/BucketCardComponent.vue";
import useAuth from "@/lib/feats/authSlice";

const { $state } = useAuth();
</script>

<template>
 <div class="w-full flex flex-col items-center gap-20">
    <div class="w-full text-black flex items-center justify-between">
    <!-- greetings -->
    <div class="w-full">
      <h2 class="text-2xl">Welcome {{ $state.user.username }},</h2>
      <p>Here are items in your eventful moment bucket.</p>
    </div>
    <button
      class="px-10 py-3 rounded-xl shrink-0 text-white bg-tertiary border-accent border-[1px]"
    >
      Add item
    </button>
  </div>
  <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
    <BucketCardComponent v-for="i in Array.from({ length: 4 })" :key="i" />
  </div>
  <button
    class="px-10 py-3 rounded-xl shrink-0 text-white bg-tertiary border-accent border-[1px]"
  >
  Load More
  </button>
 </div>
</template>
