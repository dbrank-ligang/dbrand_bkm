<template>
  <div class="aboutBkmBox">
    <div class="aboutBkmTit">『BKM案例库』介绍</div>
    <div class="aboutBkm_module1">
      BKM，全称为Best Known Method（已知的最佳方法）。<br />
      以此为名，是希望每一个收录入库的案例都能代表该方向上的品牌传播、公关、营销的最佳实践，值得被更多企业借鉴、参考，从而找出适合<br />
      自己的最优解。2022年7月，『数字品牌榜』与12位联合发起人共同启动案例库建设，迄今已集纳1500+BKM案例。
    </div>
    <div class="aboutBkm_module2">
      <div class="aboutBkm_module2_item" v-for="item in modules3List" :key="item">
        <div class="aboutBkm_module2_tit">{{ item.title }}</div>
        <div class="aboutBkm_module2_inner">{{ item.inner }}</div>
      </div>
    </div>
    <div class="aboutBkm_module3">
      ①客观性保证。所有案例仅以传播效果来决定排名，传播效果的衡量仅以全网相关内容的计算结果为准。<br />
      ②公正性保证。没有“评委投票”，没有对排名的人为操作。<br />
      ③独立性保证。无论案例所属企业/执行机构是否与『数字品牌榜』有商业合作，都不影响计算结果排名。<br />
      ④专业性保证。BKM案例库的12位联合发起人，要么是在品牌传播/营销/广告/市场领域有20年以上从业经历的行内人，要么是研究学者和媒体总编，均非“参赛”企业或4A公司，共同为优秀案例进行学理上的点评分析和咨询建议。
    </div>
    <div class="aboutBkm_module4">
      <div class="aboutBkm_module4_tit">案例库共建伙伴</div>
      <div class="aboutBkm_module4_pic"></div>
      <div class="aboutBkm_module4_tip">（按首字拼音为序）</div>
    </div>
  </div>
</template>
<script setup lang="ts" name="aboutBkm">
import { ref } from "vue";

const modules3List = ref([
  {
    title: "库",
    inner: "努力建设成国内巨全面、巨丰富、巨专业的品牌营销传播的专项Campaign案例集，可查询、供借鉴、供研究。"
  },
  {
    title: "赛",
    inner: "月度常规赛+年度总决赛，仅以数据作为衡量标准，保证评选公正性，每月计算出TOP20的最佳案例，每年年底进行年度总决赛角逐。"
  },
  {
    title: "奖",
    inner: "反映各个领域、各个方向的最佳品牌传播实践和方法，向BKM学习。"
  }
] as any);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
