<template>
  <div class="yearList">
    <div class="year_left">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
        <template #default="{ data }">
          <span v-if="data.num">{{ data.label }} {{ data.num }}</span>
        </template>
      </el-tree>
    </div>
    <div class="year_right"></div>
  </div>
</template>

<script setup lang="ts" name="yearList">
import { ref } from "vue";
interface Tree {
  label: string;
  children?: Tree[];
}

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

const data: Tree[] = ref([
  {
    id: "1",
    label: "互联网平台类"
  },
  {
    id: "2",
    label: "企业品牌类",
    children: [
      {
        id: "2-1",
        label: "按行业",
        children: [
          {
            id: "2-1-1",
            label: "1汽车",
            num: 32
          },
          {
            id: "2-1-2",
            label: "手机",
            num: 21
          },
          {
            id: "2-1-3",
            label: "食品饮料",
            num: 10
          }
        ]
      },
      {
        id: "2-2",
        label: "按品牌",
        children: [
          {
            id: "2-2-1",
            label: "华为",
            num: 32
          },
          {
            id: "2-2-2",
            label: "伊利",
            num: 21
          }
        ]
      },
      {
        id: "2-3",
        label: "按类型",
        children: [
          {
            id: "2-3-1",
            label: "周年庆",
            num: 32
          },
          {
            id: "2-3-2",
            label: "新品发布",
            num: 21
          }
        ]
      }
    ]
  }
]);

const defaultProps = {
  children: "children",
  label: "label"
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
