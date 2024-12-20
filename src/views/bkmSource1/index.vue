<template>
  <!-- <div class="bkmSourceBox"> -->
  <!-- <div class="cos_flex_1">
      <div v-for="(item, index) in imgArr" :key="item" class="img_box">
        <img :src="imgArr[index + 5]" />
      </div>
    </div>
    <div class="cos_flex_1"></div>
    <div class="cos_flex_1"></div>
    <div class="cos_flex_1"></div> -->

  <!-- <div v-for="(item, index) in imgArr" :key="item" class="img_box" :style="{ left: calculateLeft(index) + 'px' }">
      <img :src="item" />
    </div> -->
  <div class="waterfall-container">
    <div v-for="item in items" :key="item.id" :style="{ top: item.top + 'px', left: item.left + 'px' }" class="waterfall-item">
      <img :src="item.src" alt="item" />
    </div>
  </div>
  <!--</div> -->
</template>

<script setup lang="ts" name="bkmSource">
import { ref, onMounted, Ref } from "vue";

// const items = ref([
//   "http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
//   "http://gips0.baidu.com/it/u=1690853528,2506870245&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024",
//   "http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
//   "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
//   "http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
//   "http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024",
//   "http://gips3.baidu.com/it/u=100751361,1567855012&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
//   "http://gips0.baidu.com/it/u=1490237218,4115737545&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=720",
//   "http://gips3.baidu.com/it/u=1022347589,1106887837&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
//   "https://gips3.baidu.com/it/u=1039279337,1441343044&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f1024_1024"
// ]);

// 重新定义item类型
interface Item {
  id: number;
  src: string;
  top?: number; // 使用可选属性，因为初始化时不需要
  left?: number;
}

const columnCount = 4;
const itemWidth = 291;
const gutter = ref(10);
const columnHeights = ref(Array(columnCount).fill(0));

const items: Ref<Item[]> = ref([
  { id: 1, src: "http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960" },
  { id: 2, src: "http://gips0.baidu.com/it/u=1690853528,2506870245&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024" },
  { id: 3, src: "http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280" },
  { id: 4, src: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960" },
  { id: 5, src: "http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280" },
  { id: 6, src: "http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024" },
  { id: 7, src: "http://gips3.baidu.com/it/u=100751361,1567855012&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280" },
  { id: 8, src: "http://gips0.baidu.com/it/u=1490237218,4115737545&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=720" },
  { id: 9, src: "http://gips3.baidu.com/it/u=1022347589,1106887837&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280" },
  { id: 10, src: "https://gips3.baidu.com/it/u=1039279337,1441343044&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f1024_1024" }
  // 依次添加所有图片的路径和对应的ID
]);

const layoutItems = () => {
  items.value.forEach(item => {
    const minHeightColumn = Math.min(...columnHeights.value);
    const minHeightColumnIndex = columnHeights.value.indexOf(minHeightColumn);
    item.top = minHeightColumn;
    item.left = minHeightColumnIndex * (itemWidth + gutter.value);
    columnHeights.value[minHeightColumnIndex] += itemWidth + gutter.value;
  });
};
onMounted(() => {
  layoutItems();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
