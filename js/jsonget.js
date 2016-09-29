(function() {
	var mainTitle = function(data) {
		$("#mainTitle").html(data.mainTitle);
	}
	var proTeSe = function(data) {
		$("#proTeSe").html(data.proTeSe.title);
	}
	var proTeSeList = function(data) {
		var str = "";
		for (i = 0; i < data.proTeSe.list.length; i++) {
			str += "<p>" + data.proTeSe.list[i].tit + "</p>";
			for (j = 0; j < data.proTeSe.list[i].con.length; j++) {
				str += "<p>" + data.proTeSe.list[i].con[j] + "</p>";
			}
		}
		$("#proTeSeList").html(str);
	}
	var proDaytime = function(data) {
		var str = "";
		for (i = 0; i < data.proDays.length; i++) {
			if (i == 0) {
				str += '<li class="on"><a href="#a' + (i + 1) + '">第' + (i + 1) + '天</a></li>';
			} else {
				str += '<li><a href="#a' + (i + 1) + '">第' + (i + 1) + '天</a></li>';
			}
		}
		$("#leftnav").html(str)
	}
	var proDayList = function(data) {
		var str = "";
		for (i = 0; i < data.proDays.length; i++) {
			str += '<div class="dayitem" id="a' + (i + 1) + '">';
			str += '	<i class="trip_bg"></i>';
			str += '	<span class="dayitem_left">第' + (i + 1) + '天</span>';
			str += '	<div class="dayitem_right">'
			str += '		<h3>';
			for (b = 0; b < data.proDays[i].address.length; b++) {
				str += '<span>' + data.proDays[i].address[b] + '</span>';
				if (data.proDays[i].gongju[b] == 1) {
					str += '<img src="img/plane.png" alt="飞机" />';
				} else if (data.proDays[i].gongju[b] == 2) {
					str += '<img src="img/car.png" alt="汽车" />';
				} else if (data.proDays[i].gongju[b] == 3) {
					str += '';
				} else if (data.proDays[i].gongju[b] == 4) {
					str += '<img src="img/train.png" alt="火车" />';
				} else if (data.proDays[i].gongju[b] == 5) {
					str += '<img src="img/ship.png" alt="轮船" />';
				}
			}
			str += '		</h3>';
			var zaoc = data.proDays[i].eat[0] ? "有" : "无";
			var wuc = data.proDays[i].eat[1] ? "有" : "无";
			var wanc = data.proDays[i].eat[2] ? "有" : "无";
			str += '		<b>用餐：早餐（' + zaoc + '）午餐（' + wuc + '）晚餐（' + wanc + '）</b>';
			str += '		<b>住宿：' + data.proDays[i].zhusu + '</b>';
			if (data.proDays[i].hangkong !== undefined) {
				str += '		<b>航班信息：' + data.proDays[i].hangkong + '</b>';
			}
			if (data.proDays[i].hangkongnum !== undefined) {
				str += '		<b>航班号：' + data.proDays[i].hangkongnum + '</b>';
			}
			for (j = 0; j < data.proDays[i].content.length; j++) {
				str += '<p>' + data.proDays[i].content[j] + '</p>';
			}
			if (undefined != data.proDays[i].images) {
				var imgLength = data.proDays[i].images.length
				str += '<div class="trip_pic">';
				str += '<ul>';
				for (a = 0; a < imgLength; a++) {
					str += '<li>';
					str += '<i>' + data.proDays[i].images[a].tit + '</i>';
					str += '<img src="img/emptyimg.png" width="226" height="170" style="background-image:url(' + data.proDays[i].images[a].src + ');background-size:cover;background-repeat:no-repeat;background-position:center center;" />';
					str += '</li>';
				}
				str += '</ul>';
				str += '</div>';
			str += '<div class="clear"></div>';
			}
			str += '</div>';
			str += '</div>';
		}
		$("#proDayList").html(str);
	}
	var priceShow = function(data) {
		var str = "";
		for (i = 0; i < data.price.length; i++) {
			str += '<b><i>' + data.price[i].tit + '</i>' + data.price[i].con + '</b>'
		}
		$("#bigPriceShow").html(str);
	}
	var priceCloud = function(data) {
		var str = ""
		for (i = 0; i < data.priceCloud.length; i++) {
			str += '<p>' + data.priceCloud[i] + '</p>'
		}
		$("#priceCloud").html(str);
	}
	var priceUnCloud = function(data) {
		var str = ""
		for (i = 0; i < data.priceUnCloud.length; i++) {
			str += '<p>' + data.priceUnCloud[i] + '</p>'
		}
		$("#priceUnCloud").html(str);
	}
	var noticeShow = function(data) {
		var str = ""
		for (i = 0; i < data.notice.length; i++) {
			if (data.notice[i].t !== undefined) {
				str += '<p>' + (i + 1) + "、" + data.notice[i].t + '</p>';
				for (j = 0; j < data.notice[i].c.length; j++) {
					str += '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.notice[i].c[j] + '</p>';
				}
			} else {
				for (j = 0; j < data.notice[i].c.length; j++) {
					str += '<p>' + (i + 1) + "、" + data.notice[i].c[j] + '</p>';
				}
			}
		}
		$("#noticeShow").html(str);
	}
	var init = function() {
		$.ajax({
			type: "GET",
			url: mainJsonUrl,
			dataType: "json",
			success: function(data) {
				mainTitle(data);
				proTeSe(data);
				proTeSeList(data);
				proDaytime(data);
				proDayList(data);
				priceShow(data);
				priceCloud(data);
				priceUnCloud(data);
				noticeShow(data);
			}
		});
	}
	init();
})()