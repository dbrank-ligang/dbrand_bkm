<template>
  <div class="mediaQ3">
    <div class="timeBox">
      <div @click="toPrevWeek">{{ prevWeek }}</div>
      <div>{{ currentWeek }}</div>
      <div @click="toNextWeek">{{ nextWeek }}</div>
    </div>
    <swiper
      @swiper="onSwiper"
      :slides-per-view="3"
      :centered-slides="true"
      :space-between="20"
      :navigation="true"
      :modules="[Navigation]"
      class="mySwiper"
      @active-index-change="onSwiperChange($event.activeIndex)"
    >
      <swiper-slide v-for="item in carouseData" :key="item.id" :id="item.id" :ref="setItemRef(item.id)">
        {{ item.id }}
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts" name="mediaQ3">
// Import Swiper Vue.js components
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const currentWeek = ref("");
const prevWeek = ref("");
const nextWeek = ref("");
const carouseData = ref([
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 }
]);
const swiperRef = ref(null) as any;

const onSwiper = swiper => {
  swiperRef.value = swiper;
};
const setItemRef = id => {
  return `item${id}`;
};

const toNextWeek = index => {
  console.log(index);
  swiperRef.value.slideNext();
};
const toPrevWeek = index => {
  console.log(index);
  swiperRef.value.slidePrev();
};
const onSwiperChange = index => {
  currentWeek.value = `Week ${index + 1}`;
  prevWeek.value = `Week ${index}`;
  nextWeek.value = `Week ${index + 2}`;
};
onMounted(() => {
  onSwiperChange(0);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
