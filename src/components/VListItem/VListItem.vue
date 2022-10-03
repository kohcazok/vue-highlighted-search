<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Comment } from "@/utils/fetchData";
import VContentEditableWrapper from "@/components/VListItem/VContentEditableWrapper.vue";

interface searchRuleProvider {
  searchRule: string;
  keywords: string[];
}

export default defineComponent({
  name: "v-list-item",
  components: { VContentEditableWrapper },
  props: {
    comment: {
      required: true,
      type: Object as PropType<Comment>,
    },
  },
  data(): { searchRules?: searchRuleProvider } {
    return {};
  },
  computed: {
    formattedComment() {
      const { searchRule, keywords } = this.searchRules!;
      if (!searchRule) return this.comment;

      const copy = { ...this.comment };
      for (const prop in copy) {
        const val = copy[prop].toString();
        for (const keyword of keywords) {
          if (val.includes(keyword)) {
            copy[prop] = val.replaceAll(keyword, `<mark>${keyword}</mark>`);
          }
        }
      }
      return copy;
    },
  },
  inject: ["searchRules"],
});
</script>

<template>
  <div class="col m-2" style="background-color: rgba(84, 84, 84, 0.65)">
    <v-content-editable-wrapper
      :comment="formattedComment"
    ></v-content-editable-wrapper>
  </div>
</template>
