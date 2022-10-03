<script lang="ts">
import { defineComponent, type PropType } from "vue";
import VListItem from "@/components/VListItem/VListItem.vue";
import type { Comment } from "@/utils/fetchData";

export default defineComponent({
  name: "v-list",
  components: { VListItem },
  props: {
    comments: {
      required: true,
      type: Array as PropType<Comment[]>,
    },
  },
});
</script>

<template>
  <div class="row">
    <v-list-item
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>
