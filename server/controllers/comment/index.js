const {
    mysql
} = require('../../mysql');
async function postAction(ctx) {
    const {
        openId,
        goodsId,
        content
    } = ctx.request.body
    const buffer = Buffer.from(content);
    const typeId = 0;
    const insertId = await mysql('nideshop_comment').insert({
        type_id: typeId,
        value_id: goodsId,
        content: buffer.toString('base64'),
        add_time: new Date().getTime(),
        user_id: openId
    });

    if (insertId) {
        ctx.body = {
            data: "success",
            message: "添加成功"
        }
    } else {
        ctx.body = {
            data: "success",
            message: "添加失败"
        }
    }



}
async function deleteCollect() {

}

module.exports = {
    postAction
}