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
        <div id="part1" class="moduleTitle">part1</div>
        <div class="timeBox">
          <div class="timeBox_left">
            <div class="date">
              <div style="font-size: 20px">Oct.</div>
              <div style="font-size: 16px">2024</div>
            </div>
            <div class="caseMessage">
              <div>案例编号：D2410301</div>
              <div>
                <div>案例名称：</div>
                <div style="font-weight: 700" title="123">Babycare世界镇痛日世界镇痛日世界镇痛日世界镇痛日</div>
              </div>
            </div>
          </div>
          <div class="timeBox_right">
            <div class="brandNameBox">
              <img src="http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960" />
              品牌名称
            </div>
          </div>
        </div>
        <div id="startTime" class="countBox">
          <div class="countBox_left">
            <div class="row_1">
              <div class="row_1_tag1">
                <div>No.999</div>
                <div>品牌营销BKM案例2023年榜</div>
              </div>
            </div>
            <div class="row_2">
              <div class="row_2_tag1">
                <div style="margin-top: 30px">传播效果价值</div>
                <div style="margin-top: 5px; font-weight: 600">
                  26,351,512
                  <span style="font-style: italic">DB</span>
                </div>
              </div>
              <div class="row_2_tag2">
                <div style="margin-top: 30px">内容总条数</div>
                <div style="margin-top: 5px"><span style="font-weight: 600">26,351</span>条</div>
              </div>
              <div class="row_2_tag3">
                <div style="margin-top: 25px">内容<br />传播效度</div>
                <div style="margin-top: 5px; font-weight: 600">10.82%</div>
              </div>
            </div>
            <div class="row_3">
              <div class="row_3_tag1">
                <div class="row_3_tag1_tit">用户参与度</div>
                <div class="row_3_tag1_num">10.82%</div>
              </div>
              <div class="row_3_tag2">
                <div class="row_3_tag1_tit">全网好感度</div>
                <div class="row_3_tag1_num">10.82%</div>
              </div>
              <div class="row_3_tag3">
                <div class="row_3_tag1_tit">传播引爆度</div>
                <div class="row_3_tag1_num">10.82%</div>
              </div>
            </div>
            <div class="row_4">
              <div class="row_4_tag1">
                <div class="row_4_tag1_tit">用户参与度</div>
                <div class="row_4_tag1_num">10.82%</div>
              </div>
              <div class="row_4_tag2">
                <div class="row_4_tag1_tit">全网好感度</div>
                <div class="row_4_tag1_num">10.82%</div>
              </div>
            </div>
          </div>
          <div class="countBox_right">
            <div><span style="font-weight: 700">【起止时间】</span>2024年10月19日-10月25日</div>
            <div>
              <span style="font-weight: 700">【案例简介】</span>
              <span>
                分娩，是件美好而又神圣的事情，可在很多产妇的回忆里，生孩时的疼痛却那么“刻骨铭心”。“无痛分娩”是分娩镇痛的通俗表达。人类在研究如何降低分娩疼痛上已走过百余年的历史，发展至今，无痛分娩已是一项成熟、安全的辅助分娩医疗手段。10月20日，在第21个世界镇痛日，由中国人口福利基金会、中国慈善家杂志联合主办，浙江省妇女儿童基金会公益执行，母婴品牌Babycare提供独家公益支持的“2024世界镇痛日无痛分娩公益行动”正式启动。蒋勤勤、姜潮、麦迪娜、刘璇、王媛可、孔维6位明星特别担任本次活动的爱心公益官，他们与全国政协常委、北京协和医院麻醉学系主任黄宇光，国家卫健委科研所生殖健康技术指导中心主任、国务院特殊津贴专家邹燕，北京大学第一医院妇产生殖医学中心主任杨慧霞三位专家一起，共同呼吁全社会对生育疼痛的关注，倡导“母爱无需疼痛来证明”。『数字品牌榜』以2024年10月19日-10月25日为时间窗口对Babycare世界镇痛日Campaign进行了分析。示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字
              </span>
            </div>
          </div>
        </div>
        <div id="introduce" class="innerBox">
          <div class="nodeTag">【案例类型】</div>
        </div>
        <div id="highlights" class="innerBox"><div class="nodeTag">【案例亮点】</div></div>
      </div>
      <div class="case_con1">
        <div id="part2" class="moduleTitle">part2</div>
        <div id="spreadRhythm"><div class="nodeTag">【传播节奏】</div></div>
        <div id="medium" class="innerBox"><div class="nodeTag">【媒介策略】</div></div>
        <div id="cooperation" class="innerBox"><div class="nodeTag">【合作资源】</div></div>
        <div id="sourceMaterial" class="innerBox"><div class="nodeTag">【素材创意】</div></div>
        <div id="spreadQuality" class="innerBox"><div class="nodeTag">【传播质量】</div></div>
      </div>

      <div class="case_con1">
        <div id="part3" class="moduleTitle">part3结案点评</div>
        <div id="learnFrom"><div class="nodeTag">【借鉴】</div></div>
        <div id="challenge" class="innerBox"><div class="nodeTag">【挑战】</div></div>
        <div id="referenceLink" class="innerBox"><div class="nodeTag">【参考链接】</div></div>
      </div>
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
      { id: "startTime", name: "起止时间" },
      { id: "introduce", name: "案例介绍" },
      { id: "highlights", name: "案例亮点" }
    ]
  },
  {
    id: "part2",
    name: "part2案例执行",
    child: [
      { id: "spreadRhythm", name: "传播节奏" },
      { id: "medium", name: "媒介资源" },
      { id: "cooperation", name: "合作资源" },
      { id: "sourceMaterial", name: "素材创意" },
      { id: "spreadQuality", name: "传播质量" }
    ]
  },
  {
    id: "part3",
    name: "part3结案点评",
    child: [
      { id: "learnFrom", name: "借鉴" },
      { id: "challenge", name: "挑战" },
      { id: "referenceLink", name: "参考链接" }
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
      { idKey: "startTime" },
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
