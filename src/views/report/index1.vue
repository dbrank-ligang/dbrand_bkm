<template>
  <div>
    <ul>
      <li v-for="item in displayedData" :key="item">{{ item }}</li>
    </ul>
    <button @click="loadMore" :disabled="loadedItems >= totalItems">加载更多</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const totalItems = ref(10); // 假设总共有10条数据
const dataList = ref(Array.from({ length: 2 }, (_, i) => i + 1)); // 初始加载2条数据
const itemsToLoad = ref(2); // 每次加载2条数据
const loadedItems = ref(2); // 当前已加载的数据条数

// 计算属性，用于显示当前应该展示的数据列表
const displayedData = computed(() => {
  return dataList.value.slice(0, loadedItems.value);
});

// 加载更多数据的函数
function loadMore() {
  if (loadedItems.value < totalItems.value) {
    const newItems = Array.from({ length: itemsToLoad.value }, (_, i) => loadedItems.value + i + 1);
    dataList.value.push(...newItems);
    loadedItems.value += itemsToLoad.value;
  }
}
</script>
