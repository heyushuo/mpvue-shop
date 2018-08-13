<template>
  <div class="search">
    <div class="head">
      <div>
        <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png" alt="">
        <input type="text" placeholder="商品搜索">
      </div>
      <div>取消</div>
    </div>
  </div>
</template>

<script>
  import {
    get
  } from "../../utils";
  export default {

    created() {
      this.getListData(true);
    },
    data() {
      return {
        topicList: [],
        page: 1,
        total: ""
      };
    },
    components: {},
    methods: {
      async getListData(first) {

      },
      topicDetail(id) {
        wx.navigateTo({
          url: "/pages/topicdetail/main?id=" + id
        });
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
