<template>
  <div class="goods">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.img_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>
    <div class="goods-info">
      <div class="c">
        <p>{{info.name}}</p>
        <p>{{info.goods_brief}}</p>
        <p>￥{{info.retail_price}}</p>
        <div class="brand" v-if="brand.name">
          <p>{{brand.name}}</p>
        </div>
      </div>
    </div>
    <div class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div>

    <div class="attribute">
      <div class="head">
        商品参数
      </div>
      <div v-for="(item,index) in attribute" :key="index" class="item">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <!-- <div> -->
    <template>
      <!-- <div class="detail" v-html="article"> -->
      <wxParse :content="article" @preview="preview" @navigate="navigate" />
      <!-- </div> -->
    </template>
    <!-- </div> -->

    <!-- 选择规格部分 -->
    <!-- <div class="pop" @click="heyuhsuo">
      <div class="attr-pop" :class="[showpop ? fadeup : fadedown]">

      </div>
    </div> -->
    <!-- 选择规格部分 -->
  </div>
</template>

<script>
import { get } from "../../utils";
import wxParse from "mpvue-wxparse";
export default {
  created() {
    this.goodsDetail();
  },
  data() {
    return {
      showpop: false,
      gallery: [],
      info: {},
      brand: {},
      attribute: [],
      article: "<div>我是HTML代码</div>"
    };
  },
  components: {
    wxParse
  },
  methods: {
    async goodsDetail() {
      const data = await get("/goods/detailaction", {
        id: 1006013
      });
      this.gallery = data.gallery;
      this.info = data.info;
      this.brand = data.brand;
      this.attribute = data.attribute;
    },
    heyuhsuo() {
      this.showpop = !this.showpop;
      console.log(this.showpop);
    },
    preview(src, e) {
      // do something
    },
    navigate(href, e) {
      // do something
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style.scss";
</style>
