<template>
    <h3>广告招租</h3>
    <img :src="imgUrl">
</template>

<script>
export default{
    data() {
        return {
            imgUrl:require('../assets/Corn.jpg')
        }
    }
}

</script>

<style scoped>

h3{
    width:100%;
    height:100px;
    border:5px solid #999;
    text-align: center;
    line-height: 100px;
    box-sizing: border-box;
}
</style>