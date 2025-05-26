<template>
  <div class="reportBox">
    <div class="mediaAndReportWrapper">
      <div class="dbTit">
        <h3 class="h3Tit">研究报告</h3>
        <span class="h3EnTit">DBRank Research</span>
      </div>
      <div class="list">
        <a class="listItem" :href="item.article_url" target="_blank" v-for="item in reportList.stickReportList" :key="item.id">
          <div class="listItemLeft">
            <div class="title">{{ item.headline }}</div>
            <p class="description">{{ item.digest }}</p>
            <p class="date">发表时间: {{ item.release_date }}</p>
          </div>
          <!-- <div class="listItemRight" v-if="item.brand_name !== null"> -->
          <div class="listItemRight">
            <div class="iconWrapper">
              <img :src="item.picture_url" />
            </div>
            <p class="iconTitle" :title="`关联品牌：${item.brand_name}`">关联品牌：{{ item.brand_name }}</p>
          </div>
        </a>
      </div>
      <div class="nextPage" v-if="showLoadMore" @click="nextPageReport">加载更多</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="bkmSearch">
import { ref, onMounted } from "vue";

const pageNum = ref(1); // 当前页码
// const pageAllCount = ref(0); // 总页数
const showLoadMore = ref(true); // 加载更多按钮是否显示

const reportList = ref({
  count: 5,
  stickReportList: [
    {
      picture_url: "https://dbrank.net/digitalAssets/resources/img/LOGO/363.png",
      release_date: "2024-06-14",
      digest: "给老年人稳稳的幸福",
      stick: null,
      brand_name: "阿里巴巴",
      id: 300,
      check: null,
      article_url: "http://mp.weixin.qq.com/s?__biz=MzI0MjY0OTE0MQ==&mid=2247515166&idx=1&sn=17e2b832fc9bfcc1e5ba7aa0ae77b2c9",
      headline: "拥抱无障碍未来 | 2023年度适老化品牌心智榜&适老化公众认知研究报告今日发布"
    },
    {
      picture_url: "https://dbrank.net/digitalAssets/resources/img/LOGO/70.png",
      release_date: "2024-05-30",
      digest: "品牌方的动作通常都是“既要又要还要”，这没毛病，关键是……",
      stick: null,
      brand_name: "蒙牛",
      id: 120,
      check: null,
      article_url: "http://mp.weixin.qq.com/s?__biz=MzI0MjY0OTE0MQ==&mid=2247514720&idx=1&sn=c2f81b13c8c22914e12d057ad651501f",
      headline: "让品牌成为连接用户与赛场的媒介 |「国际赛事营销」案例研究报告发布"
    },
    {
      picture_url: "https://dbrank.net/digitalAssets/resources/img/LOGO/2871.png",
      release_date: "2024-05-11",
      digest: "再不绿就来不及了",
      stick: null,
      brand_name: "阿里巴巴集团",
      id: 121,
      check: null,
      article_url: "http://mp.weixin.qq.com/s?__biz=MzI0MjY0OTE0MQ==&mid=2247514248&idx=1&sn=58a380d7e8f8bc4fa95cc3e79c3bda50",
      headline: "寻找向上向善的绿动力 | 2023年度ESG100品牌榜&ESG品牌声誉研究报告今日发布"
    },
    {
      picture_url: "https://dbrank.net/digitalAssets/resources/img/LOGO/210.png",
      release_date: "2024-04-08",
      digest: "汽车品牌格局的“换道超车”正在精彩上演",
      stick: null,
      brand_name: "比亚迪",
      id: 122,
      check: null,
      article_url: "http://mp.weixin.qq.com/s?__biz=MzI0MjY0OTE0MQ==&mid=2247513093&idx=1&sn=134f120eb4238a297b3c894296c0fb93",
      headline: "新能源长征路上的摇滚 | 《“鸣笛指数”：2023年度汽车厂商&新能源车型用户心智榜全景报告》严肃发布"
    }
  ]
} as any); // 行业选中的数组

// 加载更多
const nextPageReport = num => {
  const page = typeof num === "number" ? num : pageNum.value;
  const total = page * 2; // 当前的数据条数
  console.log("当前页码", pageNum.value++);
  showLoadMore.value = total < reportList.value.count;
};

onMounted(() => {
  nextPageReport(1);
});

//每页只展示10条数据；根据reportList里的count来判断时候显示加载更多按钮
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
