<template>
    <div id="app">
      <header class="hacker-news-header">
        <a target="_blank" href="http://www.ycombinator.com/">
          <img src="https://news.ycombinator.com/y18.gif">
        </a>
        <span>Hacker News</span>
      </header>
  
      <div
        class="hacker-news-item"
        v-for="(item, $index) in list"
        :key="$index"
        :data-num="$index + 1">
        <a target="_blank" :href="item.url" v-text="item.title"></a>
        <p>
          <span v-text="item.points"></span>
          points by
          <a
            target="_blank"
            :href="`https://news.ycombinator.com/user?id=${item.author}`"
            v-text="item.author"></a>
          |
          <a
            target="_blank"
            :href="`https://news.ycombinator.com/item?id=${item.objectID}`"
            v-text="`${item.num_comments} comments`"></a>
        </p>
      </div>
  
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const api = '//hn.algolia.com/api/v1/search_by_date?tags=story';
  const page = ref(1);
  const list = ref([]);
  
  const infiniteHandler = async ($state) => {
    try {
      const { data } = await axios.get(api, {
        params: {
          page: page.value,
        },
      });
  
      if (data.hits.length) {
        page.value += 1;
        list.value.push(...data.hits);
        $state.loaded();
      } else {
        $state.complete();
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      $state.complete();
    }
  };
  </script>