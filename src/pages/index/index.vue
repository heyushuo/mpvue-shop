<template>
  <div class="index">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.image_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="channel">
      <div v-for="(item, index) in channel" :key="index">
        <img :src="item.icon_url" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="brand">
      <div class="head">
        品牌制造商直供
      </div>
      <div class="content">
        <div v-for="(item, index) in brandList" :key="index">
          <div>
            <p>{{item.name}}</p>
            <p>{{item.floor_price}}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="">
        </div>
      </div>
    </div>
    <div class="newgoods">
      <div class="top">
        <p>新品首发</p>
        <p>查看全部</p>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item, index) in newGoods" :key="index">
            <img :src="item.primary_pic_url" alt="">
            <p>{{item.name}}</p>
            <p>{{item.goods_brief}}</p>
            <p>{{item.retail_price}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils";
export default {
  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: []
    };
  },
  components: {},
  methods: {
    async getData() {
      var data = await get("/index/index");
      this.banner = data.banner;
      this.channel = data.channel;
      this.brandList = data.brandList;
      this.newGoods = data.newGoods;
    }
  },
  created() {
    // 调用应用实例的方法获取全局数据
    this.getData();
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>