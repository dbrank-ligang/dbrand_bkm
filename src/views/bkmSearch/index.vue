<template>
  <div class="bkmSearchBox">
    <div class="SearchInner">
      <div class="tradeBox">
        <div class="tradeBox_tit">按行业</div>
        <div class="tradeBox_list">
          <div class="tagList">
            <div class="tagList_item" v-for="item in tradeArr" :key="item.title" @click="handleAdd('trade', item.title)">
              {{ item.title }}<span>{{ item.number }}</span>
            </div>
          </div>
          <div class="tagList_select">
            <el-tag
              style="margin-right: 10px"
              v-for="item in tradeArrSelected"
              :key="item"
              type="info"
              effect="plain"
              closable
              @close="handleClose('trade', item)"
            >
              {{ item }}
            </el-tag>
          </div>
        </div>
      </div>
      <div class="tradeBox">
        <div class="tradeBox_tit">按品牌</div>
        <div class="tradeBox_list">
          <div class="tagList">
            <div class="tagList_item" v-for="item in brandArr" :key="item.title" @click="handleAdd('brand', item.title)">
              {{ item.title }}<span>{{ item.number }}</span>
            </div>
          </div>
          <div class="tagList_select">
            <el-tag
              style="margin-right: 10px"
              v-for="item in brandArrSelected"
              :key="item"
              type="info"
              effect="plain"
              closable
              @close="handleClose('brand', item)"
            >
              {{ item }}
            </el-tag>
          </div>
        </div>
        <div class="inputBox">
          <!-- <el-input placeholder="请输入品牌名称"></el-input> -->
          <el-autocomplete
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            clearable
            placeholder="搜索品牌名称"
            @keyup.enter="handleSearch"
            value-key="showText"
          >
            <!-- <template #append><div @click="handleSearch" style="cursor: pointer">搜索</div></template> -->
          </el-autocomplete>
          <el-button size="small" @click="handleSearch1">搜索</el-button>
        </div>
      </div>
      <div class="tradeBox">
        <div class="tradeBox_tit">按类型</div>
        <div class="tradeBox_list">
          <div class="tagList">
            <div class="tagList_type">
              <div class="tagList_typeTit">按任务划分：</div>
              <div class="tagList_typeList">
                <div class="tagList_item" v-for="item in typesArr" :key="item.title" @click="handleAdd('types', item.title)">
                  {{ item.title }}<span>{{ item.number }}</span>
                </div>
              </div>
            </div>
            <div class="tagList_type">
              <div class="tagList_typeTit">按内容划分：</div>
              <div class="tagList_typeList">
                <div class="tagList_item" v-for="item in typesArr" :key="item.title" @click="handleAdd('types', item.title)">
                  {{ item.title }}<span>{{ item.number }}</span>
                </div>
              </div>
            </div>
            <div class="tagList_type">
              <div class="tagList_typeTit">按手法划分：</div>
              <div class="tagList_typeList">
                <div class="tagList_item" v-for="item in typesArr" :key="item.title" @click="handleAdd('types', item.title)">
                  {{ item.title }}<span>{{ item.number }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tagList_select">
            <el-tag
              style="margin-right: 10px"
              v-for="item in typesArrSelected"
              :key="item"
              type="info"
              effect="plain"
              closable
              @close="handleClose('types', item)"
            >
              {{ item }}
            </el-tag>
          </div>
        </div>
        <div class="inputBox">
          <el-input placeholder="请输入类型名称"></el-input>
          <el-button size="small">搜索</el-button>
        </div>
      </div>
      <div class="tradeBox">
        <div class="tradeBox_tit">按时间<span>(可多选)</span></div>
        <div class="tradeBox_list">
          <div class="tagList">
            <div class="tagList_item" v-for="item in dateArr" :key="item.title" @click="handleAdd('date', item.title)">
              {{ item.title }}<span>{{ item.number }}</span>
            </div>
          </div>
          <div class="tagList_select">
            <el-tag
              style="margin-right: 10px"
              v-for="item in dateArrSelected"
              :key="item"
              type="info"
              effect="plain"
              closable
              @close="handleClose('date', item)"
            >
              {{ item }}
            </el-tag>
          </div>
        </div>
      </div>
      <div class="buttonBox"><el-button class="buttonStyle" @click="handleSearch()">确定</el-button></div>
    </div>
    <div class="innerBox">
      <div class="innerYearsBox" v-for="yearsItem in dataArr" :key="yearsItem">
        <div class="searchTagList">
          <el-tag class="yearsTag" type="info" effect="plain"> {{ yearsItem.year }} </el-tag>
          <el-tag
            v-if="tradeArrTag.length > 0"
            type="info"
            effect="plain"
            closable
            @close="handleSearchListClose('trade')"
            class="tradeTag"
          >
            {{ tradeArrTag && tradeArrTag.join("、") }}
          </el-tag>
          <el-tag
            v-if="brandArrTag.length > 0"
            type="info"
            effect="plain"
            closable
            @close="handleSearchListClose('brand')"
            class="brandTag"
          >
            {{ brandArrTag && brandArrTag.join("、") }}
          </el-tag>
          <el-tag
            v-if="typesArrTag.length > 0"
            type="info"
            effect="plain"
            closable
            @close="handleSearchListClose('types')"
            class="typesTag"
          >
            {{ typesArrTag && typesArrTag.join("、") }}
          </el-tag>
        </div>
        <div class="listCon" v-for="monthItem in yearsItem.monthData" :key="monthItem">
          <div class="listCon_left">
            <span><span class="listCon_leftIcon"></span> {{ monthItem.month }}</span>
          </div>
          <div class="listCon_right">
            <div class="caseBox" v-for="caseItem in monthItem?.caseArr" :key="caseItem.num">
              <div class="caseBox_left">
                <img src="http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960" />
              </div>
              <div class="caseBox_right">
                <div class="caseBox_col">
                  <div>案例编号：</div>
                  <div>{{ caseItem.num }}</div>
                </div>
                <div class="caseBox_col caseBox_col_name">
                  <div class="caseBox_col_label">案例名称：</div>
                  <div>{{ caseItem.name }}</div>
                </div>
                <div class="caseBox_col">
                  <div>数字品牌价值：</div>
                  <div>{{ caseItem.DB }}</div>
                </div>
                <div class="caseBox_col caseBox_col_type">
                  <div>案例类型：</div>
                  <div>
                    <span>{{ caseItem.type }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      small
      background
      prev-text="上一页"
      next-text="下一页"
      layout="prev, pager, next"
      :total="500"
      class="mt-4"
      @change="changePage"
    />
  </div>
</template>

<script setup lang="ts" name="bkmSearch">
import { h, ref, watch } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { searchMediaApi } from "@/api/modules/media";
const inputValue = ref(""); // 品牌、类型搜索值
const searchData = ref([] as any); // 联想搜索结果数组
const notificationInstance = ref(null as any); // 定义一个引用来存储通知实例
import QRCode from "@/assets/images/QRcode.jpg";

const tradeArrSelected = ref(["汽车", "美妆个护", "运动装备"] as any); // 行业选中的数组
const brandArrSelected = ref(["阿里巴巴", "海尔"] as any); // 品牌选中的数组
const typesArrSelected = ref(["阿里巴巴", "海尔"] as any); // 类型选中的数组
const dateArrSelected = ref(["2024", "2022"]); // 时间选中的数组
// 搜索结果上面显示的tag
const tradeArrTag = ref([] as any); // 行业数组
const brandArrTag = ref([] as any); // 品牌数组
const typesArrTag = ref([] as any); // 类型数组
const tradeArr = ref([
  {
    title: "汽车",
    number: 103
  },
  {
    title: "互联网",
    number: 99
  },
  {
    title: "家电",
    number: 20
  },
  {
    title: "手机",
    number: 30
  },
  {
    title: "食品饮料",
    number: 30
  },
  {
    title: "咖啡茶饮",
    number: 30
  },
  {
    title: "美妆个护",
    number: 30
  },
  {
    title: "电子数码",
    number: 30
  },
  {
    title: "运动装备",
    number: 30
  },
  {
    title: "汽车",
    number: 103
  },
  {
    title: "互联网",
    number: 99
  },
  {
    title: "家电",
    number: 20
  },
  {
    title: "手机",
    number: 30
  },
  {
    title: "食品饮料",
    number: 30
  },
  {
    title: "咖啡茶饮",
    number: 30
  },
  {
    title: "美妆个护",
    number: 30
  },
  {
    title: "电子数码",
    number: 30
  },
  {
    title: "运动装备",
    number: 30
  }
]);
const typesArr = ref([
  {
    title: "华为",
    number: 103
  },
  {
    title: "阿里巴巴",
    number: 99
  },
  {
    title: "海尔",
    number: 20
  },
  {
    title: "瑞幸",
    number: 99
  },
  {
    title: "小米",
    number: 20
  }
]);
const brandArr = ref([
  {
    title: "华为",
    number: 103
  },
  {
    title: "阿里巴巴",
    number: 99
  },
  {
    title: "海尔",
    number: 20
  },
  {
    title: "瑞幸",
    number: 99
  },
  {
    title: "小米",
    number: 20
  },
  {
    title: "阿里巴巴",
    number: 99
  },
  {
    title: "海尔",
    number: 20
  },
  {
    title: "瑞幸",
    number: 99
  },
  {
    title: "小米",
    number: 20
  },
  {
    title: "阿里巴巴",
    number: 99
  },
  {
    title: "海尔",
    number: 20
  },
  {
    title: "瑞幸",
    number: 99
  },
  {
    title: "小米",
    number: 20
  }
]);
const dateArr = ref([
  {
    title: "全部",
    number: 103
  },
  {
    title: "2025",
    number: 99
  },
  {
    title: "2024",
    number: 20
  },
  {
    title: "2023",
    number: 99
  },
  {
    title: "2022",
    number: 20
  }
]);

const dataArr = ref([
  {
    id: 0,
    year: 2024,
    monthData: [
      {
        month: "03月",
        caseArr: [
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号1",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          },
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号2",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          },
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号3",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          }
        ]
      },
      {
        month: "04月",
        caseArr: [
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          },
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          },
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          }
        ]
      }
    ]
  },
  {
    id: 0,
    year: 2025,
    monthData: [
      {
        month: "05月",
        caseArr: [
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号1",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          },
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号2",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          },
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号3",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          }
        ]
      },
      {
        month: "06月",
        caseArr: [
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          },
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          },
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          }
        ]
      },
      {
        month: "07月",
        caseArr: [
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          },
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          },
          {
            imgUrl: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            num: "案例编号",
            name: "案例名称",
            DB: "数字品牌价值",
            type: ["#案例类型", "内容营销"]
          }
        ]
      }
    ]
  }
]);
//筛选-选中
const handleAdd = (type: string, tag: string) => {
  if (type === "trade" && tradeArrSelected.value.length < 3) {
    !tradeArrSelected.value.includes(tag) && tradeArrSelected.value.push(tag);
  } else if (type === "brand" && brandArrSelected.value.length < 3) {
    !brandArrSelected.value.includes(tag) && brandArrSelected.value.push(tag);
  } else if (type === "types" && typesArrSelected.value.length < 3) {
    !typesArrSelected.value.includes(tag) && typesArrSelected.value.push(tag);
  } else if (type === "date") {
    if (tag !== "全部") {
      if (dateArrSelected.value.includes("全部")) {
        dateArrSelected.value = dateArrSelected.value.filter(name => name !== "全部");
      }

      !dateArrSelected.value.includes(tag) && dateArrSelected.value.push(tag);
    } else {
      dateArrSelected.value = [];
      !dateArrSelected.value.includes(tag) && dateArrSelected.value.push(tag);
    }
  } else {
    ElMessage.warning("抱歉，暂时最多只能选择三个哦！");
  }
};
//筛选-删除选中
const handleClose = (type: string, tag: string) => {
  if (type === "trade") {
    tradeArrSelected.value.splice(tradeArrSelected.value.indexOf(tag), 1);
  }
  if (type === "brand") {
    brandArrSelected.value.splice(brandArrSelected.value.indexOf(tag), 1);
  }
  if (type === "types") {
    typesArrSelected.value.splice(typesArrSelected.value.indexOf(tag), 1);
  }
  if (type === "date") {
    dateArrSelected.value.splice(dateArrSelected.value.indexOf(tag), 1);
  }
};

const handleSearchListClose = (type: string) => {
  if (type === "trade") {
    tradeArrSelected.value = [];
    tradeArrTag.value = [];
  }
  if (type === "brand") {
    brandArrSelected.value = [];
    brandArrTag.value = [];
  }
  if (type === "types") {
    typesArrSelected.value = [];
    typesArrTag.value = [];
  }
};

//查询按钮
const handleSearch = () => {
  console.log("行业：", tradeArrSelected.value);
  console.log("品牌：", brandArrSelected.value);
  console.log("类型：", typesArrSelected.value);
  console.log("时间", dateArrSelected.value);
  tradeArrTag.value = JSON.parse(JSON.stringify(tradeArrSelected.value));
  brandArrTag.value = JSON.parse(JSON.stringify(brandArrSelected.value));
  typesArrTag.value = JSON.parse(JSON.stringify(typesArrSelected.value));
};

watch([tradeArrSelected, brandArrSelected, typesArrSelected], handleSearch);

const changePage = (currentPage: number, pageSize: number) => {
  // 页码 每页条数
  console.log(currentPage, pageSize);
};

// --------------------搜索逻辑----------------------------
const querySearch = async (queryString: string, cb: any) => {
  const { data } = await searchMediaApi({ keyword: queryString });
  searchData.value = data;
  cb(data);
};

// 点击搜索后:
// 若检索数据为空，则弹框提示;
// 若有检索数据，则直接跳转对应第一个媒体;
const handleSearch1 = () => {
  if (searchData.value.length <= 0) {
    console.log("搜索数据的长度", searchData.value);
    // 4.跳转到首页
    notificationInstance.value = ElNotification({
      dangerouslyUseHTMLString: true, // 允许使用HTML字符串
      // message: htmlContent
      message: h(
        "div",
        {
          style: "display: flex;  justify-content: space-between;"
        },
        [
          h(
            "div",
            {
              style: "font-size: 13px; color: #333; line-height: 20px;"
            },
            [
              h("span", "抱歉，您输入的品牌名称不准确或者未收录。请点击"),
              h(
                "a",
                {
                  // class: 'confirm-link', // 你可以添加一个自定义类来应用样式
                  onClick: handleNoticClose, // 绑定点击事件
                  style: "text-decoration: underline; cursor: pointer; color: #008efa;"
                },
                "重新搜索"
              ),
              h("span", "，或者点击"),
              h(
                "a",
                {
                  onClick: handleNoticAdd, // 绑定点击事件
                  style: "text-decoration: underline; cursor: pointer; color: #008efa;"
                },
                "我要新增"
              )
            ]
          )
        ]
      ),
      duration: 9000
    });
  }
};

// 点击重新搜索
const handleNoticClose = () => {
  console.log("重新搜索按钮被点击");
  // 在这里添加你的逻辑，比如关闭通知、发送请求等
  // 通知
  if (notificationInstance.value) {
    notificationInstance.value.close();
  }
};

// 点击我要新增
const handleNoticAdd = () => {
  console.log("我要新增按钮被点击");
  if (notificationInstance.value) {
    notificationInstance.value.close();
  }
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
          [h("span", "收到您的需求！"), h("span", "我们会尽快处理，"), h("span", "可联系榜女郎获知更新进度")]
        )
      ]
    ),
    duration: 9000
  });
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
