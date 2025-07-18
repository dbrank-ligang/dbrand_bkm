import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";
import { getAuthButtonListApi, getAuthMenuListApi } from "@/api/modules/login";
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from "@/utils";
// import { useCurrBrandStore } from "@/stores/modules/currBrand";
import { useUserStore } from "@/stores/modules/user";

export const useAuthStore = defineStore({
  id: "geeker-auth",
  state: (): AuthState => ({
    // 按钮权限列表
    authButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: ""
  }),
  getters: {
    // 按钮权限列表
    authButtonListGet: state => state.authButtonList,
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: state => state.authMenuList,
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
    // 递归处理后的所有面包屑导航列表
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    // Get AuthButtonList
    async getAuthButtonList() {
      const { data } = await getAuthButtonListApi();
      this.authButtonList = data;
    },
    // Get AuthMenuList 获取菜单
    async getAuthMenuList() {
      // const currBrandStore = useCurrBrandStore();
      const userStore = useUserStore();

      const { data } = await getAuthMenuListApi();
      if (!userStore.userInfo.memberShip) {
        // 非会员 导航只有首页可以点
        data.map(item => {
          if (item.name !== "home") {
            // item.meta.isDisabled = true;
          }
        });
      } else {
        // data.map(item => {
        //   // 品牌对比，如果没有竞品，品牌对比菜单设置成isDisable不可点击
        //   if (item.name == "brandRatio") {
        //     if (!currBrandStore.currBrandObj.competitor || currBrandStore.currBrandObj.competitor.length < 1) {
        //       item.meta.isDisabled = true;
        //     }
        //   }
        // });
      }
      this.authMenuList = data;
    },
    // Set RouteName
    async setRouteName(name: string) {
      this.routeName = name;
    }
  }
});
