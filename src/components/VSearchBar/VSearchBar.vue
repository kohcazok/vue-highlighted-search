<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "v-search-bar",
  emits: ["update:searchFilter"],
  props: {
    searchFilter: { type: String, default: "" },
  },
  computed: {
    search: {
      get(): string {
        return this.searchFilter;
      },
      set(value: string) {
        if (value) this.lastSearchRule = value;
        this.$emit("update:searchFilter", value);
      },
    },
    inputPlaceholder(): string {
      const placeholderMsg = "Last search is:";
      return this.lastSearchRule
        ? `${placeholderMsg} ${this.lastSearchRule}`
        : "Search by text";
    },
  },
  data() {
    return {
      lastSearchRule: "",
    };
  },
});
</script>

<template>
  <div class="py-3">
    <div class="input-group">
      <input
        type="text"
        class="form-control search-bar"
        :placeholder="inputPlaceholder"
        v-model.trim="search"
      />
      <button
        @click="search = lastSearchRule = ''"
        class="btn btn-danger"
        title="delete"
      >
        &times;
      </button>
    </div>
    <div class="col justify-content-end d-flex">
      <span
        v-if="lastSearchRule && !searchFilter"
        @click="search = lastSearchRule"
        style="cursor: pointer"
        class="badge rounded-pill text-bg-primary my-1"
      >
        Apply last rule
      </span>
    </div>
  </div>
</template>

<style>
input.search-bar::placeholder {
  text-align: right;
}
</style>
