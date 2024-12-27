<template>
  <div>
    <nav>
      <!-- 左侧菜单 -->
      <ul>
        <li v-for="(article, index) in articles" :key="index" @click="scrollToArticle(article)">
          {{ article.title }}
        </li>
      </ul>
    </nav>
    <div class="articles">
      <!-- 右侧文章内容 -->
      <div v-for="(article, index) in articles" :key="index" :ref="el => setRef(article.id, el)">
        <h2>{{ article.title }}</h2>
        <p>{{ article.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const articles = ref([
  // 假设的文章数据
  { id: "article1", title: "文章1", content: "文章1的内容..." },
  { id: "article2", title: "文章2", content: "文章2的内容..." }
  // ...
]);

const articleRefs = ref({});

const setRef = (id, el) => {
  if (el) {
    articleRefs.value[id] = el;
  }
};

const scrollToArticle = article => {
  const element = articleRefs.value[article.id];
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(() => {
  // 初始化时可以执行滚动到特定文章的逻辑
  // const initialArticle = ...;
  // scrollToArticle(initialArticle);
});
</script>

<style>
/* 样式略 */
</style>
