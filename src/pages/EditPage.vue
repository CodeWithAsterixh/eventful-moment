
<script setup>

</script>

<template>
    <div
    class="w-full min-h-[calc(100vh-10rem)] flex items-center"
  >
    <div
      class="w-full text-black p-2 max-w-md flex flex-col gap-3"
    >
      <form
        class="flex flex-col gap-5 items-center"
      >
        <label for="futureDate" class="w-full flex flex-col gap-2">
          <span class="text-sm">Date in the future</span>
          <input
            required
            class="w-full p-2 border-2 border-accent rounded-md"
            type="text"
            name="futureDate"
            id="futureDate"
          />
        </label>
        <label for="title" class="w-full flex flex-col gap-2">
          <span class="text-sm">Title</span>
          <input
            required
            class="w-full p-2 border-2 border-accent rounded-md"
            type="text"
            name="title"
            id="title"
          />
        </label>
        <label for="description" class="w-full flex flex-col gap-2">
          <span class="text-sm">Description</span>
          <textarea
            required
            class="w-full min-h-56 max-h-56 p-2 border-2 resize-none border-accent rounded-md"
            name="description"
            id="description"
          ></textarea>
        </label>
        
        <button
          type="submit"
          class="min-w-48 py-3 rounded-xl text-white px-2 bg-tertiary border-accent border-[1px]"
        >
          Update
        </button>
      </form>
    </div>
  </div>
</template>
