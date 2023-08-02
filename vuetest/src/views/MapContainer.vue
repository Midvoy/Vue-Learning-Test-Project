<template>
    <div>
      <el-button class="new_btn" type="primary" @click="polyEditorOpen">开始编辑</el-button>
      <el-button class="new_btn" type="primary" @click="polyEditorClose">结束编辑</el-button>
        <!-- 设置地图容器 -->
        <div id="container"></div>
    </div>
</template>
   
  <script>
    import AMapLoader from '@amap/amap-jsapi-loader';
    export default {
      name: "gaode",
      data() {
        return {
            map:null,//初始化 map 对象
            polygon: null,
            polyEditor: null,
            //经纬度构成的输出用于展示围栏 
            PolygonoArr: [
                [116.403322, 39.920255],
                [116.410703, 39.897555],
                [116.402292, 39.892353],
                [116.389846, 39.891365]
            ],
        }
      },
      methods: {
        polyEditorOpen(){
            this.polyEditor.open();
        },
        polyEditorClose(){
            this.polyEditor.close();
        },
        initMap() {
          AMapLoader.load({
            key: "48a10a5361d2ac9096e427d84fa9fede", //此处填入我们注册账号后获取的Key
            version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ['AMap.Polygon', 'AMap.PolyEditor', 'AMap.PolygonEditor','AMap.MapType','AMap.Scale','AMap.HawkEye'], //需要使用的的插件列表，如比例尺'AMap.Scale'等
          }).then((AMap) => {
            this.map = new AMap.Map("container", { //设置地图容器id
              viewMode: "3D", //是否为3D地图模式
              zoom: 8.8, //初始化地图级别
              center: [116.400274, 39.905812], //初始化地图中心点位置
            });
            //同级位置添加相关代码即可
            //1.控制地图双击是否放大
            this.map.setStatus({ doubleClickZoom: false })
            //2.卫星图
            var weixing = new AMap.TileLayer.Satellite({
                zIndex:10
            });
            this.map.add(weixing);
            this.map.addControl(new AMap.MapType());//图层切换
            this.map.addControl(new AMap.Scale());//比例尺
            //this.map.addControl(new AMap.HawkEye());//鹰眼
            //构造多边形对象
            this.polygon = new AMap.Polygon({
                path: this.PolygonoArr,
                strokeColor: "#FF33FF",
                strokeWeight: 6,
                strokeOpacity: 0.2,
                fillOpacity: 0.4,
                fillColor: '#1791fc',
                zIndex: 50,
                bubble: true,
            })
            // 创建多边形编辑器对象 指定地图容器和多边形对象
            this.polyEditor = new AMap.PolygonEditor(this.map, this.polygon)
            this.polyEditor.open();
            //绑定双击事件 双击打开编辑
            this.polygon.on('dblclick', () => {
              this.polyEditor.open()
            })
            //单击关闭
            this.polygon.on('click', () => {
              this.polyEditor.close()
            })
            this.polygon.on('mouseover', () => {// 鼠标移入更改样式
                this.polygon.setOptions({
                    fillOpacity: 0.7,
                    fillColor: '#7bccc4'
                })
            })
            this.polygon.on('mouseout', () => {// 鼠标移出恢复样式
                this.polygon.setOptions({
                    fillOpacity: 0.5,
                    fillColor: '#ccebc5'

                })
            })
            this.map.add([this.polygon])//添加Polygon实例至地图
            this.map.setFitView()// 缩放地图到合适的视野级别
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
    #container {
      width: 80%;
      height: 400px;
      margin: 100px auto;
      border: 1px solid red;
    }
  </style>