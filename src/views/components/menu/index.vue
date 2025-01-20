<template>
  <div>
    <template v-for="item in props.menuList" :key="item.path">
      <el-sub-menu :index="item.path" v-if="item.children">
        <template #title>
          <span>{{ item.name }}</span>
        </template>
        <!-- 如果有子菜单，则递归渲染 -->
        <MenuTree :menu-list="item.children"></MenuTree>
      </el-sub-menu>
      <!--      没有子菜单-->
      <el-menu-item :index="item.path" v-if="!item.children" @click="$router.push({ path: item.path })">
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps(["menuList"]);
</script>
<style></style>
