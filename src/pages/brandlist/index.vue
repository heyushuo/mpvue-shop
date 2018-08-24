<template>
  <div class="brand">
    <div @click="branddetail(item.id)" v-for="(item, index) in listData" :key="index" class="list">
      <img :src="item.app_list_pic_url" alt="">
      <div class="info">
        <span>{{item.name}}</span>
        <span>|</span>
        <span>{{item.floor_price}}元起</span>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils";
export default {
  onPullDownRefresh() {
    this.page = 1;
    this.getData(true);
    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.total) {
      return false;
    }
    this.getData();
  },
  created() {},
  mounted() {
    this.getData(true);
  },
  data() {
    return {
      listData: [],
      page: 1,
      total: ""
    };
  },
  components: {},
  methods: {
    async getData(first) {
      const data = await get("/brand/listaction", { page: this.page });
      this.total = data.total;
      if (first) {
        this.listData = data.data;
      } else {
        this.listData = this.listData.concat(data.data);
      }
    },
    branddetail(id) {
      wx.navigateTo({ url: "/pages/branddetail/main?id=" + id });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>