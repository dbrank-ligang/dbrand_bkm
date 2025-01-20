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
            <div class="level1" :class="{ active: selectedItem === level1.id }" @click="handleNav(level1.id)">
              {{ level1.label }}
            </div>
            <div>
              <div v-for="(level2, index2) in level1.children" :key="index2">
                <div :class="`level2`">{{ level2.label }}</div>
                <div v-if="level2.children.length > 0">
                  <div v-for="(level3, index3) in level2.children" :key="index3">
                    <div class="level3" :class="{ active: selectedItem === level3.id }" @click="handleNav(level3.id)">
                      {{ level3.label }}({{ level3.num }})
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
          :data="tableData"
          align="center"
          style="width: 100%; height: 610px; overflow: hidden"
          :header-cell-style="{ background: '#ffdd00', color: '#000' }"
          :row-class-name="tableRowClassName"
        >
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
              {{ scope.row.caseName }}
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
  </div>
</template>

<script setup lang="ts" name="yearList">
import { onMounted, ref } from "vue";
import { toVisualThousands, mixedSubstring } from "@/utils";

const selectedItem = ref(1);

const timeValue = ref("2023");

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
            label: "食品饮料",
            num: 10
          },
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
            label: "食品饮料",
            num: 10
          },
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

const tableData = [
  {
    rankNum: 1,
    caseId: 28,
    caseName: "华为Mate60未发先售 Camp-aign",
    isCaseDetails: 1, // 1 有案例详情可点击，0没有详情不可点击
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 2,
    caseName: "华为Mate60未发先售 Camp-aign",
    isCaseDetails: 0,
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 3,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 4,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 5,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 6,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 7,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 8,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 9,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 10,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 11,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 12,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 13,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 14,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 15,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 16,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 17,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 18,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 19,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  },
  {
    rankNum: 20,
    caseName: "华为Mate60未发先售 Camp-aign",
    industry: "行业行业行",
    brand: "品牌品牌品牌123",
    type: "类型类型、类型类型、类型类型",
    dbValue: 3013336150, // 数字品牌价值
    spreadRate: 42.12, //传播度
    participationLevel: 78.9, //c参与度
    spread: 100202002, //引爆力传播
    relatedContent: 327182 // 高相关内容传播
  }
];
const handleNav = (id: any) => {
  console.log(id);
  selectedItem.value = id;
};
// 点击案例名字跳转到案例详情
const handleCase = (id: any) => {
  console.log(id);
};
const tableRowClassName = ({ rowIndex }) => {
  if (rowIndex % 2 == 0) {
    return "";
  } else {
    return "warning-row";
  }
};

onMounted(() => {
  handleNav(2);
});
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
