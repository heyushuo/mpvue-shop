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
        <div v-if="brand.name" class="brand">
          <p>{{brand.name}}</p>
        </div>
      </div>
    </div>
    <div class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div>

    <div v-if="attribute.length!=0" class="attribute">
      <div class="head">
        商品参数
      </div>
      <div v-for="(item,index) in attribute" :key="index" class="item">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <div v-if="goods_desc" class="detail">
      <wxParse :content="goods_desc" />
    </div>

    <!-- 选择规格部分 -->
    <!-- <div class="pop" @click="heyuhsuo">
      <div class="attr-pop" :class="[showpop ? fadeup : fadedown]">

      </div>
    </div> -->
    <!-- 选择规格部分 -->
  </div>
</template>

<script>
  import {
    get
  } from "../../utils";
  import wxParse from "mpvue-wxparse";
  export default {
    created() {

    },
    mounted() {
      this.id = this.$root.$mp.query.id;
      this.goodsDetail();
      console.log(this.id)
    },
    data() {
      return {
        showpop: false,
        gallery: [],
        info: {},
        brand: {},
        attribute: [],
        goods_desc: "",
        id: ""
      };
    },
    components: {
      wxParse
    },
    methods: {
      async goodsDetail() {
        const data = await get("/goods/detailaction", {
          id: this.id
        });
        this.gallery = data.gallery;
        this.info = data.info;
        this.brand = data.brand;
        this.attribute = data.attribute;
        this.goods_desc = data.info.goods_desc
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
