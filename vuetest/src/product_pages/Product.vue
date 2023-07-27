<template>
    <div class="box">
      <el-button class="new_btn" type="primary" @click="handleNew">新增</el-button>
      <el-table :data="productInfo" border style="width: 100%">
        <el-table-column prop="photo" label="图片" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="quality" label="品质" />
        <el-table-column prop="details" label="商品详情" />
        <el-table-column prop="inventory" label="库存"/>
        <el-table-column prop="stock" label="上架量"/>
        <el-table-column fixed="right" label="操作">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="handleDetail(row)">查看</el-button>
            <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDel(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新建/编辑弹框 -->
      <Dialog
        v-if="dialogShow"
        v-model:dialogShow="dialogShow"
        :rowInfo="rowInfo"
        :title="title"
        :arrayNum="productInfo.length"
        @addRow="addRow"
        @editRow="editRow"
      />
      <!-- 详情弹窗 -->
      <Detail v-if="detailShow" :rowInfo="rowInfo" @closeDetail="closeDetail" />
    </div>
  </template>
  
  <script>
  import { reactive, ref, toRefs } from "vue";
  import { ElMessageBox } from "element-plus";
  import Dialog from "./dialog.vue";
  import Detail from "./detail.vue";
  
  export default {
    components: { 
        Dialog,
        Detail 
    },
    setup() {
      const data = reactive({
        dialogShow: false, // 新增/编辑弹框
        detailShow: false, // 详情弹窗
        rowInfo: {}, // 新增/编辑的数据
        title: "", // 是新建还是修改
        productInfo: [
          {
            id: 1,
            photo:"1",
            name: "小麦",
            quality: "特级",
            details: "",
            inventory:3+'kg',
            stock:2+'kg'
          },
          {
            id: 2,
            photo:"2",
            name: "玉米",
            quality: "一级",
            details: "",
            inventory:13+'kg',
            stock:13+'kg'
          },
        ],
      });
      const method = reactive({
        handleNew() {
          data.title = "新增";
          data.rowInfo = {};
          data.dialogShow = true;
        },
        handleDetail(val) {
          data.detailShow = true;
          data.rowInfo = val;
        },
        handleEdit(val) {
          data.title = "修改";
          data.dialogShow = true;
          data.rowInfo = val;
        },
        handleDel(val) {
          ElMessageBox.confirm("你确定删除这个商品的信息吗?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              method.handleSure(val);
            })
            .catch(() => {
              // catch error
            });
        },
        handleSure(val) {
          this.dialogVisible = false;
          const index = data.productInfo.findIndex((item) => item.id === val.id);
          data.productInfo.splice(index, 1);
        },
        // 添加行
        addRow(val) {
          data.productInfo.push(val);
        },
        // 编辑行
        editRow(val) {
          let index = data.productInfo.findIndex(
            (item, index) => item.id === val.id
          );
          data.productInfo.splice(index, 1, val);
        },
        // 关闭详情弹窗
        closeDetail() {
          data.detailShow = false;
        },
      });
      return { ...toRefs(data), ...method };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .box {
    padding: 20px;
    margin: 50px;
    .new_btn {
      margin-bottom: 10px;
    }
    ::v-deep .el-table__cell {
      text-align: center;
    }
  }
  </style>
  