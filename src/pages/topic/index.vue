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
import { get } from "../../utils";
export default {
  onPullDownRefresh() {
    this.page = 1;
    this.getListData();
    console.log("end");
    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    console.log(1111);
    this.page = this.page + 1;
    this.getListData();
    //刷新完成后关闭
    // wx.stopPullDownRefresh();
  },
  created() {
    this.getListData();
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
      console.log("start");
      const data = await get("/topic/listaction", {
        page: this.page
      });
      this.topicList.concat(data.data);
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
