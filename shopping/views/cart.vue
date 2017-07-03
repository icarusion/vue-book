<template>
    <div class="cart">
        <div class="cart-header">
            <div class="cart-header-title">购物清单</div>
            <div class="cart-header-main">
                <div class="cart-info">商品信息</div>
                <div class="cart-price">单价</div>
                <div class="cart-count">数量</div>
                <div class="cart-cost">小计</div>
                <div class="cart-delete">删除</div>
            </div>
        </div>
        <div class="cart-content">
            <div class="cart-content-main" v-for="(item, index) in cartList">
                <div class="cart-info">
                    <img :src="productDictList[item.id].image">
                    <span>{{ productDictList[item.id].name }}</span>
                </div>
                <div class="cart-price">¥ {{ productDictList[item.id].cost }}</div>
                <div class="cart-count">
                    <span class="cart-control-minus" @click="handleCount(index, -1)">-</span>
                    {{ item.count }}
                    <span class="cart-control-add" @click="handleCount(index, 1)">+</span>
                </div>
                <div class="cart-cost">¥ {{ productDictList[item.id].cost * item.count }}</div>
                <div class="cart-delete">
                    <span class="cart-control-delete" @click="handleDelete(index)">删除</span>
                </div>
            </div>
            <div class="cart-empty" v-if="!cartList.length">购物车为空</div>
        </div>
        <div class="cart-promotion" v-show="cartList.length">
            <span>使用优惠码：</span>
            <input type="text" v-model="promotionCode">
            <span class="cart-control-promotion" @click="handleCheckCode">验证</span>
        </div>
        <div class="cart-footer" v-show="cartList.length">
            <div class="cart-footer-desc">
                共计 <span>{{ countAll }}</span> 件商品
            </div>
            <div class="cart-footer-desc">
                应付总额 <span>¥ {{ costAll - promotion }}</span>
                <br>
                <template v-if="promotion">
                    （优惠 <span>¥ {{ promotion }}</span>）
                </template>
            </div>
            <div class="cart-footer-desc">
                <div class="cart-control-order" @click="handleOrder">现在结算</div>
            </div>
        </div>
    </div>
</template>
<script>
    import product_data from '../product.js';
    export default {
        computed: {
            cartList () {
                return this.$store.state.cartList;
            },
            productDictList () {
                const dict = {};
                this.productList.forEach(item => {
                    dict[item.id] = item;
                });
                return dict;
            },
            countAll () {
                let count = 0;
                this.cartList.forEach(item => {
                    count += item.count;
                });
                return count;
            },
            costAll () {
                let cost = 0;
                this.cartList.forEach(item => {
                    cost += this.productDictList[item.id].cost * item.count;
                });
                return cost;
            }
        },
        data () {
            return {
                productList: product_data,
                promotionCode: '',
                promotion: 0
            }
        },
        methods: {
            handleCount (index, count) {
                if (count < 0 && this.cartList[index].count === 1) return;
                this.$store.commit('editCartCount', {
                    id: this.cartList[index].id,
                    count: count
                });
            },
            handleDelete (index) {
                this.$store.commit('deleteCart', this.cartList[index].id);
            },
            handleCheckCode () {
                if (this.promotionCode === '') {
                    window.alert('请输入优惠码');
                    return;
                }
                if (this.promotionCode !== 'Vue.js') {
                    window.alert('优惠码验证失败');
                } else {
                    this.promotion = 500;
                }
            },
            handleOrder () {
                this.$store.dispatch('buy').then(() => {
                    window.alert('购买成功');
                })
            }
        }
    }
</script>
<style scoped>
    .cart{
        margin: 32px;
        background: #fff;
        border: 1px solid #dddee1;
        border-radius: 10px;
    }
    .cart-header-title{
        padding: 16px 32px;
        border-bottom: 1px solid #dddee1;
        border-radius: 10px 10px 0 0;
        background: #f8f8f9;
    }
    .cart-header-main{
        padding: 8px 32px;
        overflow: hidden;
        border-bottom: 1px solid #dddee1;
        background: #eee;
        overflow: hidden;
    }
    .cart-empty{
        text-align: center;
        padding: 32px;
    }
    .cart-header-main div{
        text-align: center;
        float: left;
        font-size: 14px;
    }
    div.cart-info{
        width: 60%;
        text-align: left;
    }
    .cart-price{
        width: 10%;
    }
    .cart-count{
        width: 10%;
    }
    .cart-cost{
        width: 10%;
    }
    .cart-delete {
        width: 10%;
    }
    .cart-content-main{
        padding: 0 32px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-bottom: 1px dashed #e9eaec;
        overflow: hidden;
    }
    .cart-content-main div{
        float: left;
    }
    .cart-content-main img{
        width: 40px;
        height: 40px;
        position: relative;
        top: 10px;
    }
    .cart-control-minus,
    .cart-control-add{
        display: inline-block;
        margin: 0 4px;
        width: 24px;
        height: 24px;
        line-height: 22px;
        text-align: center;
        background: #f8f8f9;
        border-radius: 50%;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        cursor: pointer;
    }
    .cart-control-delete{
        cursor: pointer;
        color: #2d8cf0;
    }
    .cart-promotion{
        padding: 16px 32px;
    }
    .cart-control-promotion,
    .cart-control-order{
        display: inline-block;
        padding: 8px 32px;
        border-radius: 6px;
        background: #2d8cf0;
        color: #fff;
        cursor: pointer;
    }
    .cart-control-promotion{
        padding: 2px 6px;
        font-size: 12px;
        border-radius: 3px;
    }
    .cart-footer{
        padding: 32px;
        text-align: right;
    }
    .cart-footer-desc{
        display: inline-block;
        padding: 0 16px;
    }
    .cart-footer-desc span{
        color: #f2352e;
        font-size: 20px;
    }
</style>