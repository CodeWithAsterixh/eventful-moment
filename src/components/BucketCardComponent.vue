<script setup></script>

<template>
  <div class="w-full text-black shadow-[0px_3px_6px]  shadow-[#00000029] p-4 hover:!bg-others duration-300 rounded-xs cursor-pointer">
    <!-- greetings -->
    <div class="w-full flex flex-col gap-3">
      <h4 class="text-sm !font-semibold">
        Lorem ipsum began as scrambled, nonsensical Latin derived from Cicero’s
        1st-century BC text De Finibus Bonorum et Malorum.
      </h4>
      <p class="text-sm">
        Until recently, the prevailing view assumed lorem ipsum was born as a
        nonsense text. “It’s not Latin, though it looks like it, and it actually
        says nothing,” Before & After magazine answered a curious reader, “Its
        ‘words’ loosely approximate the frequency with which letters occur in
        English, which is why at a glance it looks pretty real. Until recently,
        the prevailing view assumed lorem ipsum was born as a nonsense text.
        “It’s not Latin, though it looks like it, and it actually says nothing,”
        Before & After magazine answered a curious reader, “Its ‘words’ loosely
        approximate the frequency with which letters occur in English, which is
        why at a glance it looks pretty real.
      </p>
      <div class="w-full text-sm flex items-center justify-between flex-wrap py-2">
        <RouterLink to="/moments/item" class="text-tertiary">View Details</RouterLink>
        <div class="flex gap-4 items-center *:!not-italic">
            <i class="text-accent">20/05/2021</i>
            <i>20/05/2025</i>
        </div>
      </div>
    </div>
  </div>
</template>
