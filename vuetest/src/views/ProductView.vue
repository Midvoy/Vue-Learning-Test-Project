<template>
<div class="product_view">
        
    <Header/>
    <Main/>
    <Foot/>
</div>

</template>


<script>
import Header from "../product_pages/Header.vue"
import Main from "../product_pages/Main.vue"
import Foot from "../product_pages/Foot.vue"
export default{
    components:{
        Header,
        Main,
        Foot
    }
}

</script>



<style>
.product_view{
    width: 100%;
    height: 100%;
}

</style>