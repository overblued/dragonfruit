define(function (require) {

// Load any app-specific modules
// with a relative require call
var geo = require('./geo');
// Load library/vendor modules using
// full IDs, like:
//var print = require('print');



//document.addEventListener("deviceready", onDeviceReady, false);
var result;
//加载地图，调用浏览器定位服务

function onComplete (data) {
  var resultStr = "";
  var poiinfo="";
  var address;
  console.log(data)
  //返回地址描述
  address = data.regeocode.formattedAddress;
  //返回周边兴趣点信息
  poiinfo += "<table style='width:300px;cursor:pointer;'>";
  for(var j=0;j<data.regeocode.pois.length;j++){
      var color = j % 2 === 0 ? '#fff' : '#eee';
      poiinfo += "<tr onmouseover='onMouseOver(\"" + data.regeocode.pois[j].location.toString() + "\")' style='background-color:" + color + "; margin:0; padding:0;'><td>" + data.regeocode.pois[j].name + "</td><td>距离：" + data.regeocode.pois[j].distance + "米</td></tr>";
  }
  poiinfo += "</table>";
  //返回结果拼接输出
  resultStr = "<div style=\"font-size: 12px;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">"+"<b>地址</b>："+ address + "<hr/><b>周边兴趣点信息</b>：<br/>" + poiinfo +"</div>";
  result.innerHTML = resultStr;
};
//解析定位错误信息
function onError (data) {
  var str = '<p>定位失败</p>';
  str += '<p>错误信息：';
  switch(data.info) {
    case 'PERMISSION_DENIED':
      str += '浏览器阻止了定位操作';
      break;
    case 'POSITION_UNAVAILBLE':
      str += '无法获得当前位置';
      break;
    case 'TIMEOUT':
      str += '定位超时';
      break;
    default:
      str += '未知错误';
      break;
  }
  str += '</p>';
  result.innerHTML = str;
};


result = document.querySelector(".test");
geo.initMap("mapContainer");

geo.setGeolocation(onComplete, onError);
geo.getCurrentPosition();

});
