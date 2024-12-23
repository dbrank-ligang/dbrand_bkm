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
          <el-input placeholder="请输入品牌名称"></el-input>
          <el-button size="small">搜索</el-button>
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
            v-if="tradeArrSelected"
            type="info"
            effect="plain"
            closable
            @close="handleSearchListClose('trade')"
            class="tradeTag"
          >
            {{ tradeArrSelected && tradeArrSelected.join("、") }}
          </el-tag>
          <el-tag
            v-if="brandArrSelected"
            type="info"
            effect="plain"
            closable
            @close="handleSearchListClose('brand')"
            class="brandTag"
          >
            {{ brandArrSelected && brandArrSelected.join("、") }}
          </el-tag>
          <el-tag
            v-if="typesArrSelected"
            type="info"
            effect="plain"
            closable
            @close="handleSearchListClose('types')"
            class="typesTag"
          >
            {{ typesArrSelected && typesArrSelected.join("、") }}
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
  </div>
</template>

<script setup lang="ts" name="bkmSearch">
import { ref } from "vue";
import { ElMessage } from "element-plus";

const tradeArrSelected = ref(["汽车", "美妆个护", "运动装备"] as any); // 行业选中的数组
const brandArrSelected = ref(["阿里巴巴", "海尔"] as any); // 品牌选中的数组
const typesArrSelected = ref(["阿里巴巴", "海尔"] as any); // 类型选中的数组
const dateArrSelected = ref(["2024", "2022"]); // 品牌选中的数组
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
    tradeArrSelected.value = null;
  }
  if (type === "brand") {
    brandArrSelected.value = null;
  }
  if (type === "types") {
    typesArrSelected.value = null;
  }
};

//查询按钮
const handleSearch = () => {
  console.log("行业：", tradeArrSelected.value);
  console.log("品牌：", brandArrSelected.value);
  console.log("类型：", typesArrSelected.value);
  console.log(dataArr.value);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
