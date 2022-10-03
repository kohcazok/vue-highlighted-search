<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Comment } from "@/utils/fetchData";

export default defineComponent({
  name: "v-content-editable-wrapper",
  props: {
    comment: {
      required: true,
      type: Object as PropType<Comment>,
    },
  },
  computed: {
    formattedComment() {
      return Object.entries(this.comment).map(([key, val]) => `${key}: ${val}`);
    },
    matchedCount() {
      return (JSON.stringify(this.comment).match(/<\/mark>/g) || []).length;
    },
  },
});
</script>

<template>
  <div class="p-2">
    <div class="card text-bg-secondary mb-3">
      <div class="card-header">Mathced found: {{ matchedCount }}</div>
      <div class="card-body">
        <h5 class="card-title" v-html="comment.email"></h5>
        <p
          class="card-text"
          v-for="(value, prop) in formattedComment"
          :key="prop"
          v-html="value"
        ></p>
      </div>
    </div>
  </div>
</template>
