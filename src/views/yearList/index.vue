<template>
  <div class="yearList">
    <div class="yearHeader">
      <div class="yearTit">【2023年榜】企业品牌营销年度BKM案例TOP100</div>
      <div class="yearTit2">
        <div>【2023年榜】互联网平台年度BKM案例TOP20</div>
        <div>
          查阅其他年份
          <el-select v-model="timeValue" placeholder="Select" size="small" style="width: 100px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
    </div>
    <div class="yearList_con">
      <div class="year_left">
        <div class="navBox">
          <div v-for="(level1, index1) in navData" :key="index1">
            <div class="level1" :class="{ active: selectedItem === level1.id }" @click="handleNav(level1.id, 'level1')">
              {{ level1.label }}
            </div>
            <div>
              <div v-for="(level2, index2) in level1.children" :key="index2">
                <div :class="`level2`">{{ level2.label }}</div>
                <div v-if="level2.children.length > 0">
                  <div v-for="(level3, index3) in level2.children" :key="index3">
                    <div
                      class="level3"
                      :title="level3.label"
                      :class="{ active: selectedItem === level3.id }"
                      @click="handleNav(level3.id, 'level3')"
                    >
                      {{ mixedSubstring(level3.label, 8, 8) }}({{ level3.num }})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="year_right">
        <el-table
          ref="tableRef"
          :data="tableData"
          align="center"
          style="width: 100%; height: 620px; overflow: hidden"
          :header-cell-style="{ background: '#ffdd00', color: '#000' }"
          :row-class-name="tableRowClassName"
        >
          <!-- <el-table-column prop="caseId" label="ID" style="display: none"></el-table-column> -->
          <el-table-column prop="rankNum" label="排名" width="45" align="center" v-slot="scope">
            <div class="rankThree" v-if="scope.row.rankNum < 4">{{ scope.row.rankNum }}</div>
            <div v-else>{{ scope.row.rankNum }}</div>
          </el-table-column>
          <el-table-column prop="caseName" label="案例名称" width="200" v-slot="scope" align="center">
            <div
              v-if="scope.row.isCaseDetails === 1"
              style="text-align: left; cursor: pointer"
              title="查看案例详情"
              @click="handleCase(scope.row.caseId)"
            >
              {{ scope.row.caseId }}{{ scope.row.caseName }}
            </div>
            <div v-else style="text-align: left">{{ scope.row.caseName }}</div>
          </el-table-column>
          <el-table-column prop="industry" label="行业" width="80" align="center">
            <template #default="{ row }">
              <div :title="mixedSubstring(row.industry, 8, 8) !== row.industry ? `${row.industry}` : ''">
                {{ mixedSubstring(row.industry, 8, 8) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="brand" label="品牌" width="100" align="center">
            <template #default="{ row }">
              <div :title="mixedSubstring(row.brand, 12, 12) !== row.brand ? `${row.brand}` : ''">
                {{ mixedSubstring(row.brand, 12, 12) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="120" align="center">
            <template #default="{ row }">
              <div :title="mixedSubstring(row.type, 28, 28) !== row.type ? `${row.type}` : ''">
                {{ mixedSubstring(row.type, 28, 28) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="dbValue" align="center">
            <template #header> 数字<br />品牌价值 </template>
            <template #default="{ row }"> {{ toVisualThousands(row.dbValue) }} </template>
          </el-table-column>
          <el-table-column prop="spreadRate" label="内容传播度" align="center" width="70">
            <template #header> 内容<br />传播度* </template>
            <template #default="{ row }"> {{ row.spreadRate }}% </template>
          </el-table-column>
          <el-table-column prop="participationLevel" align="center" width="70">
            <template #header> 用户<br />参与度* </template>
            <template #default="{ row }"> {{ row.participationLevel }}% </template>
          </el-table-column>
          <el-table-column prop="spread" align="center">
            <template #header>传播<br />引爆力总值</template>
            <template #default="{ row }"> {{ toVisualThousands(row.spread) }} </template>
          </el-table-column>
          <el-table-column prop="relatedContent" align="center" width="80">
            <template #header> 高相关<br />内容条数 </template>
            <template #default="{ row }"> {{ toVisualThousands(row.relatedContent) }} </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="text1">
      <div style="color: rgba(50, 50, 50, 1)">
        注：内容传播度，是指该案例在当月所有被调研案例中的传播热度的占比。用户参与度，是指该案例在当月所有被调研案例中的用户卷入程度的占比。
      </div>
      <div style="cursor: pointer">阅读完整报告>></div>
    </div>
    <div class="text2">
      案例版权声明：「BKM品牌传播案例库」所收录的案例均由『数字品牌榜』撰写，任何未经授权的转载、复制、翻印或建立网络镜像的行为均有违著作权相关的法律法规；本案例所使用的统计理论、技术、算法和内容版权归北京数榜信息科技有限公司所有，并可授权第三方在所允许范围内传播和引用，任何引用均须注明来源于“数字品牌榜”。“数榜”“数字品牌榜”名称及图形商标权利归北京数榜信息科技有限公司所有。
    </div>
  </div>
</template>

<script setup lang="ts" name="yearList">
import { onMounted, ref } from "vue";
import { toVisualThousands, mixedSubstring } from "@/utils";

const selectedItem = ref(1);
const timeValue = ref("2023");
const findCaseIdArr = ref([] as any); // 匹配三种类型的caseid数组
const tableRef = ref(null as any);

const options = [
  {
    value: "2023",
    label: "2023"
  },
  {
    value: "2024",
    label: "2024"
  }
];
const navData = ref([
  {
    id: 1,
    label: "互联网平台类"
  },
  {
    id: 2,
    label: "企业品牌类",
    children: [
      {
        id: 2.1,
        label: "按行业",
        children: [
          {
            id: 2.11,
            label: "1汽车",
            num: 32
          },
          {
            id: 2.12,
            label: "手机",
            num: 21
          },
          {
            id: 2.13,
            label: "食品饮料123",
            num: 10
          },
          {
            id: 2.14,
            label: "1汽车",
            num: 32
          },
          {
            id: 2.3,
            label: "手机",
            num: 21
          },
          {
            id: 2.16,
            label: "食品饮料",
            num: 10
          },
          {
            id: 2.17,
            label: "1汽车",
            num: 32
          },
          {
            id: 2.18,
            label: "手机",
            num: 21
          },
          {
            id: 2.19,
            label: "食品饮料",
            num: 10
          }
        ]
      },
      {
        id: 2.2,
        label: "按品牌",
        children: [
          {
            id: 2.21,
            label: "华为",
            num: 32
          },
          {
            id: 2.22,
            label: "伊利",
            num: 21
          },
          {
            id: 2.21,
            label: "华为",
            num: 32
          },
          {
            id: 2.22,
            label: "伊利",
            num: 21
          },
          {
            id: 2.21,
            label: "华为",
            num: 32
          },
          {
            id: 2.22,
            label: "伊利",
            num: 21
          },
          {
            id: 2.21,
            label: "华为",
            num: 32
          },
          {
            id: 2.22,
            label: "伊利",
            num: 21
          },
          {
            id: 2.21,
            label: "华为",
            num: 32
          },
          {
            id: 2.22,
            label: "伊利",
            num: 21
          },
          {
            id: 2.21,
            label: "华为",
            num: 32
          },
          {
            id: 2.22,
            label: "伊利",
            num: 21
          },
          {
            id: 2.21,
            label: "华为",
            num: 32
          },
          {
            id: 2.22,
            label: "伊利",
            num: 21
          }
        ]
      },
      {
        id: 2.3,
        label: "按类型",
        children: [
          {
            id: 2.31,
            label: "周年庆",
            num: 32
          },
          {
            id: 2.32,
            label: "新品发布",
            num: 21
          }
        ]
      }
    ]
  }
]);

// 示例数据
const tableData = ref([
  {
    industryId: 2.11, //所属行业Id  没有返回null
    brandId: 2.12, //所属品牌id
    typeId: 2.13, //所属类型id
    caseId: 1,
    rankNum: 1, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.14,
    typeId: null,
    caseId: 2,
    rankNum: 2, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: null,
    typeId: 2.15,
    caseId: 3,
    rankNum: 3, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.12,
    typeId: 2.13,
    caseId: 4,
    rankNum: 4, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 5,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    industryId: null,
    brandId: 2.3,
    typeId: null,
    caseId: 10,
    rankNum: 5, //排名
    isCaseDetails: 1, // 是否有案例详情：1 有，0没有
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  }
]);
function findAllMatchingCaseIds(arr, value) {
  return arr
    .filter(obj => {
      return obj.industryId === value || obj.brandId === value || obj.typeId === value;
    })
    .map(obj => obj.caseId);
}

const handleNav = (id: any, type?: string) => {
  selectedItem.value = id;
  findCaseIdArr.value = [];
  if (type === "level1") {
    // 这里请求表格数据
  } else {
    // 查找表格数据匹配到 行业、品牌、类型的数据
    findCaseIdArr.value = findAllMatchingCaseIds(tableData.value, id);
    console.log("匹配到的caseId:", Object.values(findCaseIdArr.value));
  }
  // rowView(10);
};
// 点击案例名字跳转到案例详情
const handleCase = (id: any) => {
  console.log(id);
};
const tableRowClassName = ({ row, rowIndex }) => {
  if (findCaseIdArr.value.includes(row.caseId)) {
    return "highlight-row";
  }
  if (rowIndex % 2 == 0) {
    return "";
  } else {
    return "warning-row";
  }
};

// 没实现
// function rowView(id) {
//   nextTick(); // 确保 DOM 已经更新
//   const targetRow = tableData.value.find(row => row.caseId === id);
//   if (targetRow) {
//     const tableBody = tableRef.value.$el.querySelector(".el-table__body-wrapper tbody");
//     const rows = tableBody.querySelectorAll("tr");

//     rows.forEach(row => {
//       if (row.cells.innerText === targetRow.caseId.toString()) {
//         row.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//     });
//   }
// }
onMounted(() => {
  handleNav(2);
});
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
