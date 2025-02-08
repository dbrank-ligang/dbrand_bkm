<template>
  <div class="caseDetailBox">
    <div class="case_menu">
      <div v-for="item in menuArr" :key="item.name">
        <div class="oneLevel menu" @click="selectItem(item.id)">{{ item.name }}</div>
        <div
          class="twoLevel menu"
          :style="{
            backgroundColor: selectedItem === childItem.id ? '#ffdd00' : '',
            display: childItem.isShow ? 'block' : 'none'
          }"
          v-for="childItem in item.child"
          :key="childItem.name"
          @click="selectItem(childItem.id)"
        >
          {{ childItem.name }}
        </div>
      </div>
    </div>
    <div class="case_con" ref="scrollContainer" @copy.prevent="handleCopy">
      <div class="case_con1" id="part1">
        <div class="timeBox">
          <div class="timeBox_left">
            <div class="date">
              <div style="font-size: 28px">{{ dataObj.year }}</div>
              <div style="font-size: 28px">{{ dataObj.month }}</div>
            </div>
            <div class="caseMessage">
              <div>案例编号：{{ dataObj.caseId }}</div>
              <div class="caseNameBox" style="margin-top: 15px">
                <div>案例名称：</div>
                <div style="font-weight: 500; color: #000; font-size: 20px" title="123">{{ dataObj.caseName }}</div>
              </div>
              <div class="brandNameBox">
                <div class="brandItem" v-for="item in dataObj.coBrand" :key="item">
                  <img :src="item.iconUrl" /> {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="timeBox_right">
            <div class="brandNameBox">
              <img src="http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960" />
              品牌名称
            </div>
          </div> -->
        </div>
        <div class="countBox">
          <div class="countBox_left">
            <div class="row_1">
              <div class="row_1_tag1">
                <div>{{ dataObj.dataDetail.rank }}</div>
                <div>{{ dataObj.dataDetail.annualRank }}</div>
              </div>
            </div>
            <div class="row_2">
              <div class="row_2_tag1">
                <div style="margin-top: 30px">传播效果价值</div>
                <div style="margin-top: 5px; font-weight: 600">
                  {{ dataObj.dataDetail.spreadValue }}
                  <!-- <span style="font-style: italic">DB</span> -->
                  <span style="font-size: 14px">DB</span>
                </div>
              </div>
              <div class="row_2_tag2">
                <div style="margin-top: 30px">内容总条数</div>
                <div style="margin-top: 5px">
                  <span style="font-weight: 600">{{ dataObj.dataDetail.contentNum }} </span>条
                </div>
              </div>
              <div class="row_2_tag3">
                <div style="margin-top: 25px">内容<br />传播效度</div>
                <div style="margin-top: 5px; font-weight: 600">{{ dataObj.dataDetail.spreadRate }}</div>
              </div>
            </div>
            <div class="row_3">
              <div class="row_3_tag1">
                <div class="row_3_tag1_tit">用户参与度</div>
                <div class="row_3_tag1_num">{{ dataObj.dataDetail.participationRate }}</div>
              </div>
              <div class="row_3_tag2">
                <div class="row_3_tag1_tit">全网好感度</div>
                <div class="row_3_tag1_num">{{ dataObj.dataDetail.goodOpinionRate }}</div>
              </div>
              <div class="row_3_tag3">
                <div class="row_3_tag1_tit">传播引爆度</div>
                <div class="row_3_tag1_num">{{ dataObj.dataDetail.fatigabilityRate }}</div>
              </div>
            </div>
            <div class="row_4">
              <div class="row_4_tag1">
                <div class="row_4_tag1_tit">TOP10内容引爆力合计</div>
                <div class="row_4_tag1_num">
                  {{ dataObj.dataDetail.top10_donationRate }}
                  <span style="font-size: 14px">DB</span>
                </div>
              </div>
              <div class="row_4_tag2">
                <div class="row_4_tag1_tit">单条内容引爆力均值</div>
                <div class="row_4_tag1_num">
                  {{ dataObj.dataDetail.singleMeanValue }}
                  <span style="font-size: 14px">DB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="case_con1">
        <div id="part1" class="moduleTitle">part1 <span>项目信息</span></div>
        <div id="startTime">
          <div class="nodeTag">【起止时间】</div>
          <span>{{ dataObj.startTime }}</span>
        </div>
        <div id="highlights" class="innerBox">
          <div class="nodeTag">【案例亮点】</div>
          <div class="contentBox" v-html="dataObj.highlights"></div>
        </div>
        <div id="caseType" class="innerBox">
          <div class="nodeTag">【案例类型】</div>
          <div class="contentBox" v-if="dataObj.caseType">
            <div class="typeBox" v-if="dataObj.caseType.taskType && dataObj.caseType.taskType.length > 0">
              <div class="typeLabel">任务类型</div>
              <div class="typeList">
                <div class="typeItem" v-for="item in dataObj.caseType.taskType" :key="item" :title="item">
                  {{ mixedSubstring(item, 10, 10) }}
                </div>
              </div>
            </div>

            <div class="typeBox" v-if="dataObj.caseType.contentType && dataObj.caseType.contentType.length > 0">
              <div class="typeLabel">内容类型</div>
              <div class="typeList">
                <div class="typeItem" v-for="item in dataObj.caseType.contentType" :key="item" :title="item">
                  {{ mixedSubstring(item, 10, 10) }}
                </div>
              </div>
            </div>

            <div class="typeBox" v-if="dataObj.caseType.techniqueType && dataObj.caseType.techniqueType.length > 0">
              <div class="typeLabel">手法类型</div>
              <div class="typeList">
                <div class="typeItem" v-for="item in dataObj.caseType.techniqueType" :key="item" :title="item">
                  {{ mixedSubstring(item, 10, 10) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="introduce">
          <div class="nodeTag">【案例简介】</div>
          <div class="contentBox" v-html="dataObj.introduce"></div>
        </div>
      </div>
      <div class="case_con1">
        <div id="part2" class="moduleTitle">part2 <span>项目执行</span></div>
        <div id="spreadRhythm">
          <div class="nodeTag">【传播节奏】</div>
          <div class="contentBox" v-html="dataObj.spreadRhythm"></div>
        </div>
        <div id="medium" class="innerBox">
          <div class="nodeTag">【媒介策略】</div>
          <div class="contentBox" v-html="dataObj.medium"></div>
        </div>
        <div id="cooperation" class="innerBox">
          <div class="nodeTag">【合作资源】</div>
          <div class="contentBox" v-if="dataObj.cooperation">
            <div class="typeBox" v-if="dataObj.cooperation.starLinkage && dataObj.cooperation.starLinkage.length > 0">
              <div class="typeLabel">明星联动</div>
              <div class="typeList">
                <div class="typeItem" v-for="item in dataObj.cooperation.starLinkage" :key="item" :title="item">
                  {{ item }}
                </div>
              </div>
            </div>

            <div class="typeBox" v-if="dataObj.cooperation.organization && dataObj.cooperation.organization.length > 0">
              <div class="typeLabel">组织结构</div>
              <div class="typeList">
                <div class="typeItem" v-for="item in dataObj.cooperation.organization" :key="item" :title="item">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="sourceMaterial" class="innerBox">
          <div class="nodeTag">【素材创意】</div>
          <div class="contentBox" v-html="dataObj.sourceMaterial"></div>
        </div>
        <div id="spreadQuality" class="innerBox">
          <div class="nodeTag">【传播质量】</div>
          <div class="qualityBox">
            <div class="subtitle">(一) 传播引爆度</div>
            <div class="handTable">
              <div class="rowBox">
                <div class="col_1">传播引爆度*</div>
                <div class="col_3">{{ dataObj.spreadQuality.detonateObj.detonate_rate }}</div>
              </div>
              <div class="rowBox">
                <div class="col_1">传播引爆力总值</div>
                <div class="col_3">{{ dataObj.spreadQuality.detonateObj.detonate_grossValue }}</div>
              </div>
              <div class="rowBox">
                <div class="col_0">头部引爆力</div>
                <div class="col_2">TOP10内容DB值之和</div>
                <div class="col_3">{{ dataObj.spreadQuality.detonateObj.detonate_DB }}</div>
              </div>
              <div class="rowBox mergeRow">
                <div class="col_0">整体引爆力</div>
                <div class="col_2">
                  <div class="col_2_1">引爆条数</div>
                  <div class="col_2_2">整体所有引爆条数DB值之和</div>
                </div>
                <div class="col_3">
                  <div class="col_3_1">{{ dataObj.spreadQuality.detonateObj.detonate_totle }}</div>
                  <div class="col_3_2">{{ dataObj.spreadQuality.detonateObj.detonate_wholeDB }}</div>
                </div>
              </div>
              <div class="rowBox">
                <div class="col_0">平均引爆力</div>
                <div class="col_2">单条内容引爆力均值</div>
                <div class="col_3">{{ dataObj.spreadQuality.detonateObj.detonate_meanValue }}</div>
              </div>
              <div class="rowBox"></div>
            </div>
            <div class="des">*在数榜-BKM案例库XXXX年XX月所有调研案例中的占比</div>
          </div>
          <div class="qualityBox">
            <div class="subtitle">(二) 传播引爆力TOP10内容列表</div>
            <div class="top10listExplain" v-html="dataObj.spreadQuality.top10ListObj.top10listExplain"></div>
            <div class="top10listTitle">{{ dataObj.spreadQuality.top10ListObj.top10listTitle }}</div>
            <div class="top10listSource">数据来源：{{ dataObj.spreadQuality.top10ListObj.top10listSource }}</div>
            <div class="top10listTime">时间窗口：{{ dataObj.spreadQuality.top10ListObj.top10listTime }}</div>
            <div class="top10listTable">
              <el-table
                :data="dataObj.spreadQuality.top10ListObj.top10ListArr"
                stripe
                style="width: 100%"
                :header-cell-style="{ background: '#ffdd00', color: '#000' }"
              >
                <el-table-column prop="date" label="发表时间" width="120"> </el-table-column>
                <el-table-column prop="title" label="内容标题" align="center"> </el-table-column>
                <el-table-column prop="platform" label="首发平台" width="120" align="center"> </el-table-column>
                <el-table-column prop="source" label="媒体源" width="120" align="center"> </el-table-column>
                <el-table-column prop="dbValue" label="所有相似内容合计DB值" width="120" align="center"> </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="qualityBox">
            <div class="subtitle">(三) 传播关键词云图</div>
            <div class="contentBox" id="ciYunBox" v-html="dataObj.spreadQuality.wordCloud"></div>
          </div>
        </div>
        <!-- </div> -->
      </div>

      <div class="case_con1">
        <div id="part3" class="moduleTitle">part3<span>结案点评</span></div>
        <div id="learnFrom">
          <div class="nodeTag">【借鉴】</div>
          <div class="contentBox" v-html="dataObj.learnFrom"></div>
        </div>
        <div v-if="dataObj.challenge" id="challenge" class="innerBox">
          <div class="nodeTag">【挑战】</div>
          <div class="contentBox" v-html="dataObj.challenge"></div>
        </div>
        <div id="referenceLink" class="innerBox">
          <div class="nodeTag">【参考链接】</div>
          <div class="contentBox" v-if="dataObj.referenceLink && dataObj.referenceLink.length > 0">
            <div v-for="item in dataObj.referenceLink" :key="item.title">
              <a :href="item.linkUrl" target="_blank">{{ item.title }}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="desBox">
        案例版权声明：「
        牌传播案例库」所收录的案例均由『数字品牌榜』撰写，任何未经授权的转载、复制、翻印或建立网络镜像的行为均有违著作权相关的法律法规；本案例所使用的统计理论、技术、算法和内容版权归北京数榜信息科技有限公司所有，并可授权第三方在所允许范围内传播和引用，任何引用均须注明来源于“数字品牌榜”。“数榜”“数字品牌榜”名称及图形商标权利归北京数榜信息科技有限公司所有。
      </div>
    </div>
  </div>
</template>

<script setup name="caseDetail">
import { h, ref, onMounted, onUnmounted } from "vue";
import { mixedSubstring } from "@/utils";
import { ElNotification } from "element-plus";
import QRCode from "@/assets/images/QRcode.jpg";

const selectedItem = ref();
const scrollContainer = ref(null);
const dataObj = ref({
  // casePageType: "A", // 案例页类型A/B
  month: "2024", // 案例月份
  year: "Oct", // 案例年份
  caseId: "D2410301", // 案例编号
  caseName: "Bayard世界镇痛日Campaign", // 案例名称;
  coBrand: [
    { iconUrl: "https://dbrank.net/digitalAssets/resources/img/LOGO/363.png", name: "品牌名称" },
    { iconUrl: "https://dbrank.net/digitalAssets/resources/img/LOGO/70.png", name: "品牌名称" },
    { iconUrl: "https://dbrank.net/digitalAssets/resources/img/LOGO/75.png", name: "品牌名称" }
  ], // 联合品牌数组
  // // 数据详情
  dataDetail: {
    rank: "No.99", //排名
    annualRank: "品牌营销BKM案例2023年榜", //所属年榜
    spreadValue: "26,351,512", //传播效果价值
    contentNum: "26,351", //内容总条数
    spreadRate: "10.82%", //内容传播度
    participationRate: "10.82%", //用户参与度
    goodOpinionRate: "10.82%", //全网好感度
    fatigabilityRate: "10.82%", //传播引爆度
    top10_donationRate: "44,927,128", //TOP10内容引爆力合计
    singleMeanValue: "44,927,128" //单条内容引爆力均值
  },
  startTime: "2024年11月28日-12月6日",
  highlights:
    "案例亮点,1、悬念营销，勾起粉丝兴趣和好奇心。在官宣代言人之前，蜜雪冰城在各大社交平台上进行了高调预热，放出了一张身穿紫色西装、打上紫色领带的无脸照片，并配上了调皮的互动文案“猜猜是谁？”，还给出了提示“肤白貌帅、能歌善舞、爱岗敬业”。这一波操作成功勾起了粉丝的兴趣，评论区瞬间热闹起来，网友们纷纷报上自家“爱豆”的名字，比如蝎子莱莱、黑大帅等等，为后续的官宣造足了声势<br/>2、“令人意内”的全旧代言人，进一步强化品牌IP。雪王作为蜜雪冰城的吉祥物，早已深入人心，具有较高的辨识度和亲和力。而且雪王之前已经是蜜雪冰城的品牌终身代言人，此次让雪王代言新饮品，不仅延续了品牌的特色，还进一步强化了雪王与蜜雪冰城的品牌关联。一场乌龙般的互动不仅拉近了与网友的距离，同时也为雪王这一IP形象树立起更为立体的人物性格。此外，蜜雪冰城一直都以低价著称，如果高价请流量明星代言，反而不利于品牌形象的塑造。<br/>3、低成本高效益。与明星代言相比，雪王代言的成本更低，但效果却毫不逊色，官宣代言人的推文在多个平台上都达到了10万+的点赞和评论。虽然得到了“全穷代言人”的称号，以及毒舌粉丝的锐评“代言费从左兜掏出来揣回右兜”，但也直接证明了本次营销的性价比之高。",
  // caseType: { taskType: [] },
  caseType: {
    // 三种案例类型
    taskType: ["任务类型类型", "任务类型123", "任务类型", "任务类型"],
    contentType: ["内容类型", "内容类型", "内容类型", "内容类型"],
    techniqueType: ["手法类型", "手法类型", "手法类型"]
  },
  introduce:
    "案例简介, 震惊！某国民品牌邀请顶流代言，居然分文没花！代言费左手倒右手，又回到了品牌的兜里。这到底是迫于资本的压力，还是品牌策略的一次大胆创新？这背后究竟隐藏着更为复杂的商业逻辑，还是不为人知的巨大秘密？ 欢迎阅读今天的走进案例之蜜雪冰城官宣雪王代言芋泥奶茶Campaign。 据悉，知名品牌蜜雪冰城于11月28日发布消息，称即将官宣“厚芋泥奶茶全球代言人”，并发布了一张身穿紫色西装、打着紫色领带的无脸照片，给出“肤白貌帅、能歌善舞、爱岗敬业”三个小提示，请网友们猜猜他是谁，成功勾起了众人兴趣。 就在大家众说纷纭的时候，官方正式揭晓了答案。原来，这位代言人就是大家所熟知的雪王。雪王作为蜜雪冰城的自有IP，其代言费用自然无需外流，完美实现了“代言费左手倒右手”的巧妙操作。 至此，这个谜团被彻底揭开。而这一品牌营销策略也得到了众多网友的称赞，认为既新颖又接地气，更在无形中加深了消费者对品牌的情感认同。 『数字品牌榜』以2024年11月28日-12月6日为时间窗口对蜜雪冰城官宣雪王代言芋泥奶茶Campaign进行了分析。",
  spreadRhythm:
    '传播节奏：○ 11.28 蜜雪冰城称“厚芋泥奶茶全球代言人”即将揭晓，并让粉丝猜猜是谁；○ 11.29 蜜雪冰城官宣“厚芋泥奶茶全球代言人”是雪王，网友表示“太让人意内了”；#雪王自己官宣自己#话题在各平台发酵；<br/>○ 12.02 顶尖广告发布文章《史上“最穷”蜜雪冰城代言人，网友：没咖硬抬！》，获得较高数字品牌价值；<br/>○ 12.04 蜜雪冰城发布代言人雪王定制西装幕后vlog；中国饮品快报发布文章《蜜雪新代言人爆了，网友直呼请了个“永不担心塌房的明星”》；<img class="rich_pages wxw-img" data-backh="277" data-backw="532" data-cropselx1="0" data-cropselx2="532" data-cropsely1="0" data-cropsely2="296" data-imgfileid="100036849" data-ratio="0.5212962962962963" data-s="300,640" src="https://mmbiz.qpic.cn/mmbiz_jpg/sxgP7jgemWoPYjsonia5RAquSBiaU2Iv7IKDibniagmevdnW0PYpreyVX9UMX7xFxXkibPDLiafKeh9eghmeR4kSU2og/640?wx_fmt=jpeg&amp;from=appmsg" data-type="png" data-w="1080" style="vertical-align: middle;width: 100%;height: auto;">来源：『数字品牌榜』监测研究',
  medium:
    '媒体策略：按媒体源看，本案例媒介渠道分布主要集中在自媒体，大众自媒体的内容发布条数最多，企业自媒体收获的数字品牌价值最高；按平台看，主要集中在抖音，此外，微博、微信号、视频号在传播中也起到了关键作用。<img class="rich_pages wxw-img" src="https://mmbiz.qpic.cn/mmbiz_jpg/sxgP7jgemWoPYjsonia5RAquSBiaU2Iv7I8y867X6yaTCKnJMdJnx3ibjSO4VMWXnsjia3Ehsdv4KRc82FW9nmlcxQ/640?wx_fmt=jpeg&amp;from=appmsg" data-type="png"  style="vertical-align: middle;width: 100%;height: auto;margin-top: 30px;" /><img class="rich_pages wxw-img" data-backh="296" data-backw="532" data-cropselx1="0" data-cropselx2="532" data-cropsely1="0" data-cropsely2="296" data-imgfileid="100036852" data-ratio="0.5574074074074075" data-s="300,640" src="https://mmbiz.qpic.cn/mmbiz_jpg/sxgP7jgemWoPYjsonia5RAquSBiaU2Iv7IqlbYb9AdDn6Ez53WezDKibq34Y94r04XjVfM95GD9QmBgxNiad1Jbz4Q/640?wx_fmt=jpeg&amp;from=appmsg" data-type="png" data-w="1080" style="vertical-align: middle;width: 100%;height: auto;">来源：『数字品牌榜』监测研究',
  cooperation: {
    // 两类合作资源
    starLinkage: ["蒋勤勤", "姜朝", "麦迪娜"],
    organization: ["中国人口福利基金会", "中国慈善家杂志", "中国慈善家杂志"]
  },
  sourceMaterial:
    '1、"素材创意",创意性剪影海报<br/>蜜雪冰城在官宣代言人之前发布了悬念海报，通过剪影和暗示的方式引发了网友们的广泛猜测和讨论。并且，蜜雪冰城还给出了代言人的特点提示“肤白貌帅、能歌善舞、爱岗敬业”，更是激起了网友的好奇心，评论区热闹非凡。来源：微博@蜜雪冰城<br />2、变装视频及幕后花絮雪王这次代言自家的新饮品，最大（唯一）的改变就是换了一身紫色新装，与“厚芋泥奶茶”相得益彰，所以后续宣传也以此为切入点。11月30日，蜜雪冰城发布了一段翻拍影视片段的视频，因为“先生，这里衣冠不整恕不招待”，所以雪王打上了领带、换上了西装，顺理成章完成了代言人的华丽转身。12月4日，蜜雪冰城发布雪王定制西装幕后vlog，雪王选了芋泥紫的颜色，并表示“新衣服搭配新身份，从今天起我就是厚芋泥奶茶全球代言人”，成功传播了品牌推出新饮品的信息。<br />3、自己玩自己，借梗营销当官方公布厚芋泥奶茶全球代言人就是雪王本人时，网友们纷纷表示“意料之外、情理之中”，并对此进行了各种吐槽和玩梗，比如“自己用自己”“公开了一个众所周知的事情”“好消息0个人想知道”。蜜雪冰城也趁机玩起了自己的梗，发布动态称“蜜雪冰城也是好起来了，竟然请顶流雪王代言”，进一步增加了话题的热度和讨论度。<img class="rich_pages wxw-img" data-imgfileid="100036855" data-ratio="1.0916666666666666" data-s="300,640" src="https://mmbiz.qpic.cn/mmbiz_png/sxgP7jgemWoPYjsonia5RAquSBiaU2Iv7IX6ILXUUF2I5qp2RFXkneYGhM9odR7HIqJnKicpD1sQqe5qqNAkU7Qmw/640?wx_fmt=png&amp;from=appmsg" data-type="png" data-w="720" style="vertical-align: middle;width: 100%;"<br />来源：小红书',
  learnFrom:
    "1、‘借鉴’-代言人和品牌要有契合点<br />选择与品牌定位相符的代言人，有能提高品牌知名度、增强品牌形象、塑造品牌价值、吸引目标消费者、提高产品销量等等一系列好处。也就是说，代言人是要为品牌赋能与造势的，除了形象、气质要与品牌相契合，其流量、知名度必须高于品牌或者产品，否则就不知道是谁给谁代言了。一个负面例子是霸王茶姬，请了一堆流量明星线下站台，不仅很多人都不认识，而且明星还接连念错品牌，营销变营笑。<br />预热期间，粉丝在蜜雪冰城评论区猜测了数位明星，但知名度、影响力几乎没有能和雪王对等的，有网友说“雪王的形象太成功了，比任何明星都好使”。代言人的作用是锦上添花，对于本身就具有高知名度的品牌来说，代言人的国民度是一定要高于或跟品牌是一个等级的，或者是因为某现象级事件，在短期内有超高影响力的公众人物。<br />2、坚守品牌特色，发挥差异化优势<br />蜜雪冰城从没请过任何流量明星代言，一是为了节省成本，二是因为雪王这个IP深入人心，本身就是品牌的最佳代言人，而且永远没有塌房的风险。所以蜜雪冰城本次营销看似充满反差，其实就像网友说的在“意料之中”，自己代言自己，是蜜雪冰城一贯的特色和传统，也是区别于其他品牌的差异化打法。<br />其他品牌也应该认识到，在产品趋同的情况下，在营销中保持特色，是吸引消费者的好办法。比如瑞幸咖啡，疯狂联名、追热点、频繁更换代言人，虽然走了一条跟蜜雪冰城相反的“花心”之路，却始终在营销圈拥有一席之地，这也不失为差异化营销的好办法。",
  // challenge: "挑战",
  referenceLink: [
    {
      title: "1、《史上“最穷”蜜雪冰城代言人，网友：没咖硬抬！》",
      linkUrl: "https://mp.weixin.qq.com/s/jtKq8AS7VXk2qVtFm7Ig2g"
    },
    {
      title: " 2、《雪王为蜜雪冰城代言？？这真是硬炒作。。》",
      linkUrl: "https://mp.weixin.qq.com/s/RXw2eqGXGruYReFvRf0TRg"
    }
  ],
  // "1、'链接'《史上“最穷”蜜雪冰城代言人，网友：没咖硬抬！》https://mp.weixin.qq.com/s/jtKq8AS7VXk2qVtFm7Ig2g<br />2、《雪王为蜜雪冰城代言？？这真是硬炒作。。》https://mp.weixin.qq.com/s/RXw2eqGXGruYReFvRf0TRg<br />3、《蜜雪新代言人爆了，网友直呼请了个“永不担心塌房的明星”》https://mp.weixin.qq.com/s/FaNHc71yjMfCb0tKeq1o0A<br />4、《一个子不掏！蜜雪冰城推出全球代言人！》https://mp.weixin.qq.com/s/9Qg37UW1a1-1ec-5WRx7Wg<br />5、《蜜雪冰城官宣的全球代言人，居然不穿裤子》https://mp.weixin.qq.com/s/N0U1CL4WACL7WLT4E2OmEg<br />6、《蜜雪冰城喜提“最廉价全球代言人”，网友：这段时间不喝了！》https://mp.weixin.qq.com/s/YuG6n29MWhb1zFljTSCN5Q",
  // 传播质量
  spreadQuality: {
    // （一）传播引爆度
    detonateObj: {
      detonate_rate: "24.55%", //引爆度
      detonate_grossValue: "237,534,762", //传播引爆力总值
      detonate_DB: " 281,536,932", // TOP10内容DB值之和
      detonate_totle: "4,027", // 引爆条数
      detonate_wholeDB: "684,426,433", //所有引爆条数DB值之和
      detonate_meanValue: " 169,959" //单条内容引爆力均值
    },
    // （二）传播引爆力TOP10内容列表
    top10ListObj: {
      top10listExplain:
        "本次Campaign TOP10内容中，有6条内容来自@蜜雪冰城 官方账号，数字品牌价值最高的两条分别来自抖音和视频号平台。",
      top10listTitle: "蜜雪冰城官宣雪王代言与你奶茶Campaign关键文章TOP10列表",
      top10listSource: "数字品牌榜",
      top10listTime: "2024.11.28-2024.12.06",
      top10ListArr: [
        {
          date: "2016-05-02",
          title: "关于每一位奶妈在产房的爱与用气",
          platform: "视频号",
          source: "Babycare品牌官方号",
          dbValue: "3,322,500"
        },
        {
          date: "2016-05-02",
          title: "#母爱无需疼痛来证明林市为无痛分娩转发。疼痛不会让爱变多，但爱会让疼痛减少。",
          platform: "微博",
          source: "Babycare",
          dbValue: "3,322,500"
        },
        {
          date: "2016-05-02",
          title:
            "去年7月，一位产妇按到朋友在五月天演唱会上的来电，用现场点歌的方式为产房内的她加油。这一片段被多位观众记录成短视频，引发了广泛关注。今年世界镇痛日，@中国人口福利基金会@中国慈善家杂志联合@babycare共同发布#母爱无需疼痛来证明#2024无痛分观公益行动主题《让我照顾你》。",
          platform: "微博",
          source: "中国慈善家杂志",
          dbValue: "3,322,500"
        }
      ]
    },
    // （三）传播关键词云图
    wordCloud:
      '词云图，在本次Campaign中，“雪王”“代言人”“官宣自己”等成为核心关键词，有效触达用户认知。代表芋泥和雪王新皮肤的“紫色”也被频繁提及，此外，雪王用来形容自己的“能歌善舞、爱岗敬业、肤白貌美”等词汇也给网友留下了深刻印象。<img class="rich_pages wxw-img" data-imgfileid="100036860" data-ratio="1.1347222222222222" data-s="300,640" src="https://mmbiz.qpic.cn/mmbiz_png/sxgP7jgemWoPYjsonia5RAquSBiaU2Iv7IOvicMhorncTiaFuOb3bCqXVYVto5BQadqhq8o7o8HTib06tPNCcibdjbAQ/640?wx_fmt=png&amp;from=appmsg" data-type="png" data-w="720" style="vertical-align: middle;width: 100%;">来源：『数字品牌榜』监测研究'
  }
});

const menuArr = ref([
  {
    id: "part1",
    name: "part1项目信息",
    child: [
      { id: "startTime", name: "起止时间" },
      { id: "highlights", name: "案例亮点" },
      { id: "caseType", name: "案例类型" },
      { id: "introduce", name: "案例简介" }
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

const handleCopy = () => {
  // 你可以在这里添加任何你希望在复制事件被阻止时执行的逻辑
  // 但由于我们已经使用了 `.prevent` 修饰符，所以这个方法实际上不会被调用
  // ElMessage.warning("禁止非付费用户复制文本，需联系棒女郎成为付费会员~");
  // 显示二维码 Notification
  ElNotification({
    dangerouslyUseHTMLString: true, // 允许使用HTML字符串
    // message: htmlContent
    message: h(
      "div",
      {
        style: "display: flex;  justify-content: space-between;"
      },
      [
        h("img", {
          src: QRCode,
          alt: "Notification Image",
          style: "width: 100px; height: 100px; margin-right: 10px; vertical-align: middle; display: inline-block;"
        }),
        h(
          "div",
          {
            style: "font-size: 13px; color: #333; line-height: 20px; display: flex; flex-direction: column;align-self: center;"
          },
          [h("span", "禁止非付费用户复制文本，需联系榜女郎成为付费会员~")]
        )
      ]
    ),
    duration: 9000
  });
};
// const flattenedChildren = computed(() => {
//   return menuArr.value.flatMap(item => item.child);
// });

onMounted(async () => {
  scrollChangeTab();
  // 遍历 menuArr 数组
  menuArr.value.forEach(part => {
    // 遍历每个 part 的 child 数组
    part.child.forEach(child => {
      // 检查 dataObj 中是否存在与 child.id 相同的键
      if (dataObj.value.hasOwnProperty(child.id)) {
        // 如果存在，将 child.isShow 设置为 true
        child.isShow = true;
      }
    });
  });

  console.log(menuArr.value);
});
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
