/* geolocation/map */
define(function(){
	'use strict';
	/**
	 * Sets up the core.
	 *
	 * @param {string} name The name of your new to do list.
	 */

	var geo = {};

	//private
 	var _map, _geolocation, _geocoder;

	/**
	 *	init all map service
	 *	
	 *	@param {string} element_id id of the map container
	 *	a note from amap: avaScript API支持搜索服务脱离地图使用
	 *	即使用搜索服务不再需要先实例化地图。您可通过新增的AMap.service()方法，加载需要的服务。
	 */
	geo.initMap = function (element_id) {
		_map = new AMap.Map(element_id);
		_map.plugin('AMap.Geolocation', function () {
			_geolocation = new AMap.Geolocation({
				enableHighAccuracy: true,//是否使用高精度定位，默认:true
				timeout: 5000,	         //超过10秒后停止定位，默认：无穷大
				maximumAge: 0,           //定位结果缓存0毫秒，默认：0
				convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				showButton: false,        //显示定位按钮，默认：true
				showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
				showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
				panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
				zoomToAccuracy:false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			});
	    //map.addControl(_geolocation);
		});

		AMap.service(["AMap.Geocoder"], function() {       
    	_geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
    	});
    });
	};

	geo.setGeolocation = function (onComplete, onError) {
		//a wrapper function
		function OnRealComplete(data){
			var ll = new  AMap.LngLat(data.position.getLng(), data.position.getLat());
			_geocoder.getAddress(ll, function(status, result){
		        if(status === 'complete' && result.info === 'OK'){
		            onComplete(result);
		        }
		  	  });
		}
		AMap.event.addListener(_geolocation, 'complete', OnRealComplete);//返回定位信息
		AMap.event.addListener(_geolocation, 'error', onError);      //返回定位出错信息
			
	};
	var _auto;

	geo.setAutoComplete = function(callBack, opt){
		opt = opt || { city: "" };
    _auto = new AMap.Autocomplete(opt);
		AMap.service(["AMap.Autocomplete"], function() {
      //查询成功时返回查询结果
      if ( keywords.length > 0) {
        AMap.event.addListener(_auto,"complete",callBack);
        _auto.search(keywords);
      }
      else {
        document.getElementById("result1").style.display = "none";
      }
    });
	};
	geo.getAutoComplete = function(keywords){
		if ( !_auto ) {
			console.log("autoComplete unset");
			return false;
		}
		if (keywords.length > 0) {
			_auto.search(keywords);
			return true;
		} 
		return false;
	};
	geo.getCurrentPosition = function(){
		_geolocation.getCurrentPosition();
	};
	geo.watchPosition = function () {
		_geolocation.watchPosition();
	};
	geo.getAddress = function(){

	}

	return geo;
});
