<template>
    <el-dialog :model-value="true" title="详情" @close="handleClose">
      <p>
        <label for="photo">图片：</label>
        <span id="photo"> {{ productInfo.photo }} </span>
      </p>
      <p>
        <label for="name">名称：</label>
        <span id="name"> {{ productInfo.name }} </span>
      </p>
      <p>
        <label for="quality">品质：</label>
        <span id="quality"> {{ productInfo.quality }} </span>
      </p>
      <p>
        <label for="details">商品详情：</label>
        <span id="details"> {{ productInfo.details }} </span>
      </p>
      <p>
        <label for="inventory">库存：</label>
        <span id="inventory"> {{ productInfo.inventory }} </span>
      </p>
      <p>
        <label for="stock">上架量：</label>
        <span id="stock"> {{ productInfo.stock }} </span>
      </p>
    </el-dialog>
  </template>
  
  <script>
  import { computed, toRefs } from "vue";
  export default {
    props: {
      rowInfo: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    emit: ["closeDetail"],
    setup(props, { emit }) {
      const data = {
        productInfo: computed(() => props.rowInfo).value,
      };
      const method = {
        handleClose() {
          emit("closeDetail");
        },
      };
      return { ...toRefs(data), ...method };
    },
  };
  </script>
  
  <style lang="less" scoped>
  </style>
  