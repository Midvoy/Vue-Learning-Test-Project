<template>
  <div>
    <input id="mapInput" v-model="address" type="text"  onfocus='this.value=""' placeholder="请输入活动地址" />
    <!-- 设置地图容器 -->
    <div id="container"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
// 设置安全密钥
window._AMapSecurityConfig = {
    securityJsCode: 'bc6447c7c502a1b31195cbb29dd23899',
}

export default {

  data() {
    return {
      map:null,
      mouseTool: null,
      overlays: [],
      marker:null,
      address:null,
      auto: null,
      placeSearch: null,
      center: [113.65553, 34.748764],
    }
  },
  methods: {
    select(e) {
        this.placeSearch.setCity(e.poi.adcode);
        this.placeSearch.search(e.poi.name);  //关键字查询查询
    },
    // 创建marker方法
    setMarker() {
        // 创建一个 Marker 实例：
        this.marker = new AMap.Marker({
            position: new AMap.LngLat(this.center[0], this.center[1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            //title: '北京' // marker的鼠标滑过提示
        });

        // 将创建的点标记添加到已有的地图实例：
        this.map.add(this.marker);

        // 移除已创建的 marker
        // map.remove(marker);
    },
    // 逆地理编码方法
    InverseGeography() {
        var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: '010'
        })
        let that = this
        console.log(this.center)
        geocoder.getAddress(this.center, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                // result为对应的地理位置详细信息
                that.address = result.regeocode.formattedAddress
                console.log(that.address)
            }
            console.log(status)
        })
    },
    initMap() {
      AMapLoader.load({
        key: "48a10a5361d2ac9096e427d84fa9fede", //此处填入我们注册账号后获取的Key
        version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Polygon', 'AMap.PolyEditor', 'AMap.PolygonEditor','AMap.Scale','AMap.PlaceSearch','AMap.AutoComplete','AMap.Geocoder'], //需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
      //地图
        this.map = new AMap.Map("container", { //设置地图容器id
          viewMode: "2D",  //  是否为3D地图模式
          zoom: 13,   // 初始化地图级别
          center: this.center, //中心点坐标  郑州
          resizeEnable: true,
        });
        this.map.addControl(new AMap.Scale());//比例尺
        this.map.setStatus({zoomEnable:true})//控制地图是否可放大
        this.map.setStatus({dragEnable:true,keyboardEnable:true})//控制地图是否可以平移

        var autoOptions = {
            // 城市，默认全国 
            // city: "北京",
            // 使用联想输入的input的id
            input: "mapInput"
        }
        this.auto = new AMap.AutoComplete(autoOptions);
        this.placeSearch = new AMap.PlaceSearch({
            map: this.map,
            pageSize:1,
            // panel: "panel", // 结果列表将在此容器中进行展示。
            // city: "010", // 兴趣点城市
            autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            extensions: 'base' //返回基本地址信息
        });
        this.auto.on("select", this.select);
        // 初始化marker
        this.setMarker()
        // 初始化逆地理编码
        this.InverseGeography()

         // 地图点击事件
         this.map.on('click', (ev) => {
            if (this.marker) {
                this.map.remove(this.marker);
                this.center = [ev.lnglat.lng, ev.lnglat.lat]
                // 设置marker
                this.setMarker()
                // 逆地理编码
                this.InverseGeography()
            }
          })
        


      

        
        
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

<style scoped>
#container {
  
    width: 80%;
    height: 400px;
    margin: 100px auto;
    border: 1px solid red;
}
</style>
<style>
/* 隐藏高德logo  */
.amap-logo {
    display: none !important;
}
 
/* 隐藏高德版权  */
.amap-copyright {
    display: none !important;
}
</style>