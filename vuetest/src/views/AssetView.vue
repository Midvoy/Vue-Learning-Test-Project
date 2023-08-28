<template>
    <div id="productpage">
        <div id="grain" class="product-card">
            <el-row :gutter="10">
                <el-col :span="21" :offset="2">
                <div>
                    <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                        <span>谷物</span>
                        </div>
                    </template>
                    <div>
                        <el-table :data="grainList" style="width: 100%">
                            <el-table-column prop="photo" label="图片" />
                            <el-table-column prop="name" label="名称" />
                            <el-table-column prop="quality" label="品质" />
                            <el-table-column prop="detail" label="商品详情" />
                            <el-table-column prop="stock" label="库存"/>
                            <el-table-column prop="price" label="上架量"/>
                            <el-table-column prop="percent" label="折扣"/>
                            <el-table-column fixed="right" label="操作">
                                <template #default="{ row }">
                                    <el-button fixed="right" type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
                                    <el-button fixed="right" type="primary" size="small" @click="handleSale(row)">销售</el-button>
                                    <el-button fixed="right" type="primary" size="small" @click="handleDiscount(row)">优惠</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    </el-card>
                </div>
                </el-col>
            </el-row>
        </div>
        <h3>蔬菜</h3>
        <h3>水果</h3>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { getProductListAPI } from "@/apis/product.js";

const grainList=reactive([]);

onMounted(async()=>{
    try{
        await getProductListAPI().then(function (res) {
            const data = res.data;
            console.log(data)
            for(const item of data){
                //if(item.crop_Type=="谷物"){
                    grainList.push(item)
                //}else if(item.crop_Type=="蔬菜"){

                //}else if(item.crop_Type=="水果"){

                //}
            }

        });

    }catch (error) {
        console.error(error);
    }
})

</script>

<style>
#productpage {
  margin-left: 5%;
}
</style>