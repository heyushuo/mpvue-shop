const {
  mysql
} = require('../../mysql');

async function indexAction(ctx) {
  //ctx.query 获取get请求的参数对象的形式
  const {
    id: categoryId
  } = ctx.query;
  //获取所有的分类
  const data = await mysql("nideshop_category").where({
    "parent_id": 0
  }).select();
  const currentCategory = [];
  if (categoryId) {
    //获取分类里的子类
    currentCategory = await mysql("nideshop_category").where({
      "parent_id": categoryId
    }).select();
  }


  ctx.body = {
    "categoryList": data,
  }
}
//点击右侧分类时获取左侧对应的分类
async function currentAction(ctx) {
  const {
    id: categoryId
  } = ctx.query;
  const data = {};
  //获取分类里的子类
  const currentOne = await mysql("nideshop_category").where({
    "id": categoryId
  }).select();
  const subList = await mysql("nideshop_category").where({
    "parent_id": currentOne[0].id
  }).select();
  data.currentOne = currentOne[0];
  data.currentOne.subList = subList;
  ctx.body = {
    "data": data
  }
}


//获取分类列表
//1.需要头部导航包含的分类
//2.查找导航上分类对应的商品
async function categoryNav(ctx) {
  const categoryId = ctx.query.id;
  //获得当前分类
  const currentNav = await mysql("nideshop_category").where({
    "id": categoryId
  }).select();
  //获得他的同类
  const navData = await mysql("nideshop_category").where({
    "parent_id": currentNav[0].parent_id
  });

  ctx.body = {
    navData,
    currentNav: currentNav[0]
  }

}



module.exports = {
  indexAction,
  currentAction,
  categoryNav
}