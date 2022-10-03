<script lang="ts">
import { computed, defineComponent } from "vue";
import VList from "@/components/VList/VList.vue";
import { fetchComments } from "@/utils/fetchData";
import type { Comment } from "@/utils/fetchData";
import VSearchBar from "./components/VSearchBar/VSearchBar.vue";
import { useDebounceFn } from "@vueuse/core";

interface Data {
  comments: Comment[];
  searchFilter: string;
  debouncedSearch: string;
}

export default defineComponent({
  name: "v-app",
  components: { VList, VSearchBar },
  data(): Data {
    return {
      comments: [],
      searchFilter: "",
      debouncedSearch: "",
    };
  },
  provide() {
    return {
      searchRules: computed(() => ({
        searchRule: this.debouncedSearch,
        keywords: this.debouncedSearch.split(/(?:,| )+/),
      })),
    };
  },
  computed: {
    filteredComments() {
      const { searchFilter } = this;
      if (!searchFilter) return this.comments;

      const searchKeywords = searchFilter.split(/(?:,| )+/);
      return this.comments.filter((comment) => {
        let isMatched = false;
        for (const prop in comment) {
          for (const keyword of searchKeywords) {
            if (comment[prop].toString().includes(keyword)) {
              isMatched = true;
              break;
            }
          }
        }
        return isMatched;
      });
    },
  },
  created() {
    this.$options._static.debounced = useDebounceFn((val: string) => {
      this.debouncedSearch = val;
    }, 500);

    fetchComments().then((data) => (this.comments = data));
  },
  watch: {
    searchFilter(val) {
      const { debounced } = this.$options._static;
      debounced && debounced(val);
    },
  },
  _static: { debounced: null as null | typeof useDebounceFn },
});
</script>

<template>
  <div class="row">
    <div class="col-12">
      <v-search-bar v-model:searchFilter="searchFilter"></v-search-bar>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <v-list :comments="filteredComments" />
    </div>
  </div>
</template>

<style>
mark {
  background-color: #2b2a2a;
  transition: background-color 1s linear;
  color: #fff;
}
</style>
