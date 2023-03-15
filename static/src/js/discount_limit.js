odoo.define('.Pos',function(require){
'use strict';
const ProductScreen =require('point_of_sale.ProductScreen');
const Registries=require('point_of_sale.Registries');
var rpc=require('web.rpc');
var total_sum=0
const discount_limit = (ProductScreen)=>class extends ProductScreen{
async _onClickPay() {
//    console.log(this.env.pos)
    const discount=[]
    var category_values=0;
    var discount_value=this.env.pos.config.discount_limit
//    console.log(discount_value,"seetings disc")
    await rpc.query({
    model:'pos.config',
    method:'get_category',
    args:[]
    }).then(function(result){
        category_values=result
//        console.log(category_values,"settings cat")
    });

    console.log(this)
    $.each(this.env.pos.selectedOrder.orderlines,function(index,name){
//    console.log(name.price)
//    console.log(name.quantity)
        if(category_values.includes(name.product.pos_categ_id[0])){
            var total=name.price*name.quantity
//            console.log(total)
            discount.push(total*(name.discount/100))
//            console.log(discount)
        }
    })

    var sum=0
    discount.forEach(x=>{sum +=x;});
    total_sum +=sum
    console.log(total_sum,"total discount sum")
    if(total_sum>discount_value){
    total_sum -=sum
    this.showPopup('ErrorPopup',{
            title:"Warning",
            body:"Discount Limit Exceeded"
            });
    }
    else{
    super._onClickPay()
    }






}}

Registries.Component.extend(ProductScreen,discount_limit);
return ProductScreen;
});