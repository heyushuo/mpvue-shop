<template>
  <div class="topic">
    <ul class="list">
      <li v-for="(item, index) in topicList" :key="index">
        <div class="t-img">
          <img :src="item.scene_pic_url" alt="">
        </div>
        <div class="info">
          <p>{{item.title}}</p>
          <p>{{item.subtitle}}</p>
          <p>{{item.price_info}}元起</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    get
  } from '../../utils';
  export default {
    created() {
      this.getListData()
    },
    data() {
      return {
        topicList: [],
        page: 1
      };
    },
    components: {},
    methods: {
      async getListData() {
        const data = await get('/topic/listaction', {
          page: this.page
        });
        this.topicList = data.data;
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
