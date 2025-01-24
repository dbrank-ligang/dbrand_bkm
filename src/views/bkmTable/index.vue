<template>
  <div>
    <el-table :data="tableData" ref="tableRef" style="width: 100%">
      <!-- 列定义 -->
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="name"></el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from "vue";
import { ElTable } from "element-plus";

const tableRef = ref(null);
const tableData = ref([
  // ... 其他数据 ...
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },
  { id: 1, name: "Alice", age: 25 },

  // ... 更多数据 ...
  { id: 10, name: "Target", age: 30 }
  // ... 还有其他数据 ...
]);

onMounted(() => {
  // 假设您想要滚动至第三行
  const rowIndex = 26;
  nextTick(() => {
    tableRef.value.bodyWrapper.scrollTo(0, rowIndex * tableRef.value.rowHeight);
  });
});
</script>
