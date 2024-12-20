<template>
  <div id="waterfallContainer" class="waterfall-container">
    <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="waterfall-column">
      <div v-for="item in column" :key="item.src" class="waterfall-box">
        <img :src="item.src" :alt="item.alt" class="waterfall-box-img" />
      </div>
    </div>
  </div>
</template>

<script setup name="bkmSource">
import { ref, onMounted, computed } from "vue";

const items = ref([
  { id: 1, src: "http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960" },
  { id: 2, src: "http://gips0.baidu.com/it/u=1690853528,2506870245&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024" },
  { id: 3, src: "http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280" },
  { id: 4, src: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960" },
  { id: 5, src: "http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280" },
  { id: 6, src: "http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024" },
  { id: 7, src: "http://gips3.baidu.com/it/u=100751361,1567855012&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280" },
  { id: 8, src: "http://gips0.baidu.com/it/u=1490237218,4115737545&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=720" },
  { id: 9, src: "http://gips3.baidu.com/it/u=1022347589,1106887837&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280" },
  { id: 10, src: "https://gips3.baidu.com/it/u=1039279337,1441343044&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f1024_1024" },
  // {
  //   src: "https://img.thetigerhood.com/wp-content/uploads/2024/10/2410241144-1al.jpg-compress80"
  // },
  {
    src: "https://img.thetigerhood.com/wp-content/uploads/2024/10/2410241141-w5j.jpg-compress80"
  },
  {
    src: "https://img.thetigerhood.com/wp-content/uploads/2024/10/2410241136-7g2.jpg-compress80"
  },
  {
    src: "https://img.thetigerhood.com/wp-content/uploads/2024/10/2410220732-rbx.jpg-compress80"
  },
  {
    src: "https://img.thetigerhood.com/wp-content/uploads/2024/10/2410170337-gm2.jpg-compress80"
  },
  {
    src: "https://img.thetigerhood.com/wp-content/uploads/2024/10/2410180531-qm2.jpg-compress80"
  },
  {
    src: "https://img.thetigerhood.com/wp-content/uploads/2024/10/2410180928-a1h.jpg-compress80"
  },
  {
    src: "https://img.thetigerhood.com/wp-content/uploads/2024/10/2410210850-80j.jpg-compress80"
  },
  {
    src: "https://img.thetigerhood.com/wp-content/uploads/2024/10/2410180526-lrg.webp-compress80"
  }
]);

const columnsCount = ref(4); // 列数
const columnHeights = ref(Array(columnsCount.value).fill(0)); // 每列的高度

// 根据当前列高度找到最低高度的列索引
const findShortestColumn = () => {
  let minHeight = Infinity;
  let columnIndex = 0;
  for (let i = 0; i < columnHeights.value.length; i++) {
    if (columnHeights.value[i] < minHeight) {
      minHeight = columnHeights.value[i];
      columnIndex = i;
    }
  }
  return columnIndex;
};

// 将图片分配到列中
const distributeItems = () => {
  const columns = Array.from({ length: columnsCount.value }, () => []);
  items.value.forEach(item => {
    const columnIndex = findShortestColumn();
    columns[columnIndex].push(item);
    columnHeights.value[columnIndex] += 200; // 假设每张图片的高度为200px（这里需要动态计算或设置实际高度）
  });
  return columns;
};

const columns = computed(() => distributeItems());

onMounted(() => {
  window.addEventListener("resize", () => {
    columnsCount.value = Math.floor(window.innerWidth / 200); // 假设每列宽度为200px（需要调整）
    columnHeights.value = Array(columnsCount.value).fill(0);
  });
});

// onUnmounted(() => {
//   window.removeEventListener("resize", () => {});
// });
</script>

<style scoped>
.waterfall-container {
  width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin-top: 12px;
  padding: 0;
  box-sizing: border-box;
}

.waterfall-column {
  flex: 1 0 calc(20% - 16px);
  /* 假设5列，每列宽度为20%，减去gap */
  box-sizing: border-box;
  margin-right: 20px;
}

.waterfall-box {
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 20px;
}

.waterfall-box-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 20px;
}

/* 响应式布局调整 */
@media (max-width: 1200px) {
  .waterfall-column {
    flex: 1 0 calc(23% - 16px);
    /* 4列 */
  }
}

@media (max-width: 768px) {
  .waterfall-column {
    flex: 1 0 calc(50% - 16px);
    /* 2列 */
  }
}

@media (max-width: 480px) {
  .waterfall-column {
    flex: 1 0 100%;
    /* 1列 */
  }
}
</style>
