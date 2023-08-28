<template>
    <div>
        <!-- 设置地图容器 -->
        <div id="container1"></div>
        <div class="farmInfo">
          <div style="display: flex">
            <p>农场信息</p>
            <el-button class="new_btn" type="primary" style="margin-left: auto" @click="handleNew">+添加</el-button>
          </div>
          <div id="container2"></div>
        </div>
        <Dialog
        v-if="dialogShow"
        v-model:dialogShow="dialogShow"
        :rowInfo="rowInfo"
        :title="title"
        :farmNum="farmInfo.length"
        />
    </div>
</template>
  
<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import { reactive, ref, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
import Dialog from '@/views/map_pages/dialog.vue';


export default {
  components: { 
      Dialog,
  },
  data() {
    return {
      dialogShow: false, // 新增/编辑弹框
      title: "", // 是新建还是修改
      rowInfo: {}, // 新增/编辑的数据
      map1:null,
      map2:null,//初始化 map 对象
      markers: [],//点覆盖物用于标记大地图上农场位置
      polygons: [[]],//多边形覆盖物用于展示农田信息
      fieldTitle:[],
      placeSearch:null,
      farmInfo:[
        {
          farmID:0,
          farmName:"第一农场",
          farmLocation:[116.400000, 39.900000],
          fieldInfo:[
            {
              fieldID:0,
              fieldName:"一号田",
              locationArr:[//一号田
                [116.400000, 39.900000],
                [116.400000, 39.890000],
                [116.410000, 39.890000],
                [116.410000, 39.900000]
              ],
            },
            {
              fieldID:1,
              fieldName:"二号田",
              locationArr:[//二号田
                [116.410000, 39.900000],
                [116.410000, 39.890000],
                [116.420000, 39.890000],
                [116.420000, 39.900000]
              ],
            },
            {
              fieldID:2,
              fieldName:"三号田",
              locationArr:[//三号田
                [116.420000, 39.900000],
                [116.420000, 39.890000],
                [116.430000, 39.890000],
                [116.430000, 39.900000]
              ],
            },
          ]
        },
        {
          farmID:1,
          farmName:"二号农场",
          farmLocation:[105.571410, 32.820837],
          fieldInfo:[
            {
              fieldID:0,
              fieldName:"一号田",
              locationArr:[//一号田
                [105.571410, 32.820837],
                [105.571410, 32.790837],
                [105.601410, 32.790837],
                [105.601410, 32.820837]
              ],
            },
          ],
        },
        {
          farmID:2,
          farmName:"三号农场",
          farmLocation:[100.521410, 30.820837],
          fieldInfo:[
            {
              fieldID:0,
              fieldName:"一号田",
              locationArr:[//一号田
                [100.521410, 30.820837],
                [100.571410, 30.800837],
                [100.621410, 30.790837],
                [100.601410, 30.850837]
              ],
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleNew() {
      this.title = "添加农场";
      this.rowInfo = {};
      this.dialogShow = true;
    },
    select(e) {
      this.placeSearch.setCity(e.poi.adcode)
      this.placeSearch.search(e.poi.name) //关键字查询查询
    },

    getPointsCenter(points) {
      var point_num = points.length; //坐标点个数
      var X = 0, Y = 0, Z = 0;
      for(let i = 0; i< points.length; i++) {
        // if (points[i] == []) {
        //   continue;
        // }
        let point = points[i];
        var lat, lng, x, y, z;
        lat = parseFloat(point[0]) * Math.PI / 180;
        lng = parseFloat(point[1]) * Math.PI / 180;
        x = Math.cos(lat) * Math.cos(lng);
        y = Math.cos(lat) * Math.sin(lng);
        z = Math.sin(lat);
        X += x;
        Y += y;
        Z += z;
      }
      X = X / point_num;
      Y = Y / point_num;
      Z = Z / point_num;

      var tmp_lng = Math.atan2(Y, X);
      var tmp_lat = Math.atan2(Z, Math.sqrt(X * X + Y * Y));

      return [tmp_lat * 180 / Math.PI, tmp_lng * 180 / Math.PI];
    },

    initMap() {
      AMapLoader.load({
        key: "48a10a5361d2ac9096e427d84fa9fede", //此处填入我们注册账号后获取的Key
        version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Polygon', 'AMap.PolyEditor', 'AMap.PolygonEditor','AMap.Scale','AMap.PlaceSearch'], //需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
      //第一张地图
        this.map1 = new AMap.Map("container1", { //设置地图容器id
          viewMode: "2D", //是否为3D地图模式
          zoom: 3, //初始化地图级别
          center: [105.57141, 32.820837], //初始化地图中心点位置
        });
        this.map1.addControl(new AMap.Scale());//比例尺
        //控制地图是否可放大
        this.map1.setStatus({zoomEnable:false})
        // //控制地图是否可以平移
        // this.map1.setStatus({dragEnable:false,keyboardEnable:false})
        // this.placeSearch = new AMap.PlaceSearch({
        //     map1: this.map1
        //   }) //构造地点查询类
        // this.auto.on('select', this.select)


      //第二张地图
        this.map2 = new AMap.Map("container2", { //设置地图容器id
          viewMode: "2D", //是否为3D地图模式
          zoom: 8.8, //初始化地图级别
          center: [116.400274, 39.905812], //初始化地图中心点位置
        });
        //卫星图
        var weixing = new AMap.TileLayer.Satellite({
            zIndex:10
        });
        this.map2.add(weixing);
        this.map2.addControl(new AMap.Scale());//比例尺
        //控制地图是否可放大
        this.map2.setStatus({zoomEnable:false})
        //控制地图是否可以平移
        this.map2.setStatus({dragEnable:false,keyboardEnable:false})
        
        //同级位置添加相关代码即可
        for(let i=0;i<this.farmInfo.length;i++){
          this.markers.push(
            new AMap.Marker({
              position:this.farmInfo[i].farmLocation,//i号农场的1号田的第一个坐标（1号田对应序号0，以此类推）
            }),
          )
          this.markers[i].setLabel({
            offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
            content: this.farmInfo[i].farmName, //设置文本标注内容
            direction: 'top' //设置文本标注方位
          })
        }
        for(let i=0;i<this.markers.length;i++){
          this.markers[i].on('click',()=>{
            this.map2.setFitView(this.polygons[i])
          })
        }
        
        this.map1.add(this.markers)
        this.map1.setFitView()// 缩放地图到合适的视野级别

        for(let i=0;i<this.farmInfo.length;i++){
          this.polygons[i] = new Array();
          for(let j=0;j<this.farmInfo[i].fieldInfo.length;j++){
            this.polygons[i].push(
              new AMap.Polygon({
                path: this.farmInfo[i].fieldInfo[j].locationArr,
                strokeColor: "#FF33FF",
                strokeWeight: 6,
                strokeOpacity: 0.2,
                fillOpacity: 0.4,
                fillColor: '#1791fc',
                zIndex: 50,
                bubble: true,
              }),
            )
            //var tmp_center = this.getPointsCenter(this.farmInfo[i].fieldInfo[j].locationArr)
            this.fieldTitle.push(
              new AMap.Text({
                text:this.farmInfo[i].fieldInfo[j].fieldName,
                anchor:'center', // 设置文本标记锚点
                draggable:true,
                cursor:'pointer',
                style:{
                    'padding': '.3rem .5rem',
                    'margin-bottom': '1rem',
                    'border-radius': '.25rem',
                    'background': 'transparent',
                    'width': '5rem',
                    'border-width': 0,
                    'text-align': 'center',
                    'font-size': '20px',
                    'color': 'white'
                },
                position: this.farmInfo[i].fieldInfo[j].locationArr[0],
              }),
            )
          }
        }
        
        for(let i=0;i<this.polygons.length;i++){
          
          this.map2.add(this.polygons[i])
          
          this.map2.add(this.fieldTitle)
        }
        this.map2.setFitView(this.polygons[0])
        for(let i=0;i<this.polygons.length;i++){
          for(let j=0;j<this.polygons[i].length;j++){
              
            // 双击
            this.polygons[i][j].on('dblclick', () => {
              
            })
            //单击
            this.polygons[i][j].on('click', () => {
              this.polygons[i][j].setOptions({
                  fillOpacity: 0.5,
                  fillColor: '#ffffff'

              })
            })
            // 鼠标移入更改样式
            this.polygons[i][j].on('mouseover', () => {
              this.polygons[i][j].setOptions({
                  fillOpacity: 0.7,
                  fillColor: '#7bccc4'
              })
            })
            // 鼠标移出恢复样式
            this.polygons[i][j].on('mouseout', () => {
              this.polygons[i][j].setOptions({
                fillOpacity: 0.4,
                fillColor: '#1791fc',
              })
            })
          }
        }
      }).catch(e => {
        console.log(e);
      })

      

    },
  },
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initMap();
  }
}
</script>
  
<style>
#container1 {
  width: 80%;
  height: 400px;
  margin: 100px auto;
  border: 1px solid red;
}
#container2 {
  width: 97%;
  height: 300px;
  margin: 100px auto;
  border: 1px solid red;
}
.farmInfo{
  width: 80%;
  height: 500px;
  margin: 100px auto;
  border: 1px solid red;

}
</style>