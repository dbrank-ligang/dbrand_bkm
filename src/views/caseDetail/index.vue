<template>
  <div class="caseDetailBox">
    <div class="case_menu">
      <div v-for="item in menuArr" :key="item.name">
        <div class="oneLevel menu" @click="selectItem(item.id)">{{ item.name }}</div>
        <div
          class="twoLevel menu"
          :style="{ backgroundColor: selectedItem === childItem.id ? '#ffdd00' : '' }"
          v-for="childItem in item.child"
          :key="childItem.name"
          @click="selectItem(childItem.id)"
        >
          {{ childItem.name }}
        </div>
      </div>
    </div>
    <div class="case_con" ref="scrollContainer">
      <div class="case_con1">
        <div id="part1" class="chapterBox">part1</div>
        <div id="time" class="box1">起止时间</div>
      </div>
      <div id="introduce" class="box2">案例介绍</div>
      <div id="highlights" class="box2">案例亮点</div>
      <div id="part2">part2</div>
      <div id="spreadRhythm" class="box1">传播节奏</div>
      <div id="medium" class="box2">媒介策略</div>
      <div id="cooperation" class="box2">合作资源</div>
    </div>
  </div>
</template>

<script setup name="caseDetail">
import { ref, onMounted, onUnmounted } from "vue";
const selectedItem = ref();
const scrollContainer = ref(null);
// const htmlStr = ref(
//   '○ 6月28日，霸王茶姬在全国门店上线「营养选择」健康标识；官宣7位健康冠军大使和4位健康助力官；<br/>○ 7月2日，茶友社区「CHAGEE CLUB」上线；○ 7月3日，新浪微博发起话题#谁懂这个健康大使团的含金量#；<br/>○ 7月5日，发布健康大使刘翔故事片；健康助力官张彬彬、张新成、徐海乔分别在长沙、北京、深圳参加“一起运动会”活动；<br/>○ 7月6日，健康助力官陈星旭在上海参加“一起运动会”活动；○ 7月8日，发布健康大使汪顺故事片；○ 7月11日，发布健康大使郑钦文故事片；<img class="rich_pages wxw-img" data-backh="299" data-backw="532" data-cropselx1="0" data-cropselx2="532" data-cropsely1="0" data-cropsely2="299" data-imgfileid="100033605" data-ratio="0.562962962962963" data-s="300,640" src="https://mmbiz.qpic.cn/mmbiz_jpg/sxgP7jgemWoCSJb1rox8hWaHUmAPzibp1wL9PibCbwdf6PIvueDSKicWGuuqVibuqUPhs5z8A9UDCC5CPJlxUhJNBg/640?wx_fmt=jpeg&amp;from=appmsg" data-type="png" data-w="1080" style="vertical-align: middle;width: 100%;height: auto;">来源：『数字品牌榜』监测研究'
// );
const menuArr = ref([
  {
    id: "part1",
    name: "part1项目信息",
    child: [
      { id: "time", name: "起止时间" },
      { id: "introduce", name: "案例介绍" },
      { id: "highlights", name: "案例亮点" }
    ]
  },
  {
    id: "part2",
    name: "part2案例执行",
    child: [
      { id: "spreadRhythm", name: "传播节奏" },
      { id: "medium", name: "媒介策略" },
      { id: "cooperation", name: "合作资源" },
      { id: "sourceMaterial", name: "素材创意" },
      { id: "spreadQuality", name: "传播质量" }
    ]
  },
  {
    id: "part3",
    name: "part3结案点评",
    child: [
      { id: "time", name: "借鉴" },
      { id: "highlights", name: "挑战" },
      { id: "introduce", name: "参考链接" }
    ]
  }
]);

const selectItem = id => {
  console.log(id);
  selectedItem.value = id;
  if (selectedItem.value == "part1") {
    scrollContainer.value.scrollTo({
      // top: 0,
      // left: 0,
      behavior: "smooth"
    });
  }
  document.getElementById(`${id}`)?.scrollIntoView({
    behavior: "smooth"
  });
};
onMounted(async () => {
  scrollChangeTab();
});
const scrollChangeTab = () => {
  window.addEventListener("scroll", () => {
    // 内容id集合
    const contentItems = [
      { idKey: "part1" },
      { idKey: "time" },
      { idKey: "highlights" },
      { idKey: "introduce" },
      { idKey: "part2" },
      { idKey: "spreadRhythm" },
      { idKey: "medium" },
      { idKey: "cooperation" }
    ];
    for (const contentItem of contentItems) {
      const element = document.getElementById(contentItem.idKey);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0) {
          currentTab.value = contentItem.idKey;
          break;
        }
      }
    }
  });
};

// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener("scroll", () => {
    console.log("scroll");
  });
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
