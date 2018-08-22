<template>
  <div class="collection">
    <div class="title">
      我的收藏
    </div>
    <div class="sublist">
      <div @click="goodsDetail(subitem.id)" v-for="(subitem, subindex) in collectlist" :key="subindex">
        <img :src="subitem.list_pic_url" alt="">
        <p>{{subitem.name}}</p>
        <p>￥{{subitem.retail_price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    getStorageOpenid
  } from '../../utils';
  export default {
    created() {},
    mounted() {
      this.openId = getStorageOpenid();
      this.getlist();
    },
    data() {
      return {
        openId: "",
        collectlist: []
      };
    },
    components: {},
    methods: {
      async getlist() {
        const data = await get('/collect/listAction', {
          openId: this.openId
        })
        this.collectlist = data.collectGoodsList;
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
