<template>
  <div class="aboutBKM">
    <div class="aboutBKM_billboard">
      <div class="tab_list">
        <ul>
          <li
            v-for="(item, index) in tabItems"
            :key="index"
            :class="{ highlighted: index === activeIndex }"
            @click="handleBillboard(index, item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="timeBox">
        <div @click="toPrevWeek">{{ prevWeek }}</div>
        <div>{{ currentWeek }}</div>
        <div @click="toNextWeek">{{ nextWeek }}</div>
      </div>
      <swiper
        @swiper="onSwiper"
        :initial-slide="1"
        :slides-per-view="3"
        :centered-slides="true"
        :navigation="true"
        :space-between="20"
        :modules="[Navigation]"
        class="mySwiper"
        @active-index-change="onSwiperChange($event.activeIndex)"
      >
        <swiper-slide v-for="(item, index) in carouseData" :key="item.id" :id="item.id" :ref="setItemRef(item.id)">
          <div
            class="caseBox"
            v-for="cardItem in item.msg"
            :key="cardItem.num"
            @click.stop="index === currentSwiperIndex && handleCase(cardItem)"
            :style="{ cursor: index === currentSwiperIndex ? 'pointer' : 'default' }"
          >
            <div class="caseBox_col">
              <div>案例编号：</div>
              <div>{{ cardItem.num }}</div>
              <div class="caseBox_col_rank">{{ cardItem?.rank }}</div>
            </div>
            <div class="caseBox_col caseBox_col_name">
              <div class="caseBox_col_label">案例名称：</div>
              <div :title="cardItem.name">{{ cardItem.name }}</div>
            </div>
            <div class="caseBox_col">
              <div>数字品牌价值：</div>
              <div>{{ cardItem.DB }}</div>
            </div>
            <div class="caseBox_col caseBox_col_type">
              <div>[案例类型]</div>
              <div :title="cardItem.type.toString()">
                <span v-for="typeItem in cardItem.type" :key="typeItem">{{ typeItem }}</span>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="articleBox">{{ reviewArticle }}</div>
    </div>
    <div class="paddingBox">
      <div class="searchBox">
        <div style="width: 80%">
          <div class="searchTip">按品牌/按行业/按类型/按年份</div>
          <div class="searchInputBox">
            <el-autocomplete
              v-model="inputValue"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              clearable
              style="width: 863px; height: 42px"
              placeholder=""
              @select="handleSelect"
              @keyup.enter="handleSearch"
              value-key="showText"
            >
              <!-- <template #append><div @click="handleSearch" style="cursor: pointer">搜索</div></template> -->
            </el-autocomplete>
            <el-button @click="handleSearch" class="buttonStyle">搜索</el-button>
          </div>

          <div class="hosieryBox">
            <div class="listTit">搜索历史</div>
            <div class="listCon">
              <div v-for="item in historyListData" :key="item.mediaId" @click="historyChange(item)">
                <span>{{ item.showText }}</span>
              </div>
            </div>
          </div>
          <div class="hosieryBox">
            <div class="listTit">搜索推荐</div>
            <div class="listCon">
              <div v-for="item in tagListData" :key="item.mediaId" @click="historyChange(item)">
                <span>{{ item.mediaName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hotReportBox">
        <div class="hotReportTit">热门报告 <span @click="handleReport">更多案例报告>></span></div>
        <div class="hotReportCon">
          <div v-for="item in caseListData" :key="item">
            <img :src="item.imgUrl" />
            <div class="caseTit">{{ item.title1 }}</div>
            <div class="caseTit">{{ item.title2 }}</div>
            <div class="rankListBox">
              <ul>
                <li><span>排名</span><span>案例名称</span></li>
              </ul>
              <ul style="margin-top: 6px">
                <li v-for="(rankItem, rankIndex) in item.rankList" :key="rankItem">
                  <span>{{ rankIndex + 1 }}</span>
                  <span>{{ rankItem }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="hotReportBox_tip">
          案例版权声明：「BKM品牌传播案例库」所收录的案例均由『数字品牌榜』撰写，任何未经授权的转载、复制、翻印或建立网络镜像的行为均有违著作权相关的法律法规；本案例所使用的统计理论、技术、算法和内容版权归北京数榜信息科技有限公司所有，并可授权第三方在所允许范围内传播和引用，任何引用均须注明来源于“数字品牌榜”。“数榜”“数字品牌榜”名称及图形商标权利归北京数榜信息科技有限公司所有。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
// Import Swiper Vue.js components
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import router from "@/routers";
import { YEARLIST } from "@/config";
import { CASEDETAIL } from "@/config";
import { ElNotification } from "element-plus";

const tabItems = ref(["周榜", "月榜", "年榜"]);
const activeIndex = ref(0);
const currentWeek = ref("");
const prevWeek = ref("");
const nextWeek = ref("");
const currentSwiperIndex = ref(); // 当前轮播卡片的index
const reviewArticle = ref(""); //点评文章名
const carouseData = ref([
  {
    id: 1,
    time: "2024年08月01日-2024年08月07日",
    article: "文章文章文章文章1",
    msg: [
      {
        rank: "No.1",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: [
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销",
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销",
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销"
        ],
        url: ""
      },
      {
        rank: "No.2",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.3",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.4",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.5",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
        url: ""
      }
      // {
      //   time: "2024年08月11日-2024年08月17日",
      //   num: "D2410301",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410302",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410303",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410304",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410305",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // }
    ]
  },
  {
    id: 2,
    time: "2024年08月08日-2024年08月14日",
    article: "文章文章文章文章2",
    msg: [
      {
        rank: "No.1",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
        DB: "1,123,345,456DB",
        type: [
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销",
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销",
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销"
        ],
        url: ""
      },
      {
        rank: "No.2",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.3",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.4",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.5",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
        url: ""
      }
      // {
      //   time: "2024年08月11日-2024年08月17日",
      //   num: "D2410301",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410302",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410303",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410304",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410305",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // }
    ]
  },
  {
    id: 3,
    time: "2024年08月15日-2024年08月21日",
    article: "文章文章文章文章3",
    msg: [
      {
        rank: "No.1",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
        DB: "1,123,345,456DB",
        type: [
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销",
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销",
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销"
        ],
        url: ""
      },
      {
        rank: "No.2",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.3",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.4",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.5",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
        url: ""
      }
      // {
      //   time: "2024年08月11日-2024年08月17日",
      //   num: "D2410301",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410302",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410303",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410304",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410305",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // }
    ]
  },
  {
    id: 4,
    time: "2024年08月22日-2024年08月29日",
    article: "文章文章文章文章4",
    msg: [
      {
        rank: "No.1",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: [
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销",
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销",
          "#案例类型",
          "#内容营销",
          "#ESG传播",
          "#TVC营销"
        ],
        url: ""
      },
      {
        rank: "No.2",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.3",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.4",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"]
      },
      {
        rank: "No.5",
        num: "D2410301",
        name: "Babycare世界镇痛日CampaignBabycare",
        DB: "1,123,345,456DB",
        type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
        url: ""
      }
      // {
      //   time: "2024年08月11日-2024年08月17日",
      //   num: "D2410301",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410302",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410303",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410304",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // },
      // {
      //   num: "D2410305",
      //   name: "Babycare世界镇痛日CampaignBabycare世界镇痛日Campaign",
      //   DB: "1,123,345,456DB",
      //   type: ["#案例类型", "#内容营销", "#ESG传播", "#TVC营销"],
      //   url: ""
      // }
    ]
  }
]);

const swiperRef = ref(null) as any;
const inputValue = ref("");
const searchData = ref([] as any);
const historyListData = ref([]) as any; // 搜索历史
const tagListData = ref([]) as any; // 搜索标签
const caseListData = ref([
  {
    imgUrl: "https://img.js.design/assets/img/673306d218cdbc3a459c3269.jpg#6988e2e6f70b1a2ea2ce507a9e95b3c3)",
    title1: "寻求“专业+生动”的最优解",
    title2: "[BKM案例之B2B企业营销方法论]专题研究报告",
    reportUrl: "",
    rankList: [
      "2023华为开发者大会Campaign",
      "2022华为开发者大会Campaign",
      "2022百度世界大会Campaign",
      "2022华为全联接大会Campaign",
      "腾讯全球数字生态大会Campaign",
      "阿里云助力冬奥会Campaign",
      "2022华为828 B2B企业节Campaign",
      "钉钉七周年Campaign",
      "2023京东全球科技探索者大会Campaign",
      "百度数字人「钱学森」campaign"
    ]
  },
  {
    imgUrl: "https://img.js.design/assets/img/673307241cbcd798ff429210.jpg#0273bd30caf144bfb81d36ede330d64f",
    title1: "联名圈太卷，如何1+1>2",
    title2: "BKM案例之品牌联名营销专项研究报告",
    reportUrl: "",
    rankList: [
      "2023华为开发者大会Campaign",
      "2022华为开发者大会Campaign",
      "2022百度世界大会Campaign",
      "2022华为全联接大会Campaign",
      "腾讯全球数字生态大会Campaign",
      "阿里云助力冬奥会Campaign",
      "2022华为828 B2B企业节Campaign",
      "钉钉七周年Campaign",
      "2023京东全球科技探索者大会Campaign",
      "百度数字人「钱学森」campaign"
    ]
  },
  {
    imgUrl: "https://img.js.design/assets/img/6733073fea18823f7375139f.jpg#5ada8917d6496cfffb154bf48afc90bc",
    title1: "『这些预算没有浪费』",
    title2: "2023年品牌营销BKM案例全景报告",
    reportUrl: "",
    rankList: [
      "2023华为开发者大会Campaign",
      "2022华为开发者大会Campaign",
      "2022百度世界大会Campaign",
      "2022华为全联接大会Campaign",
      "腾讯全球数字生态大会Campaign",
      "阿里云助力冬奥会Campaign",
      "2022华为828 B2B企业节Campaign",
      "钉钉七周年Campaign",
      "2023京东全球科技探索者大会Campaign",
      "百度数字人「钱学森」campaign"
    ]
  }
]);
// 周、月、年 榜切换
const handleBillboard = (index, item) => {
  //index:0 周榜； index：1 月榜；
  console.log(item);
  if (index !== 2) {
    activeIndex.value = index;
  } else {
    // 跳转到年榜
    let routerUrl = router.resolve({
      path: YEARLIST
    });
    window.open(routerUrl.href, "_blank");
  }
};
const onSwiper = swiper => {
  swiperRef.value = swiper;
};
const setItemRef = id => {
  return `item${id}`;
};

// 向左
const toNextWeek = index => {
  console.log(index);
  swiperRef.value.slideNext();
};
// 向右
const toPrevWeek = index => {
  console.log(index);
  swiperRef.value.slidePrev();
};
//
const onSwiperChange = index => {
  console.log(carouseData.value[index]);
  currentSwiperIndex.value = index; // 当前Swiper的Index
  currentWeek.value = carouseData.value[index].time;
  prevWeek.value = index > 0 ? carouseData.value[index - 1].time : "";
  nextWeek.value = index + 1 === carouseData.value.length ? "" : carouseData.value[index + 1].time;
  reviewArticle.value = carouseData.value[index].article;
  console.log(carouseData.value[index].article);
};
// 点击周、月榜里的每一个小卡片
const handleCase = item => {
  console.log(item);
  // 跳转到详情
  let routerUrl = router.resolve({
    path: CASEDETAIL
  });
  window.open(routerUrl.href, "_blank");
};

const handleReport = () => {
  let routerUrl = router.resolve({
    path: "/report/index"
  });
  window.open(routerUrl.href, "_blank");
};

// --------------------搜索逻辑----------------------------

const querySearch = async (queryString: string, cb: any) => {
  console.log(querySearch, cb);
  // const { data } = await searchMediaApi({ keyword: queryString });
  //   searchData.value = data;
  //   cb(data);
};
// 选中后跳转
const handleSelect = (item: Record<string, any>) => {
  console.log(item);
};
// 若有检索数据，则直接跳转对应第一个媒体;
const handleSearch = () => {
  console.log("搜索数据的长度", searchData.value);
  if (searchData.value.length > 0) {
    // getMediaNavApi(searchData.value[0]); //跳转详情页
  } else {
    // 保存未搜索到的媒体
    // 4.跳转到首页
    ElNotification({
      // title: "提示",
      message: "抱歉，您输入的媒体/账号名称不准确或未被收录",
      type: "warning",
      duration: 9000,
      offset: 80
    });
  }
};

// 点击搜索历史
const historyChange = item => {
  console.log(item);
};
onMounted(() => {
  onSwiperChange(1);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
