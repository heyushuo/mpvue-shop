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
        <!-- 选择规格部分 -->
        <div class="pop">
            <div class="attr-pop">

            </div>
        </div>
        <!-- 选择规格部分 -->
    </div>
</template>

<script>
import { get } from "../../utils";
export default {
  created() {
    this.goodsDetail();
  },
  data() {
    return {
      gallery: [],
      info: {},
      brand: {}
    };
  },
  components: {},
  methods: {
    async goodsDetail() {
      const data = await get("/goods/detailAction", { id: 1006013 });
      this.gallery = data.gallery;
      this.info = data.info;
      this.brand = data.brand;
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>