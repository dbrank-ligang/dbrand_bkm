<!-- 横向布局 -->
<template>
  <el-container class="layout">
    <el-header style="border-bottom: 1px solid #eee">
      <div class="header-lf mask-image">
        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/images/navLogo.png" alt="logo" />
        </div>
      </div>

      <div class="header-ri">
        <el-menu :router="false" :default-active="activeMenu" :unique-opened="accordion" :collapse-transition="false">
          <SubMenu :menu-list="menuList" />
        </el-menu>
        <div style="margin-left: 30px">{{ userInfo.name }}</div>
        <div style="margin-left: 30px" @click="logout">
          <a style="color: #000; text-decoration: none; cursor: pointer">退出登录</a>
        </div>
        <div style="margin-left: 30px">
          <a target="_blank" style="color: #000; text-decoration: none; cursor: pointer" href="https://dbrank.net">数榜首页</a>
        </div>
      </div>
    </el-header>

    <Main />
  </el-container>
</template>

<script setup lang="ts" name="layoutTransverse">
import { computed } from "vue";
import { useAuthStore } from "@/stores/modules/auth";
import { useRoute } from "vue-router";
import Main from "@/layouts/components/Main/index.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";
import { useUserStore } from "@/stores/modules/user";
import { deleteCookie } from "@/utils";
import { useGlobalStore } from "@/stores/modules/global";

// const title = import.meta.env.VITE_GLOB_APP_TITLE;
const globalStore = useGlobalStore();
const accordion = computed(() => globalStore.accordion);
const userStore = useUserStore();
const userInfo: any = computed(() => userStore.userInfo);
const route = useRoute();
// const router = useRouter();
const authStore = useAuthStore();
const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);

const logout = () => {
  // 2.清除 Token
  userStore.setUserInfo("");
  // 清除localStorage
  window.localStorage.clear();
  window.localStorage.setItem("isLogin", false);
  deleteCookie("token");
  window.location.href = "https://dbrank.net";
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
