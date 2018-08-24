const {
  mysql
} = require('../../mysql');
async function addCart(ctx) {
  const {
    number,
    goodsId,
    openId
  } = ctx.request.body


  //判断购物车是否包含此数据
  const haveGoods = await mysql("nideshop_cart").where({
    "user_id": openId,
    "goods_id": goodsId
  }).select()


  if (haveGoods.length == 0) {
    // const {
    //   retail_price,
    //   name,
    //   list_pic_url
    // } = await mysql("nideshop_goods").where({
    //   "id": goodsId
    // }).select()[0];
    const goods = await mysql("nideshop_goods").where({
      "id": goodsId
    }).select();
    const {
      retail_price,
      name,
      list_pic_url
    } = goods[0];
    //如果不存在
    await mysql('nideshop_cart').insert({
      "user_id": openId,
      "goods_id": goodsId,
      number,
      "goods_name": name,
      list_pic_url,
      retail_price
    })
  } else {
    //如果存在
    const oldNumber = await mysql("nideshop_cart").where({
      "user_id": openId,
      "goods_id": goodsId
    }).column('number').select();
    console.log(oldNumber)
    //跟新数据
    await mysql("nideshop_cart").where({
      "user_id": openId,
      "goods_id": goodsId
    }).update({
      "number": oldNumber[0].number + number
    });
  }
  ctx.body = {
    data: "success"
  }
}
async function cartList(ctx) {

  const {
    openId
  } = ctx.query;

  const cartList = await mysql("nideshop_cart").where({
    "user_id": openId,
  }).select();

  ctx.body = {
    data: cartList
  }

}


async function deleteAction(ctx) {

  const id = ctx.query.id;

  const data = await mysql("nideshop_cart").where({
    "id": id,
  }).del();

  if (data) {
    ctx.body = {
      data: true
    }
  } else {
    ctx.body = {
      data: false
    }
  }
}

module.exports = {
  addCart,
  cartList,
  deleteAction
}