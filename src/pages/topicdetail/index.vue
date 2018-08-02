<template>
  <div class="topicdetail">
    <div class="content">
      <div v-if="goods_desc" class="detail">
        <wxParse :content="goods_desc" />
      </div>
    </div>
    <div class="list">
      <p class="title">专题推荐</p>
      <div v-for="(item, index) in recommendList" :key="index" class="item">
        <img :src="item.scene_pic_url" alt="">
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils";
import wxParse from "mpvue-wxparse";
export default {
  created() {},
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.getListData();
  },
  data() {
    return {
      recommendList: [],
      id: "",
      goods_desc: ""
    };
  },
  components: {
    wxParse
  },
  methods: {
    async getListData() {
      const data = await get("/topic/detailaction", {
        id: this.id
      });
      this.goods_desc = data.data.content;
      this.recommendList = data.recommendList;
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style";
</style>
