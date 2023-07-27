<template>
    <div class="main">
        <h3>这是商品</h3>
        <p>谷物</p>
        <Product/>
        <p>蔬菜</p>
        <Product/>
        <p>水果</p>
        <Product/>
    </div>
</template>

<script>
import  Product  from "./Product.vue"
export default{
    components:{
        Product,
    }
}

</script>

<style scoped>
.main{
    width: 100%;
    text-align: center;
    border: 5px solid #999;
    box-sizing: border-box;
}

</style>