<template>
  <div class="category">
    <div class="search">
      <div class="ser">
        <span class="icon"></span>
        <span>商品搜索,共239款好物</span>
      </div>

    </div>
    <div class="content">
      <scroll-view class="left" scroll-y="true">
        <div class="iconText" v-for="(item, index) in listData" :key="index">
          {{item}}
        </div>
      </scroll-view>
      <scroll-view class="right">
      </scroll-view>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      listData: ["居家", "居家", "居家", "居家", "居家", "居家", "居家", "居家", "居家", "居家", "居家", "居家", "居家"]
    };
  },
  components: {},
  methods: {},
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>