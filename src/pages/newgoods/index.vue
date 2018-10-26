<template>
  <div class="newgoods">
    <div class="banner">
      <img src="http://yanxuan.nosdn.127.net/8976116db321744084774643a933c5ce.png" alt="">
    </div>
    <div class="sortnav">
      <div @click="changeTab(0)" :class="[0==nowIndex ?'active':'']">综合</div>
      <div @click="changeTab(1)" class="price" :class="[1==nowIndex ?'active':'', order =='desc'? 'desc':'asc']">价格</div>
      <div @click="changeTab(2)" :class="[2==nowIndex ?'active':'']">分类</div>
    </div>
    <div class="sortlist">
      <div @click="goodsDetail(item.id)" v-for="(item, index) in listData" :key="index" class="item">
        <img :src="item.list_pic_url" alt="">
        <p class="name">{{item.name}}</p>
        <p class="price">￥{{item.retail_price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils";
export default {
  created() { },
  mounted() {
    if (this.$root.$mp.query.isHot) {
      this.isHot = this.$root.$mp.query.isHot;
    }
    if (this.$root.$mp.query.isNew) {
      this.isNew = this.$root.$mp.query.isNew;
    }
    this.getlistData();
  },
  data() {
    return {
      order: "",
      isHot: "",
      isNew: "",
      nowIndex: 0,
      navData: ["综合", "价格", "分类"],
      listData: []
    };
  },
  components: {},
  methods: {
    async getlistData() {
      const data = await get("/goods/goodsList", { isHot: this.isHot, isNew: this.isNew, order: this.order });
      this.listData = data.data;
    },
    changeTab(index) {
      this.nowIndex = index;
      if (index == 1) {
        this.order = this.order == "asc" ? "desc" : "asc";
      } else {
        this.order = "";
      }
      this.getlistData();
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>