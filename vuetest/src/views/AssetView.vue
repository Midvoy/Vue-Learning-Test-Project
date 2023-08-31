<template>
    <div id="productpage">
        <h1>谷物</h1>
        <div id="grain" class="product-card">
            <el-row :gutter="10">
                <el-col :span="21" :offset="2">
                <div>
                    <el-card class="box-card">
                    <div>
                        <el-table :data="grainList" style="width: 100%">
                            <el-table-column prop="photo" label="图片" />
                            <el-table-column prop="name" label="名称" />
                            <el-table-column prop="quality" label="品质" />
                            <el-table-column prop="detail" label="商品详情" />
                            <el-table-column prop="stock" label="上架量"/>
                            <el-table-column prop="price" label="单价"/>
                            <el-table-column prop="percent" label="折扣"/>
                            <el-table-column fixed="right" label="操作">
                                <template #default="{ row }">
                                    <el-button type="primary" size="small" @click="editVisible=true;handleEdit(row)">编辑</el-button>
                                    <el-button type="primary" size="small" @click="saleVisible=true;handleSale(row)">销量</el-button>
                                    <el-button type="primary" size="small" @click="discountVisible=true;handleDiscount(row)">优惠</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    </el-card>
                </div>
                </el-col>
            </el-row>
        </div>
        <h1>蔬菜</h1>
        <div id="vegetable" class="product-card">
            <el-row :gutter="10">
                <el-col :span="21" :offset="2">
                <div>
                    <el-card class="box-card">
                    <div>
                        <el-table :data="vegetableList" style="width: 100%">
                            <el-table-column prop="photo" label="图片" />
                            <el-table-column prop="name" label="名称" />
                            <el-table-column prop="quality" label="品质" />
                            <el-table-column prop="detail" label="商品详情" />
                            <el-table-column prop="stock" label="上架量"/>
                            <el-table-column prop="price" label="单价"/>
                            <el-table-column prop="percent" label="折扣"/>
                            <el-table-column fixed="right" label="操作">
                                <template #default="{ row }">
                                    <el-button type="primary" size="small" @click="editVisible=true;handleEdit(row)">编辑</el-button>
                                    <el-button type="primary" size="small" @click="saleVisible=true;handleSale(row)">销量</el-button>
                                    <el-button type="primary" size="small" @click="discountVisible=true;handleDiscount(row)">优惠</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    </el-card>
                </div>
                </el-col>
            </el-row>
        </div>
        <h1>水果</h1>
        <div id="fruit" class="product-card">
            <el-row :gutter="10">
                <el-col :span="21" :offset="2">
                <div>
                    <el-card class="box-card">
                    
                    <div>
                        <el-table :data="fruitList" style="width: 100%">
                            <el-table-column prop="photo" label="图片" >
                                <!-- <el-image :src="soilinfo.photo" :fit="'contain'">
                                    <template #error>
                                    <div class="image-slot">
                                        <el-icon><icon-picture /></el-icon>
                                    </div>
                                    </template>
                                </el-image> -->
                            </el-table-column>
                            <el-table-column prop="name" label="名称" />
                            <el-table-column prop="quality" label="品质" />
                            <el-table-column prop="detail" label="商品详情" />
                            <el-table-column prop="stock" label="上架量"/>
                            <el-table-column prop="price" label="单价"/>
                            <el-table-column prop="percent" label="折扣"/>
                            <el-table-column fixed="right" label="操作">
                                <template #default="{ row }">
                                    <el-button type="primary" size="small" @click="editVisible=true;handleEdit(row)">编辑</el-button>
                                    <el-button type="primary" size="small" @click="saleVisible=true;handleSale(row)">销量</el-button>
                                    <el-button type="primary" size="small" @click="discountVisible=true;handleDiscount(row)">优惠</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    </el-card>
                </div>
                </el-col>
            </el-row>
        </div>
    </div>

    <!--编辑商品对话框-->
    <el-scrollbar>
        <el-dialog
            v-model="editVisible"
            title="修改商品信息"
            width="30%"
            center
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <el-form :model="singleProductInfo">
                <el-form-item
                label="图片"
                :label-width="productLabelWidth"
                class="left-aligned-label"
                >
                    <!-- <el-upload
                        ref="upload"
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false"
                        :http-request="httpRequestFn"
                        :on-exceed="handleExceed"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload> -->
                </el-form-item>

                <el-form-item
                label="详情"
                :label-width="productLabelWidth"
                class="left-aligned-label"
                >
                <el-input v-model="singleProductInfo.detail" autocomplete="off" />
                </el-form-item>
                
                <el-form-item
                label="单价"
                :label-width="productLabelWidth"
                class="left-aligned-label"
                >
                <el-input v-model="singleProductInfo.price" autocomplete="off" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                <el-button
                    @click="
                    editVisible = false;
                    singleProductInfo.detail = '';
                    singleProductInfo.price = '';
                    imageUrl = '';
                    "
                    >取消</el-button
                >
                <el-button type="primary" @click="changeProductInfo(imageUrl)">
                    确认
                </el-button>
                </span>
            </template>
        </el-dialog>
    </el-scrollbar>

    <!--编辑销量对话框-->
    <el-scrollbar>
        <el-dialog v-model="saleVisible" title="销售记录" >  
            <el-select
                @change="selectTimeChanged"
                v-model="selecttimespan"
                placeholder="选择时间范围"
                style="width: 100%"
            >
                <el-option label="最近一年" value="最近一年" />
                <el-option label="最近半年" value="最近半年" />
                <el-option label="最近1季度" value="最近1季度" />
                <el-option label="最近一个月" value="最近一个月" />
            </el-select>
            <el-table :data="billHistory">
            <el-table-column property="sub_Bill_Id" label="订单号"/>
            <el-table-column property="bill_Date" label="订单日期"/>
            <el-table-column property="product_Num" label="销售量"/>
            </el-table>
            <h3>销售总量：{{ singlesaleSum }} kg</h3>
        </el-dialog>
    </el-scrollbar>

    <!--编辑优惠对话框-->
    <el-scrollbar>
        <el-dialog v-model="discountVisible" title="优惠">
            <div>
                当前折扣：{{ promotionPercent }}
                <el-button class="button" text @click="addPromotionVisible=true" v-if="promotionFlag == false">
                    +添加折扣
                </el-button>
                <el-button class="button" text @click="endPromotion" v-else>
                    -终止折扣
                </el-button>
            </div>
            <el-table :data="promotionHistory">
            <el-table-column property="start_Date" label="开始时间"/>
            <el-table-column property="end_Date" label="结束时间"/>
            <el-table-column property="percent" label="折扣"/>
            <el-table-column property="name" label="负责人"/>
            </el-table>
        </el-dialog>
    </el-scrollbar>

    <!--编辑添加折扣对话框-->
    <el-scrollbar>
        <el-dialog v-model="addPromotionVisible" title="添加折扣">
            <el-input
                v-model="singleProductInfo.percent"
                autocomplete="off"
                placeholder="例如需要打7折：0.7"
            />
            <el-button class="button" text @click="addPromotion" >
                确定
            </el-button>
        </el-dialog>
    </el-scrollbar>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { 
    getPageInfoAPI,
    getPromotionHistoryAPI,
    getBillHistoryAPI,
    putProductModifyAPI,
    getSaleSumAPI,
    getPromotionNowAPI,
    postPromotionCreateAPI,
    putEndPromotionAPI,
} from "@/apis/product.js";
//弹窗显示变量
const editVisible = ref(false);
const saleVisible = ref(false);
const discountVisible = ref(false);
const addPromotionVisible= ref(false);

//弹窗信息变量
const singleProductInfo = reactive({
    product_Id: null,
    name: null,
    quality: null,
    detail: null,
    percent: null,
    stock: null,
    price: null,
    type: null,
    photo:null,
});
//弹窗固定变量
const productLabelWidth = "80px";

//数据表
const grainList=reactive([]);
const vegetableList=reactive([]);
const fruitList=reactive([]);
//处理照片上传
const imageUrl = ref("");
// 导入 cos 模块
const COS = require("cos-js-sdk-v5");
var cos = new COS({
    SecretId: "AKID46yc3GKBoJarz3DJNH4e9QU6XotlNkts",
    SecretKey: "qRp4ADD0qcEfwGVinrkS6hElIj6d7PUL",
});

// 自定义上传函数
// http-request属性的回调函数有一个默认的参数,content 是一个对象,这个形参不用传实参
const httpRequestFn = (res) => {
  cos.putObject(
    {
      Bucket: "dyc-1319697249", // 存储桶
      Region: "ap-shanghai", // 存储桶所在地域
      Key: res.file.name, // 文件名
      StorageClass: "STANDARD", // 上传模式
      Body: res.file, // 上传文件对象
      onProgress: (progressData) => {
        // 进度条
        console.log(JSON.stringify(progressData));
      },
    },
    (err, data) => {
      console.log(err || data);
      if (data) {
        // 上传成功
        imageUrl.value = `http://${data.Location}`;
        console.log(imageUrl.value);
      }
    }
  );
};
//一次仅允许上传一张
const upload = ref(null);

const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = Date.now();
  upload.value.handleStart(file);
};

//修改商品信息
const handleEdit=(val)=>{
    singleProductInfo.detail=val.detail
    singleProductInfo.price=val.price
    singleProductInfo.product_Id=val.product_Id
    singleProductInfo.type=val.type
}
//点击确认后修改商品信息
const changeProductInfo = async (photo) => {
    if (
        singleProductInfo.price === "" //||
        //photo === ""
    ) {
        ElMessage.error("商品信息不完整");
        return;
    }
    editVisible.value = false;
    //网页数据修改
    if(singleProductInfo.type=="谷物"){
        for(const item of grainList){
            if(item.product_Id==singleProductInfo.product_Id){
                item.detail=singleProductInfo.detail
                item.price=singleProductInfo.price
                break;
            }
        }
    }else if(singleProductInfo.type=="蔬菜"){
        for(const item of vegetableList){
            if(item.product_Id==singleProductInfo.product_Id){
                item.detail=singleProductInfo.detail
                item.price=singleProductInfo.price
                break;
            }
        }
    }else if(singleProductInfo.type=="水果"){
        for(const item of fruitList){
            if(item.product_Id==singleProductInfo.product_Id){
                item.detail=singleProductInfo.detail
                item.price=singleProductInfo.price
                break;
            }
        }
    }
    //接口数据修改
    try {
        // let params = {
        //     field_id: fieldinfo.id,
        //     name: fieldinfo.location,
        //     soil_type: soilinfo.类型,
        //     ph_level: soilinfo.pH值,
        //     //photo: photo,
        // };
        // putProductModifyAPI(params).then(function (res) {
        //     const data = res.data;
        //     console.log(data);
        // });
    } catch (error) {
        console.error(error);
    }
}
//销量
const billHistory=ref([]);
const singlesaleSum=ref(0);
const singletimespan=ref(0);
const selecttimespan=ref("最近一年");
const handleSale=async(val)=>{
    singleProductInfo.product_Id=val.product_Id
    try{
        let params = {
            product_id: val.product_Id, 
            timespan:singletimespan.value
        };
        await getBillHistoryAPI(params).then(function (res) {
            billHistory.value = res.data;
        }).catch((error) => {
            console.error("查询请求失败:", error);
        });
        await getSaleSumAPI(params).then(function (res) {
            const data = res.data;
            singlesaleSum.value=data[0].saleSum
        }).catch((error) => {
            console.error("查询请求失败:", error);
        });
    }catch (error) {
        console.error(error);
    }
}
const selectTimeChanged=async(val)=>{
    if(val=="最近一年"){
        singletimespan.value=3
    }else if(val=="最近半年"){
        singletimespan.value=2
    }else if(val=="最近1季度"){
        singletimespan.value=1
    }else if(val=="最近一个月"){
        singletimespan.value=0
    }
    console.log(singletimespan.value)
    try{
        let params = {
            product_id: singletimespan.product_Id, 
            timespan:singletimespan.value
        };
        await getBillHistoryAPI(params).then(function (res) {
            billHistory.value = res.data;
            console.log(billHistory.value)
        }).catch((error) => {
            console.error("查询请求失败:", error);
        });
    }catch (error) {
        console.error(error);
    }

}

//折扣
const promotionHistory=ref([]);
const promotionNow=ref(0)
const promotionFlag=ref(false)
const promotionPercent=ref("")
const updateDiscount=async()=>{
    try{
        let params = {
            product_id: singleProductInfo.product_Id,   
        };
        await getPromotionHistoryAPI(params).then(function (res) {
            promotionHistory.value = res.data;
        }).catch((error) => {
            console.error("查询请求失败:", error);
        });
        await getPromotionNowAPI(params).then(function (res) {
            promotionNow.value = res.data;
        }).catch((error) => {
            console.error("查询请求失败:", error);
        });
        if(promotionNow.value==0){//折扣为无
            promotionFlag.value=false
            promotionPercent.value="无"
        }else{//有折扣
            promotionFlag.value=true
            promotionPercent.value=promotionNow.value*100+"%"
        }
        console.log(promotionPercent.value)

    }catch (error) {
        console.error(error);
    }
}
const handleDiscount=(val)=>{
    singleProductInfo.product_Id=val.product_Id
    singleProductInfo.percent=val.percent
    updateDiscount()
}

//添加折扣
const addPromotion=async()=>{
    if (
        isNaN(singleProductInfo.percent)||
        singleProductInfo.percent<=0||
        singleProductInfo.percent>=1
    ) {
        ElMessage.error("折扣不规范");
        return;
    }
    addPromotionVisible.value=false
    promotionFlag.value=true
    // try{
    //     let params = {
    //         product_id: singleProductInfo.product_Id,
    //         salesperson_id:2110001,//合并后需要修改为操作人
    //         percent:singleProductInfo.percent,
    //     };
    //     await postPromotionCreateAPI(params).then(function (res) {
    //         const data = res.data;
    //         console.log(data)
    //     }).catch((error) => {
    //         console.error("查询请求失败:", error);
    //     });
    // }catch (error) {
    //     console.error(error);
    // }
    updateDiscount()
}
//终止折扣
const endPromotion=async()=>{
    promotionFlag.value=false
    // try{
    //     let params = {
    //         product_id: singleProductInfo.product_Id,
    //     };
    //     await putEndPromotionAPI(params).then(function (res) {
    //         const data = res.data;
    //         console.log(data)
    //     }).catch((error) => {
    //         console.error("查询请求失败:", error);
    //     });
    // }catch (error) {
    //     console.error(error);
    // }
    updateDiscount()
}


onMounted(async()=>{
    try{
        await getPageInfoAPI().then(function (res) {
            const data = res.data;
            console.log(data)
            for(const item of data){
                if(item.type=="谷物"){
                    grainList.push(item)
                }else if(item.type=="蔬菜"){
                    vegetableList.push(item)
                }else if(item.type=="水果"){
                    fruitList.push(item)
                }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>