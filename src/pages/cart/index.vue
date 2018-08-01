<template>
  <div>
    111
    <!-- <template> -->
    <div>
      <wxParse :content="artical" />
    </div>
    <!-- </template> -->
  </div>
</template>

<script>
import wxParse from "mpvue-wxparse";
export default {
  created() {},
  data() {
    return {
      artical: "<div>何玉硕</div>"
    };
  },
  components: {
    wxParse
  },
  methods: {},
  computed: {}
};
</script>
<style lang='scss' scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style";
</style>