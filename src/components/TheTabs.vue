<script setup lang="ts">
const tabs = [
  {
    id: 1,
    name: "GIFs",
    active: true,
  },
  {
    id: 1,
    name: "Stickers",
    active: false,
  },
];
</script>
<template>
  <div class="tabs">
    <!-- TODO transition -->
    <div v-for="tab in tabs" :key="id" class="tab">
      <p class="tab__name" :class="{ tab__name_active: tab.active }">
        {{ tab.name }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.tab {
  cursor: pointer;
  display: inline-block;
  line-height: 38px;
  position: relative;
  text-align: center;
  vertical-align: top;
  width: 103px;
  height: 38px;
  transition: color 0.2s ease-in-out 0.2s;
  color: rgb(255, 255, 255);
}
.tab__name {
  font-size: 17px;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
}

.tab__name_active {
  background: linear-gradient(
    -135deg,
    rgb(74, 144, 226) 0%,
    rgb(148, 56, 255) 100%
  );
  border-radius: 22px;
}
</style>
