const {
    mysql
} = require('../../mysql');

async function submitAction(ctx) {
    const {
        openId,
    } = ctx.request.body;
    let goodsId = ctx.request.body.goodsId;
    let allPrise = ctx.request.body.allPrise
    //是否存在在订单
    const isOrder = await mysql('nideshop_order').where({
        user_id: openId,
    }).select();
    // 存在
    // var nowgoodsid = "";
    if (isOrder.length > 0) {
        //现在的goodsId加上以前的
        // goodsId = isOrder[0].goods_id + ',' + goodsId;
        // allPrise = isOrder[0].allprise + allPrise
        const data = await mysql('nideshop_order').where({
            user_id: openId,
        }).update({
            user_id: openId,
            goods_id: goodsId,
            allprice: allPrise
        })
        if (data) {
            ctx.body = {
                data: true
            }
        } else {
            ctx.body = {
                data: false
            }
        }
    } else {
        const data = await mysql('nideshop_order').insert({
            user_id: openId,
            goods_id: goodsId,
            allprice: allPrise
        })
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


}
async function detailAction(ctx) {
    const openId = ctx.query.openId;
    const addressId = ctx.query.addressId || '';
    const orderDetail = await mysql('nideshop_order').where({
        user_id: openId,
    }).select();

    var goodsIds = orderDetail[0].goods_id.split(",");
    console.log(goodsIds);

    const list = await mysql('nideshop_cart').andWhere({
        user_id: openId
    }).whereIn('goods_id', goodsIds).select();

    //收货地址
    var addressList;
    if (addressId) {
        addressList = await mysql("nideshop_address")
            .where({
                user_id: openId,
                id: addressId
            }).orderBy('is_default', 'desc')
            .select();
    } else {
        addressList = await mysql("nideshop_address")
            .where({
                user_id: openId,
            }).orderBy('is_default', 'desc')
            .select();
    }


    ctx.body = {
        allPrise: orderDetail[0].allprice,
        goodsList: list,
        address: addressList[0] || {}
    }

}
async function listAction(ctx) {

}
module.exports = {
    submitAction,
    detailAction,
    listAction
}