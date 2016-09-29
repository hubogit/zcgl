(function() {
	/*
	 * 自由行，公共JS
     +----------------------------------------------------
     * @author jianguang.ma 2014.3.13
	 */
    /*
	 * 网站用到的UI交互js效果
	 */
	IU.namespace('IU.main');
    /**导航菜单
    * @function
	* @name navMenu
	* @returns void
	* @example 使用时IU.util.navMenu({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    *
    **/
	IU.main.navMenu = function(myOption){
		var navBox = $(".header_left");
        var navLi = navBox.find("ul li");
        navLi.eq(0).addClass("NAV_click");
        navLi.click(function(){
        	$(this).addClass("NAV_click").siblings().removeClass("NAV_click");
        })
        
    }
	/**左侧菜单
    * @function
	* @name menuClick
	* @returns void
	* @example 使用时IU.util.menuClick({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    *
    **/    
	IU.main.menuClick = function(myOption){
		var oMenuBox = $(myOption.id);
        var oTitle = oMenuBox.find("h2");
        oTitle.click(function(){
        	$(this).find(".unfold").toggleClass("unfold_click");
            $(this).next("ul").slideToggle();
        })        
    }
    /**排序列表
    * @function
	* @name sortList
	* @returns void
	* @example 使用时IU.util.sortList({key:value,color:#f00}) 可以自己添加其他需要的样式
    *IU.util.sortList({id:yourId})
    **/
	IU.main.sortList = function(myOption){
    	var oUl = $(myOption.id).find('.sort');
		sort_style = {'a':'down','b':'up','c':'down_on','d':'up_on'};//排序开关样式
		oUl.click(function(){
            var sort_by = $(this).find('.sort_by');
			var sort_open  = sort_by.hasClass(sort_style.c) || sort_by.hasClass(sort_style.d);//开启
            var sort_close = sort_by.hasClass(sort_style.a) || sort_by.hasClass(sort_style.b);//关闭
			oUl.not(this).find('.sort_by').filter('.'+sort_style.c).removeClass().addClass('sort_by '+sort_style.a);
            oUl.not(this).find('.sort_by').filter('.'+sort_style.d).removeClass().addClass('sort_by '+sort_style.b);

			//如果是开启的，切换排序，使其他排序变暗d=>b,c=>a不影响下次激活
			if(sort_open)
			{
				if(sort_by.hasClass(sort_style.c))
					sort_by.removeClass().addClass('sort_by '+sort_style.d);
				else
					sort_by.removeClass().addClass('sort_by '+sort_style.c);
			}
			if(sort_close)
			{
				if(sort_by.hasClass(sort_style.b))
					sort_by.removeClass().addClass('sort_by '+sort_style.d);
				else
					sort_by.removeClass().addClass('sort_by '+sort_style.c);
			}
			var sort = get_order_info();
            var cBoxAll = $('#menuBox').find(".checkbox_style");//全部选择框
            var filtor = collect_filtor_data(cBoxAll);
            request_filtor({orderby:sort,tripTime:filtor.tripTime,page:1});
        })
    } 
	
	/**左侧复选框选中效果
    * @function
	* @name cBoxClick
	* @returns void
	* @example 使用时IU.util.cBoxClick({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    * @yanxh--修改版本
    **/    
	IU.main.cBoxClick = function(myOption){

        var style_checked_add = 'checkbox_style_click';
        var style_checked     = 'checkbox_style checkbox_style_click';

		var oMenuBox = $(myOption.id);
        var cBoxAll      = oMenuBox.find(".checkbox_style");//全部选择框
        var cBoxCheckAll = cBoxAll.filter($('[myname="checkall"]'));//全选框
        var cBoxList     = cBoxAll.not(cBoxCheckAll);//所有子列表框

        // 默认为选择状态
        cBoxCheckAll.toggleClass(style_checked_add);

        // 全选-不限
        cBoxCheckAll.click(function(){
            var id        = $(this).attr('id');
            var list_name = id.substring(0,id.length-4);
            //点击全选时，子列表有选择--清掉
            list_checked = cBoxAll.filter($('[name="'+list_name+'"][class="'+style_checked+'"]'));
            if(list_checked.size() > 0)
            {
                list_checked.toggleClass(style_checked_add);
            }

            //如果全选 选中 列表没有选中 不处理
            if($(this).attr('class') == style_checked && list_checked.size() < 1)
            {
                return false;
            }
            
            $(this).toggleClass(style_checked_add);

            var filtor = collect_filtor_data(cBoxAll);            
            request_filtor({search:filtor.search,tripTime:filtor.tripTime,page:1});

        });

        // 相关列表子类
        cBoxList.click(function()
        {
            //如果全选已经选择,清空格式
            var list_name = $(this).attr('name');
            var id = list_name+'_all';


            if($('#'+id).attr('class') == style_checked)
            {
                $('#'+id).toggleClass(style_checked_add);
            }
            
            $(this).toggleClass(style_checked_add);

            //子列表清空 默认全选
            list_checked = cBoxAll.filter($('[name="'+list_name+'"][class="'+style_checked+'"]'));
            if(list_checked.size() < 1)
            {
                $('#'+id).toggleClass(style_checked_add);
            }

            var filtor = collect_filtor_data(cBoxAll);            
            request_filtor({search:filtor.search,tripTime:filtor.tripTime,page:1});
        });
           
    }
    /**选项卡
    * @function
	* @name tabSelect
	* @returns void
	* @example 使用时IU.util.cBoxClick({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    *
    **/    
	IU.main.tabSelect = function(myOption){
		var tabBox = $(myOption.id);
        var tabBtn = tabBox.find("ul.tabBtn li");
        
        var index = '';
        tabBtn.click(function(){
        	var tabCont = $(this).parent().next("div").find(".tabCont");
            $(this).addClass("on").siblings().removeClass("on");
            index = $(this).index();
            tabCont.eq(index).show().siblings().hide();
        })
        
    }
    /**通用选项卡
    * @function
	* @name tabSelect
	* @returns void
	* @example 使用时IU.util.cBoxClick({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    *
    **/    
	IU.main.tabComm = function(myOption){
		var tabBox = $(myOption.id);
        var tabBtn = tabBox.find("."+myOption.tabClass);
        var index = '';
        tabBtn.click(function(){
            var tabCont = $(this).parent().next("div").find("."+myOption.tabCont);
            $(this).addClass(myOption.on).siblings().removeClass(myOption.on);
            index = $(this).index();
            tabCont.eq(index).show().siblings("."+myOption.tabCont).hide();
        })
        
    }
	/**酒店问答选项卡
    * @function
	* @name tabSelect
	* @returns void
	* @example 使用时IU.util.cBoxClick({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    *
    **/    
	IU.main.tabCommJd = function(myOption){
		var tabBox = $(myOption.id);
        var tabBtn = tabBox.find("."+myOption.tabClass);
        var index = '';
        tabBtn.click(function(){
            var tabCont = $(this).parent().parent().parent().find("."+myOption.tabCont);
            $(this).addClass(myOption.on).siblings().removeClass(myOption.on);
            index = $(this).index();
            tabCont.eq(index).show().siblings("."+myOption.tabCont).hide();
        })
        
    }
    /**包含选项卡的复选项卡**/
    IU.main.tabSelectOut = function(myOption){
		var tabBox = $(myOption.id);
        var tabBtn = tabBox.find(".tabone_nav ul li");
        var tabCont = tabBox.find(".tabContOut");
        var index = '';
		var oScroll = myOption.oScroll;
        tabBtn.click(function(){
            $(this).parents(".tabone_nav").removeClass("fixed");
            $(this).find("a").addClass("tab_click").end().siblings().find("a").removeClass("tab_click");
            index = $(this).index();
            tabCont.eq(index).show().siblings(".tabContOut").hide();
			if(oScroll){
				//$(window).scrollTop(768);
				$("html,body").animate({scrollTop : $(".tabone_nav").offset().top}, 10);
			}else{
				$(window).scrollTop(730);
			}
        })
        
    }
    /**浮动菜单
    * @function
	* @name fixedMenu
	* @returns void
	* @example 使用时IU.util.cBoxClick({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    *
    **/    
	IU.main.fixedMenu = function(myOption){
		var tabBox = $(myOption.id);
        var tabBtn = tabBox.find(".tab_nav ul li");
        var bookBtn = tabBox.find("#bookBtn");
        var index = '';
        //var scrollTarget = $(".tabone_nav").offset().top;
        $(window).scroll(function(){                        
            var oScrollTop = $(window).scrollTop();
            if(oScrollTop>=620){
                $(".tabone_nav").addClass("fixed");
                bookBtn.show();
            }else{
                $(".tabone_nav").removeClass("fixed")
                bookBtn.hide();
            }
        })
        
    }
    /**回到顶部
    * @function
	* @name goTop
	* @returns void
	* @example 使用时IU.util.cBoxClick({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    *
    **/    
	IU.main.goTop = function(myOption){
		var goTopBox = $(myOption.id);
        var rocket = goTopBox.find("span");
        var rocketScrollTop = rocket.scrollTop();
        var oScrollTop = '';
        var bSys=true;
        var timerF = '';
		var ie6=!-[1,]&&!window.XMLHttpRequest;
        $(window).scroll(function(){
            if(!bSys){
                clearInterval(timerF);
                rocket.css({"top":0});
            }
            oScrollTop = $(window).scrollTop();
            if(oScrollTop>10){
                if(ie6){
					goTopBox.stop(true,true).animate({"top":oScrollTop+$(window).height()-122},0)
				}
				goTopBox.show();
            }else{
                goTopBox.hide();
                //rocket.css({"top":0}).removeClass("huojian_click");
            };
            bSys=false;
            
        })
        goTopBox.click(function(){
            //rocket.addClass("huojian_click")
            
            var timerF = setInterval(function(){
                oScrollTop-=520;
                if(oScrollTop<=0){
                    clearInterval(timerF);
                } 
                bSys=true;
                $(window).scrollTop(oScrollTop);
                /*rocket.offset(function(n,c){
                    newPos=new Object();
                    newPos.top=c.top-350;
                    return newPos;
                })
                */
            },30)
        })        
    }
    /**详情页图片展示效果
    * @function
	* @name imgShow
	* @returns void
	* @example 使用时IU.util.cBoxClick({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    *
    **/    
	IU.main.imgShow = function(myOption){
		var oSmallImg = $("#smallImg li");
        var oDialogSmallImg = $("#dialogSmallImg li")
        var oBigImg = $("#bigImgBox img");
        var oShowBig =$("#showBig");
        var oDialog = $("#dialog");
        var imgBox = $("#imgBox");
        var prevBtn = $("<b id='prevBtn' class='D_B_Upbtn'></b>");
        var nextBtn = $("<b id='nextBtn' class='D_B_Downbtn'></b>");
        var prevLiBtn = $(".D_S_Upbtn");
        var nextLiBtn = $(".D_S_Downbtn");
        var lPrevBtn = $("#lPrev");
        var lNextBtn = $("#lNext");
        var imgAlt = '';
        var imgSrc = '';
        var oImg = '';
        var index = 0;
        var Bigindex = 0;
        var imgTitle = $("#imgTitle");
        var len = oSmallImg.length;
        var oUlWidth = oSmallImg.outerWidth()*len;
        var timer = null;
        var bigTimer = null;
		initImgAlt = $("#bigImgBox img:first").attr("salt");
        $("p.sm").text(initImgAlt)
        //changeImg(0);
        if(len<=7){
            lPrevBtn.removeClass("slt_up_click")
            lNextBtn.removeClass("slt_down_click")
        }else if(len>7){
            lNextBtn.addClass("slt_down_click")
        }
        prevBtn.css("opacity","0");
        nextBtn.css("opacity","0");
        imgBox.hover(function(){
            prevBtn.css("opacity","1");
            nextBtn.css("opacity","1");
        },function(){
            prevBtn.css("opacity","0");
            nextBtn.css("opacity","0");
        })
        $("#smallImg").css("width",oUlWidth);
        oShowBig.click(function(){
            //console.log(index)
            Bigindex = index;
            showBigImg(Bigindex)
        })
        oBigImg.click(function(){
            //console.log(index)
            Bigindex = $(this).index();
            showBigImg(Bigindex)
        })
        
        prevBtn.click(function(){
            Bigindex--;
            if(Bigindex<0){
                Bigindex=0;
                prevLiBtn.removeClass("slt_up_click");
                showBig(0)
                return false;
            };
            showBig(Bigindex)
        })
        nextBtn.click(function(){
            Bigindex++;
            if(Bigindex>len-1){
                Bigindex=len-1;
                nextLiBtn.removeClass("slt_down_click");
                showBig(len-1)
                return false;
            };
            showBig(Bigindex)
        })
        prevLiBtn.click(function(){
            Bigindex-=8;
            if(Bigindex<0){
                Bigindex=0;
                prevLiBtn.removeClass("slt_down_click");
                showBig(0)
                return false;
            };
            showBig(Bigindex)
        })
        nextLiBtn.click(function(){
            Bigindex+=8;
            if(Bigindex>len-1){
                Bigindex=len-1;
                nextLiBtn.removeClass("slt_down_click");
                showBig(len-1)
                return false;
            };
            showBig(Bigindex)
        })
        oDialogSmallImg.click(function(){
            Bigindex = $(this).index();
            showBig(Bigindex)
            
        });
        function showBigImg(Bigindex){
            IU.util.dialog({id:"dialog",width:888,height:620});
            oDialog.find("h3").text(imgAlt);
            imgSrc = oBigImg.eq(Bigindex).attr("s_src");
            imgAlt = oBigImg.eq(Bigindex).attr("s_con");
            oImg = $("<img src = "+imgSrc+">");
            imgTitle.text(imgAlt);
            imgBox.append(prevBtn,nextBtn);
            imgBox.find("ul li").append(oImg)
            oDialogSmallImg.eq(Bigindex).addClass("D_C_S_click").siblings().removeClass("D_C_S_click")
            var c = imgBox.find("img").length;
            if(c>1){imgBox.find("img").eq(0).remove()}
        }
        function showBig(index){
            if(index>0&&index<len-1){
                prevLiBtn.addClass("slt_up_click");
                nextLiBtn.addClass("slt_down_click");
            }else if(index==0){
                prevLiBtn.removeClass("slt_up_click");
                nextLiBtn.addClass("slt_down_click");
            }else if(index==len-1){
                nextLiBtn.removeClass("slt_down_click");
                prevLiBtn.addClass("slt_up_click");
            }
            
            imgAlt = oBigImg.eq(index).attr("s_con");
            oDialog.find("h3").text(imgAlt);
            imgSrc = oBigImg.eq(index).attr("s_src");
            imgBox.find("img").attr("src",imgSrc);
            imgTitle.text(imgAlt);
            oDialogSmallImg.eq(index).addClass("D_C_S_click").siblings().removeClass("D_C_S_click")
        }
        $("#imgBox").hover(function(){
            clearInterval(bigTimer);
        },function(){
            //clearInterval(bigTimer);
			bigTimer = setInterval(function(){
                showBig(Bigindex);
                Bigindex++;
                if(Bigindex==len){
                    Bigindex = 0;
                }
            },4000);
        }).trigger("mouseout")
        /****详细页焦点图start*****/
        lPrevBtn.click(function(){
            if(index<6){
                return false;
            }
            if(len<=7){return false;}
            if(index>6){
                index=0;
                $(this).removeClass("slt_up_click");
                changeImg(0);
                return false;
            }
            changeImg(index);
        })  
        lNextBtn.click(function(){
            if(index==0&&len/7>1){
                changeImg(7);
                index = 7;
                $("#smallImg").stop(true,false).animate({"left":-oSmallImg.outerWidth()*1},1000)
                return false
            }
            if(index!=0&&index!=6&&index%7!=0&&len/7>1&&len/7<2){
                changeImg(7);
                $("#smallImg").stop(true,false).animate({"left":-oSmallImg.outerWidth()*1},1000)
                return false
            }
            
            /*if(index>len-1){
                index = len - 1;
                changeImg(len-1);
                $(this).removeClass("slt_down_click")
                lPrevBtn.addClass("slt_up_click");
                return false;
            }*/
        }) 
        oSmallImg.click(function(){
            index = $(this).index();
            changeImg(index);
            
        });
        
        function changeImg(index){
            /*if(index>0&&index<len-1){
                lPrevBtn.addClass("slt_up_click");
                lNextBtn.addClass("slt_down_click");
            }*/
            if(index>=6){
                lPrevBtn.addClass("slt_up_click");
                lNextBtn.removeClass("slt_down_click");
            }
            if(index<6){
                lPrevBtn.removeClass("slt_up_click");
                lNextBtn.addClass("slt_down_click");
            }
            if(index>5&&index<=len-2){
                $("#smallImg").stop(true,false).animate({"left":-oSmallImg.outerWidth()*(index-5)},1000)
            }
            else if(index<=5){
                $("#smallImg").stop(true,false).animate({"left":0},1000)
            }
            //$("#smallImg").animate({"left":-oSmallImg.outerWidth()*index},1000)
            
            imgAlt = oBigImg.eq(index).attr("salt");
            $("#showBig").parents("#imgShowBox").find("p.sm").text(imgAlt)
            oSmallImg.eq(index).addClass("liClass").siblings().removeClass("liClass");
            oBigImg.eq(index).fadeIn(500).siblings().fadeOut(500);
        }
        $("#imgShowBox").hover(function(){
            clearInterval(timerG);
        },function(){
            //clearInterval(timerG);
			timerG = setInterval(function(){
                changeImg(index);
                index++;
                if(index==len){
                    index = 0;
                }
            },5000);
        }).trigger("mouseout")
    }
	/**googleMapComm
    * @function
	* @name googleMap
	* @returns void
	* @example 使用时IU.main.googleMapComm({"id":"#map"}) 可以自己添加其他需要的样式
    *
    **/   
	IU.main.googleMapComm = function(myOption){
        var lat ='';
        var mapTitle = '';
        var showMap = $(".showMap");
		//var mapBoxId = myOption.mapBoxId//显示地图的div的父级Id 此处id不带#(由于历史原因，弹窗插件传Id的时候省略了#)
		var id = myOption.id;//加载地图的Id此处id带#
		var _id = id.replace("#","");//去掉id的#;
		//alert(_id)
        var re = /\(|\)/g;
        var map;
        var info;
        var markers = [];
        showMap.click(function(event){
			IU.util.dialog({"id":_id,width:880,height:583});
            mapTitle = $(this).attr("mapTitle");
            var mapAddr = $(this).attr("mapAddr");
            var mapLink = $(this).attr("mapLink");
			var starnum = $(this).attr("starnum");
			var statHtml = '<span id="starShow"><a class="l_xx"></a><a class="l_xx"></a><a class="l_xx"></a><a class="l_xx"></a><a class="l_xx"></a></span>';
            var oH2 = $("<h2 id='title'></h2>");
            var oP1 = $("<p id='ads'></p>");
            var oP2 = $("<p id='conect'></p>");
			if(starnum!=0){
				//$("#starShow").find("a:lt("+starnum+")").addClass("l_xx");
				
				//mapTitle+=statHtml;
				
			}
            oH2.html(mapTitle);
            oP1.html(mapAddr);
            oP2.html(mapLink);
			//$("#starShow").find("a").removeClass("l_xx").addClass("h_xx");
            //$("#mapDialog").prepend(oH2,oP1,oP2)
			var mapBox = $(id);
			mapBox.prepend(oH2,oP1,oP2)
			$("#starShow").find("a:gt("+(starnum-1)+")").removeClass("l_xx").addClass("h_xx");
            lat = $(this).attr("latlng");
            initMap()
        })
        function initMap(){
            if(lat){
            var initPos = lat.replace(re,"")
            initPos = initPos.split(",")
             var a = initPos[0];
             var b = initPos[1];
            }
            if(a){
                lanlngs = new google.maps.LatLng(a,b);
            }else if(a==undefined||a==null||a==0){
                lanlngs = new google.maps.LatLng(39.8928799002948,116.422119140625);
            }
            var image ='../static/img/location.png';
            var mapOption = {
                zoom: 10,
                center: lanlngs,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                title: mapTitle
                //icon:image
            }
            map = new google.maps.Map(document.getElementById('map'), mapOption);
            marker = new google.maps.Marker({
              position: lanlngs,
              map: map,
              icon: image,
              title: mapTitle
            });
        }
    }
    /**googleMap
    * @function
	* @name googleMap
	* @returns void
	* @example 使用时IU.util.cBoxClick({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    *
    **/    
	IU.main.googleMap = function(myOption){
        var lat ='';
        var mapTitle = '';
        var showMap = $(".showMap");
        var mapBox = $("#map");
        var re = /\(|\)/g;
        var map;
        var info;
        var markers = [];
        showMap.click(function(event){
			IU.util.dialog({id:"mapDialog",width:880,height:583});
            mapTitle = $(this).attr("mapTitle");
            var mapAddr = $(this).attr("mapAddr");
            var mapLink = $(this).attr("mapLink");
			var starnum = $(this).attr("starnum");
			var statHtml = '<span id="starShow"><a class="l_xx"></a><a class="l_xx"></a><a class="l_xx"></a><a class="l_xx"></a><a class="l_xx"></a></span>';
            var oH2 = $("<h2 id='title'></h2>");
            var oP1 = $("<p id='ads'></p>");
            var oP2 = $("<p id='conect'></p>");
			if(starnum!=0){
				//$("#starShow").find("a:lt("+starnum+")").addClass("l_xx");
				
				mapTitle+=statHtml;
				
			}
            oH2.html(mapTitle);
            oP1.html(mapAddr);
            oP2.html(mapLink);
			//$("#starShow").find("a").removeClass("l_xx").addClass("h_xx");
            $("#mapDialog").prepend(oH2,oP1,oP2);
			$("#starShow").find("a:gt("+(starnum-1)+")").removeClass("l_xx").addClass("h_xx");
            lat = $(this).attr("latlng");
            initMap()
        })
        function initMap(){
            if(lat){
            var initPos = lat.replace(re,"")
            initPos = initPos.split(",")
             var a = initPos[0];
             var b = initPos[1];
            }
            if(a){
                lanlngs = new google.maps.LatLng(a,b);
            }else if(a==undefined||a==null||a==0){
                lanlngs = new google.maps.LatLng(39.8928799002948,116.422119140625);
            }
            var image ='../static/img/location.png';
            var mapOption = {
                zoom: 12,
                center: lanlngs,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                title: mapTitle
                //icon:image
            }
            map = new google.maps.Map(document.getElementById('map'), mapOption);
            marker = new google.maps.Marker({
              position: lanlngs,
              map: map,
              icon: image,
              title: mapTitle
            });
            /*google.maps.event.addListener(map, 'click',
            function(event) {
                marker.setMap(null);
                addMarker(event.latLng);
                google.maps.event.trigger(map,"resize");
            });*/
        }
        
        /*function addMarker(location) {
            for (i in markers) {
                markers[i].setMap(null);
            }
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
            var center = marker.getPosition();
            markers.push(marker);
            info = marker.getPosition();
        }*/
    }
	IU.main.googleMapNormal = function(myOption){
		var lat ='';
        var mapTitle = '';
        var showMap = $(".showMap2");
        var mapBox = $("#map");
        var re = /\(|\)/g;
        var map;
        var info;
        var markers = [];
        showMap.click(function(event){
			IU.util.dialog({id:"miniMapDialog",width:880,height:583});
			var oH2 = $("<h2 id='title'></h2>");
            var oP1 = $("<p id='ads'></p>");
            var oP2 = $("<p id='conect'></p>");
            $("#miniMapDialog").prepend(oH2,oP1,oP2)
            lat = $(this).attr("latlng");
            initMap()
        })
		
		function initMap(){
            
            if(lat){
            var initPos = lat.replace(re,"")
            initPos = initPos.split(",")
             var a = initPos[0];
             var b = initPos[1];
            }
            if(a){
                lanlngs = new google.maps.LatLng(a,b);
            }else if(a==undefined||a==null||a==0){
                lanlngs = new google.maps.LatLng(39.8928799002948,116.422119140625);
            }
            var image ='../static/img/location.png';
            var mapOption = {
                zoom: 12,
                center: lanlngs,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                title: mapTitle
                //icon:image
            }
            map = new google.maps.Map(document.getElementById('myMap'), mapOption);
            marker = new google.maps.Marker({
              position: lanlngs,
              map: map,
              icon: image,
              title: mapTitle
            });
            /*google.maps.event.addListener(map, 'click',
            function(event) {
                marker.setMap(null);
                addMarker(event.latLng);
                google.maps.event.trigger(map,"resize");
            });*/
        }
		
	}
	IU.main.googleMapNormal2 = function(myOption){
		var lat =$("#initLat").attr("latlng");
        var mapTitle = '';
        var mapBox = $("#map");
        var re = /\(|\)/g;
        var map;
        var info;
        var markers = [];
		initMap2()
		function initMap2(){
            
            if(lat){
            var initPos = lat.replace(re,"")
            initPos = initPos.split(",")
             var a = initPos[0];
             var b = initPos[1];
            }
            if(a){
                lanlngs = new google.maps.LatLng(a,b);
            }else if(a==undefined||a==null||a==0){
                lanlngs = new google.maps.LatLng(39.8928799002948,116.422119140625);
            }
            var image ='../static/img/location.png';
            var mapOption = {
                zoom: 2,
                center: lanlngs,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                title: mapTitle
                //icon:image
            }
            map = new google.maps.Map(document.getElementById('miniMap'), mapOption);
            marker = new google.maps.Marker({
              position: lanlngs,
              map: map,
              icon: image,
              title: mapTitle
            });
            /*google.maps.event.addListener(map, 'click',
            function(event) {
                marker.setMap(null);
                addMarker(event.latLng);
                google.maps.event.trigger(map,"resize");
            });*/
        }
	}
	/*租车地图*/
	IU.main.zcgoogleMap = function(myOption){
        var lat ='';
        var mapTitle = '';
        var showMap = $(".showMap");
        var mapBox = $("#map");
        var re = /\(|\)/g;
        var map;
        var info;
        var markers = [];
        showMap.click(function(event){
				IU.util.dialog({id:"mapDialog",width:719,height:491});
            mapTitle = $(this).attr("mapTitle");
            var mapAddr = $(this).attr("mapAddr");
            var mapLink = $(this).attr("mapLink");
            var oH2 = $("<h2 id='title'></h2>");
            var oP1 = $("<p id='ads'></p>");
            var oP2 = $("<p id='conect'></p>");
            oH2.html(mapTitle);
            oP1.html(mapAddr);
            oP2.html(mapLink);
            $("#mapDialog").prepend(oH2,oP1,oP2)
            lat = $(this).attr("latlng");
            initMap()
        })
        function initMap(){            
            if(lat){
            var initPos = lat.replace(re,"")
            initPos = initPos.split(",")
             var a = initPos[0];
             var b = initPos[1];
            }
            if(a){
                lanlngs = new google.maps.LatLng(a,b);
            }else if(a==undefined||a==null||a==0){
                lanlngs = new google.maps.LatLng(39.8928799002948,116.422119140625);
            }
            var image ='../static/img/location.png';
            var mapOption = {
                zoom: 12,
                center: lanlngs,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                title: mapTitle
                //icon:image
            }
            map = new google.maps.Map(document.getElementById('map'), mapOption);
            marker = new google.maps.Marker({
              position: lanlngs,
              map: map,
              icon: image,
              title: mapTitle
            });
        }
    }
    /*酒店地图*/
    IU.main.googleMapHotel = function(myOption){
        var showMap = $("#gMap");
        var re = /\(|\)/g;
        var map;
        var info;
        var markers = [];
        var lat = myOption.lat;
        var myTitle =  myOption.myTitle
        initGmap()
        showMap.click(function(){
            initGmap()
        })
        function initGmap(){
            if(lat){
            var initPos = lat.replace(re,"")
            initPos = initPos.split(",")
             var a = initPos[0];
             var b = initPos[1];
            }
            if(a){
                lanlngs = new google.maps.LatLng(a,b);
            }else{
                lanlngs = new google.maps.LatLng(39.8928799002948,116.422119140625);
            }
            var image ='../static/img/location.png';
            var mapOption = {
                zoom: 12,
                center: lanlngs,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                title:myTitle
            }
            map = new google.maps.Map(document.getElementById('hotel_map_x'), mapOption);
            var marker = new google.maps.Marker({
              position: lanlngs,
              map: map,
              icon:image,
              title: myTitle
            });
            /*google.maps.event.addListener(map, 'click',
            function(event) {
                marker.setMap(null);
                addMarker(event.latLng);
            });*/
        
        }
        
        /*function addMarker(location) {
            for (i in markers) {
                markers[i].setMap(null);
            }
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
            var center = marker.getPosition();
            markers.push(marker);
            info = marker.getPosition();
        }*/
    }
    /////////////////////////////////////////////////////////
    
    /**googleMapMp门票地图
    * @function
	* @name googleMap
	* @returns void
	* @example 使用时IU.util.cBoxClick({key:value,"color":"#f00"}) 可以自己添加其他需要的样式
    *
    **/    
	IU.main.googleMapMp = function(myOption){
        var posInfo = '';
        var showMap = $(".showMap");
        var mapBox = $("#map");
        var re = /\(|\)/g;
        var map;
        var myTitle = [];
        var arrA = [];
        var arrB = [];
        showMap.click(function(event){
            IU.util.dialog({id:"mapDialog",width:880,height:583});
            mapTitle = $(this).attr("mapTitle");
            var mapAddr = $(this).attr("mapAddr");
            var mapLink = $(this).attr("mapLink");
            var oH2 = $("<h2 id='title'></h2>");
            var oP1 = $("<p id='ads'></p>");
            var oP2 = $("<p id='conect'></p>");
            oH2.html(mapTitle);
            oP1.html(mapAddr);
            oP2.html(mapLink);
            $("#mapDialog").prepend(oH2,oP1)
            ///////////////////////////////////////////////
            posInfo = $(this).attr("posinfo");//{"zb":["(47.433092,8.564862)","(51.449942,-2.587624)"],"address":["北京朝阳远洋","北京朝阳远洋2"]}
            posInfo = jQuery.parseJSON(posInfo);
            var oZb = posInfo.zb;
            var oAdress = posInfo.address;
            var zbLen = oZb.length;
            for(var i=0;i<zbLen;i++){
                //console.log(oZb[i].replace(re,""))//47.433092,8.564862 51.449942,-2.587624
                var oPlace = oAdress[i];//地址
                myTitle.push(oPlace);
                var oPos = oZb[i].replace(re,"");
                var newPos = oPos.split(",");
                //console.log(newPos)//坐标
                arrA.push(newPos[0])
                arrB.push(newPos[1])
            }
            initMap()
        })
        function initMap(){
            var oPosLen = arrA.length;
            var image ='../static/img/location.png';
            for(var i=0;i<oPosLen;i++){
                lanlng = new google.maps.LatLng(arrA[i],arrB[i]);
                var mapOption = {
                zoom: 10,
                center: lanlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                title:myTitle[i]
                }
            } 
            map = new google.maps.Map(document.getElementById('map'), mapOption);
            for(var i=0;i<oPosLen;i++){
                lanlng = new google.maps.LatLng(arrA[i],arrB[i]);
                var marker = new google.maps.Marker({
                  position: lanlng,
                  map: map,
                  icon:image,
                  title: myTitle[i]
                });
            }
            //////////////////点击添加坐标///////////////////////////
            /*for(var i=0;i<Arra.length;i++){
                lanlng = new google.maps.LatLng(Arra[i],Arrb[i]);
                console.log(Arra[i],Arrb[i])
                addMarker(lanlng);
            } 
            google.maps.event.addListener(map, 'click',
                function(event) {
                    addMarker(event.latLng);
                }
            );
            function addMarker(location) {
                marker = new google.maps.Marker({
                    position: location,
                    icon:image,
                    map: map
                });
                var center = marker.getPosition();
                markers.push(marker);
                info = marker.getPosition();
            }*/
            ///////////////////////循环end///////////////////////////////////////
            
        }    
    }
    
    ////////////////////////////////////////////////////////
    IU.main.btnSub = function(myOption){
    	var btnSub = $(myOption.className);
        btnSub.click(function(){
            $(this).addClass("tijiao_click"+" "+"yuding_click");
        })
    }
    /*首页热门度假地，我的凯撒，帮助中心菜单*/
    IU.main.showMenu = function(myOption){
    	$(".img").hover(function(){
            $(this).next("div").show()},function(){
            $(this).next("div").hide()
        })
        $(".head_H_2").hover(function(){
            $(this).show()},function(){
            $(this).hide()
        })
        $(".head_H_3").hover(function(){
            $(this).show()},function(){
            $(this).hide()
        })
        $(".nav_hot,.nav_hot_hide").hover(function(){
            $(".nav_hot_hide").show()},function(){
            $(".nav_hot_hide").hide()
        })
		$(".bigmenu,.bigmenu_hide").hover(function(){
            $(".bigmenu_hide").show()},function(){
            $(".bigmenu_hide").hide()
        })
    }
    IU.main.btnContact = function(){
        $(".lianx").hover(function(){
            $(".left_fixed").removeClass("displayNONE");
        },function(){
            $(".left_fixed").addClass("displayNONE");
        })
        $(".left_fixed").hover(function(){
            $(".left_fixed").removeClass("displayNONE");
        },function(){
            $(".left_fixed").addClass("displayNONE");
        })
        /*$(".clone").click(function(){
            $(".left_fixed").addClass("displayNONE");
        })*/
    }

    IU.main.hotelImgShow = function(id){
        var imgBox = $(id);
        var oSmallImg = imgBox.find(".UP_r1_right li");
        var oBigImg = imgBox.find(".UP_r1_left li");
        var oTitle = $(".UP_r2 P");
        var len = oSmallImg.length;
        var index = 0;
        var timer = null;
        /*var timer = setInterval(function(){
            showImg(index);
            index++;
            if(index==len){
                index = 0;
            }
        },1000);*/
        var oScrollTop = 0;
        oSmallImg.eq(0).addClass("ul_li_Kclick").siblings().removeClass("ul_li_Kclick");
        oBigImg.eq(0).css({"display":"block"});
        oSmallImg.click(function(){
            var index = $(this).index();
            //console.log(index)
            showImg(index)
            
        })
        oSmallImg.mouseover(function(){
            var index = $(this).index();
            //console.log(index)
            showImg(index)
            
        })
        $(".UP_r1_right").hover(function(){
            clearInterval(timerH);
        },function(){
                //clearInterval(timerH);
				timerH = setInterval(function(){
                showImg(index);
                index++;
                if(index==len){
                    index = 0;
                }
            },4000)
        }).trigger("mouseout")
        function showImg(index){
            var oSrc = oSmallImg.eq(index).attr("src");
            var oInfo = oBigImg.eq(index).find("img").attr("salt");
            oTitle.html(oInfo)
            oSmallImg.eq(index).addClass("ul_li_Kclick").siblings().removeClass("ul_li_Kclick");
            oBigImg.eq(index).fadeIn(500).siblings().fadeOut(500);
            var a = (len/2)*78;
            var b = 78*5;
            var c = a-b+30;
            if(index==0){
                $(".UP_r1_right").animate({scrollTop:0})
            }
            if(index%2!=0&&index!=1&&index<len-10&&index>7){
                oScrollTop+=78;
                //$(".UP_r1_right").scrollTop(oScrollTop)
                $(".UP_r1_right").animate({scrollTop:oScrollTop})
            }
            if(len-index==9){
                $(".UP_r1_right").animate({scrollTop:c})
            }
            //var oSrc = oSmallImg.eq(index).find("img").attr("src").split(".")[0];
            //var oSrc = oSmallImg.eq(index).find("img").attr("src")
        }
        
    }
    /*20140630banner动画*/
    IU.main.bannerAnimate = function(){
        $(".mainImg").animate({"top":"-80px"},2000);
        $(".showTip").animate({"opacity":"1"},2000);
        /**/
        $(".freeImg").animate({"top":"-73px"},2000);
        $(".freeTip").animate({"opacity":"1"},2000);
        
        /*小旅行*/
        $(".minTravelImg").animate({"top":"-80px"},2000);
        $(".minTravelTip").animate({"opacity":"1"},2000);
        /*大巴游*/
        $(".bustravalImg").animate({"top":"-80px"},2000);
        $(".bustravalTip").animate({"opacity":"1"},2000);
        /*城际游*/
        $(".citytravalImg").animate({"top":"-80px"},2000);
        $(".citytravalTip").animate({"opacity":"1"},2000);
    }
	/*
    IU.main.payResultDialog = function (){
        $("#payResult").on("click",function(){
			IU.util.dialog({'id':'PayDialog','width':'490','height':'252'})
        })
    }*/
    
    IU.main.initCalendar = function (){
        var S = KISSY;
        if (S.Config.debug) {
            var srcPath = "../js/";
            S.config({
                packages:[
                    {
                        name:"gallery",
                        path:srcPath,
                        charset:"utf-8",
                        ignorePackageNameInUri:true
                    }
                ]
            });
        }
        S.use('../js/index', function(S, Calendar) {
            var $ = S.all;

            /**
             * 静态日历演示
             *
             * 基本参数配置使用实例
             */
            var hasDataDay = $("#J_Calendar").attr("nomal")+"-01";
            var calendar = new Calendar({
                'container': '#J_Calendar',
                count:1,
                isAutoSwitch:true,
                date:hasDataDay,
                minDate:new Date,
                isHoliday:false
            });
            var nowTitle = $("#J_Calendar h4");
            var oNowDate = nowTitle.html();
			var oLen = $("#J_Calendar td").length;
			var oTable = $("#J_Calendar table");
			var oTd = $("#J_Calendar td");
			/* for(var i = 0;i<oLen;i++){
				$("#J_Calendar td").eq(i).remove()
			} */
			if(oNowDate)
			{
            oNowDate = oNowDate.match(/\d+/g);
            //console.log(oNowDate[1])
            var oMth = oNowDate[1];
            var oPrevM = (oMth-1)<1?12:(oMth-1);
            var oNexM = (Number(oMth)+Number(1))>12?1:(Number(oMth)+Number(1));
            $(".prev-btn").html(oPrevM+"月")
            $(".next-btn").html(oNexM+"月")
            var pro_id = $('#J_Calendar').attr('pro_id');
			var is_fz = $('#J_Calendar').attr('is_fz');
			if(is_fz)
			{
			var m_url = '/ajax/calendar.php?p_id='+pro_id+'&fz='+is_fz;
			}
			else
			{
			var m_url = '/ajax/calendar.php?p_id='+pro_id;
			}
				myAjax(m_url);
			}
            //日期点击事件
			var pid = $('#pid').val();
            calendar.on('dateclick', function(e) {
				var selectedDate = this.get('selectedDate');
				var oCurDate = selectedDate.split("-").join("");
				ext(pid,pro_id,oCurDate,is_fz)
            });
            
            calendar.on('prevmonth', function(e) {
                //$("#J_Calendar h4").html(10)
                var nowTitle = $("#J_Calendar h4");
                var oNowDate = nowTitle.html();
                oNowDate = oNowDate.match(/\d+/g);
				//console.log(oNowDate)
                var oMth = oNowDate[1];
                var oPrevM = (oMth-1)<1?12:(oMth-1);
                var oNexM = (Number(oMth)+Number(1))>12?1:(Number(oMth)+Number(1));
                $(".prev-btn").html(oPrevM+"月")
                $(".next-btn").html(oNexM+"月")
				if(parseInt(oNowDate[1])<10)
				{
					var m = '0'+oNowDate[1];
				}
				else
				{
					var m = oNowDate[1];
				}
				var ym = oNowDate[0]+m
				if(is_fz)
				{
				var m_url = '/ajax/calendar.php?p_id='+pro_id+'&fz='+is_fz+'&mon='+ym;
				}
				else
				{
				var m_url = '/ajax/calendar.php?p_id='+pro_id+'&mon='+ym;
				}
                myAjax(m_url)
            });
            calendar.on('nextmonth', function(e) {
                var nowTitle = $("#J_Calendar h4");
                var oNowDate = nowTitle.html();
                oNowDate = oNowDate.match(/\d+/g);
				//console.log(oNowDate)
                var oMth = oNowDate[1];
                var oPrevM = (oMth-1)<1?12:(oMth-1);
                var oNexM = (Number(oMth)+Number(1))>12?1:(Number(oMth)+Number(1));
                $(".prev-btn").html(oPrevM+"月")
                $(".next-btn").html(oNexM+"月")
				if(parseInt(oNowDate[1])<10)
				{
					var m ='0'+oNowDate[1];
				}
				else
				{
					var m = oNowDate[1];
				}
				var ym = oNowDate[0]+m
				if(is_fz)
				{
				var m_url = '/ajax/calendar.php?p_id='+pro_id+'&fz='+is_fz+'&mon='+ym;
				}
				else
				{
				var m_url = '/ajax/calendar.php?p_id='+pro_id+'&mon='+ym;
				}
                myAjax(m_url)
            });
            
        })
        function getMonth(oDate){
            
        }
		function ext(pid,erp_id,time,fz)
		{
			 var html = $.ajax({
			  url: "/ajax/is_day_online.php?erp_id="+erp_id+"&reserve_time="+time,
			  async: false
			 }).responseText;
			var res = eval('('+html+')')
			 if(res.status == 0)
			 {
				 msg('温馨提示',res.message,'1');
				 return false;
			 }
			 else if(res.status == 1)
			 {
				return executes(erp_id,pid,time,fz)
			 }
		}
		function executes(erp_id,pid,time,fz)
		{
			var aHref = "/detail/add_reserve.php?erp_id="+erp_id+"&pid="+pid+"&reserve_time="+time;
			if(fz)aHref += "&from=fenzhan";
			$.colorbox({iframe:true,width:672,"href":aHref});
            var ie6=!-[1,]&&!window.XMLHttpRequest;
    		var oH = $(document).height();
    		if(ie6){
    			$("#cboxOverlay").css({"height":oH,"top":"0","position":"absolute"})
    		}    	
		}
        function myAjax(link){
            $.ajax({
                type:"POST",
				url:link,
                //url:"/static/js/data.json?"+Math.random(),
                dataType:"text",
                //contentType:"application/x-www-form-urlencoded",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success:function(resp_data, resp_status){ //console.log(resp_data);
                var res = eval('('+resp_data+')');
                    initCalData(res, resp_status)
                    
                },
                error:function(XMLHttpRequest, textStatus, errorThrown) {
  //alert(XMLHttpRequest.status);
    //              alert(XMLHttpRequest.readyState);
                    //console.log(0);
                }
                })
        }
        function transdate(endTime){
            var date=new Date();
            date.setFullYear(endTime.substring(0,4));
            date.setMonth(endTime.substring(5,7)-1);
            date.setDate(endTime.substring(8,10));
            date.setHours(endTime.substring(11,13));
            date.setMinutes(endTime.substring(14,16));
            date.setSeconds(endTime.substring(17,19));
            return Date.parse(date)/1000;
        }
        function initCalData(resp_data, resp_status){
            var oData = resp_data;
            //console.log(oData)//201405{};
            var oCurrentDate = new Date()
            var year = oCurrentDate.getFullYear();
            var month = oCurrentDate.getMonth()+1;
            if(month<10)month = '0'+month;
            var day = oCurrentDate.getDate();
            if(day<10)day = '0'+day;
            var times = year+'/'+month+'/'+day;
            if(oData != '1'){
				for(var s in oData)
				{ 
					var oDatas = oData//月份中的日 05月20,23 06月 03,04中的json值
					var nowTitle = $("#J_Calendar .inner h4");
					var oNowDate = nowTitle.text();
					//console.log(oNowDate);
					oNowDate = oNowDate.match(/\d+/g);
					oNowYear = oNowDate[0];
					oNowMonth = oNowDate[1]=oNowDate[1].length<2?'0'+oNowDate[1]:oNowDate[1];//日历中的月份
					oNowDate = oNowDate[0]+oNowDate[1]//201405
					//console.log(oNowDate);
					var oTd = nowTitle.next("table").find("td:not('.disabled')");
					var tLen = oTd.length;
					for(var i =1;i<=tLen;i++)
					{
						var j=i-1;
						//console.log(j) //有数据的天 20 23 03 04  
							var oTdInner = $(oTd[j]).find("strong").text();//日历中的日期1,2,3-31
							//console.log(oTdInner)
							var oTdInners = oTdInner<10?'0'+oTdInner:oTdInner;
						   //console.log(oTdInners)
						   //console.log(i)
							if(oDatas[oTdInners]!= undefined)
							{
								var isShow = oDatas[oTdInners].is_show;
								var lastData = oDatas[oTdInners].last_date;
								var dkc = oDatas[oTdInners].dkc;
								var dangqian = transdate(times);
								var oDeadLine = transdate(lastData);
								var min_price = oDatas[oTdInners].min_price;
								var original_price = oDatas[oTdInners].originalPrice;
								var wab_price = oDatas[oTdInners].web_price;
								var cookied = oDatas[oTdInners].cookie;
								var currency_symbol = oDatas[oTdInners].currency_symbol;
								var Fz = oDatas[oTdInners].fz;
								var exchange = oDatas[oTdInners].exchange;
								var confirmType = oDatas[oTdInners].confirmType;//2显示 其他隐藏
								//console.log(oDatas[oTdInners]);
								//console.log(oDatas[oTdInners]);
								original_price = wab_price?wab_price:original_price;
								if(isShow == '1' && dangqian <= oDeadLine && dkc == '1')
								{
									if(parseInt(original_price) > parseInt(min_price))
									{
										
										if(Fz == 'fenzhan' && cookied > '200')
										{
										var m_price = Math.round(parseInt(parseInt(min_price)/exchange)/10)*10-1;
										var o_price = Math.round(parseInt(parseInt(original_price)/exchange)/10)*10-1;
										$(oTd[i-1]).removeClass('disabled').addClass("yp").find("b.price").show().find("em").text(m_price).end().find("i").text(currency_symbol).end().siblings("b.cux").show().find("em").text(o_price).end().find("i").text(currency_symbol); 
										}
										else
										{
										if(confirmType==2){
											$(oTd[i-1]).removeClass('disabled').addClass("yp").find(".shanjiao").show().end().find("b.price").show().find("em").text(parseInt(min_price)).end().siblings("b.cux").show().find("em").text(parseInt(original_price));
										}else{
											$(oTd[i-1]).removeClass('disabled').addClass("yp").removeAttr("onmouseout").removeAttr("onmouseover").find(".shanjiao").hide().end().find("b.price").show().find("em").text(parseInt(min_price)).end().siblings("b.cux").show().find("em").text(parseInt(original_price));
											}
										}
									}
									else
									{
										if(Fz == 'fenzhan' && cookied > '200')
										{
											var m_prices = Math.round(parseInt(parseInt(min_price)/exchange)/10)*10-1;
											$(oTd[i-1]).removeClass('disabled').addClass("yp").find("b.price").show().find("em").text(m_prices).end().find("i").text(currency_symbol);
										}
										else
										{
											if(confirmType==2){
												$(oTd[i-1]).removeClass('disabled').addClass("yp").find(".shanjiao").show().end().find("b.price").show().find("em").text(parseInt(min_price)).end();
											}else{
												$(oTd[i-1]).removeClass('disabled').addClass("yp").removeAttr("onmouseout").removeAttr("onmouseover").find(".shanjiao").hide().end().find("b.price").show().find("em").text(parseInt(min_price)).end();
											}
										}
									}
								}
								/*if(isShow == '0' && dangqian > oDeadLine)
								{
									$(oTd[i-1]).removeClass('disabled').find("b").show().css("color","#f00").find("em").text(min_price);
									$(oTd[i-1]).find("span").show().attr("class","shouqin").text("售馨")
								}*/
								else
								{
									$(oTd[i-1]).addClass('disabled wp');
								}
							}
							else
							{
								$(oTd[i-1]).addClass('disabled wp');
							}
					}
				}
			}
			else
			{
				var nowTitle = $("#J_Calendar .inner h4");
				var oTd = nowTitle.next("table").find("td:not('.disabled')");
				var tLen = oTd.length;
				for(var i =0;i<tLen;i++){
					$(oTd[i]).addClass('disabled wp');
				}
			}
            
        }
    }
    
    function initEvent(){
        IU.main.navMenu();
        IU.main.menuClick({"id":"#menuBox"});
        IU.main.cBoxClick({"id":"#menuBox"});
        IU.main.sortList({"id":"#sortList"});
        //IU.main.tabSelectOut({"id":"#xq_center"});
        IU.main.tabSelect({"id":"#xq_center"});
        //IU.main.tabSelect({"id":"#xq_hotel"});
        IU.main.fixedMenu({"id":"#xq_center"});
        IU.main.goTop({"id":"#goTop"});
        IU.main.imgShow({"id":"#imgShowBox"});
        IU.main.btnSub({"className":".btnSub"});
        IU.main.btnContact();
        IU.main.showMenu()
        IU.main.bannerAnimate()
        //IU.main.payResultDialog()
        IU.main.tabComm({"id":"#Coupons","on":"yh_li_click","tabClass":"tabBtn","tabCont":"tabCont"})
    }
    /**初始化**/
    IU.main.init = function(){
    	initEvent();
    }
    
})();
/**执行初始化**/
$(function(){
	IU.main.init();
    $(window).on('scroll', function(){
        var a = $(window).scrollTop();
        //console.log(a)
        $(".lianx").scrollTop(a)
    })
})
function showTips(obj){
	var This = $(obj);
	var click_box2 = This.find(".click_box2");
	var click_box3 = This.find(".click_box3");
	var oTable = This.parent().parent();
	var oTd = oTable.find("td");
	var oLen = oTable.find("td").length;
	var oFlag = This.hasClass("yp");
	var oTrIndex = This.parent().index();
	if(oFlag&&oTrIndex<=2){
		click_box2.show();
	}else if(oFlag&&oTrIndex>2){
		click_box3.show();
	}
}
function hideTips(obj){
	var This = $(obj);
	var click_box2 = This.find(".click_box2");
	var click_box3 = This.find(".click_box3");
	click_box2.hide();
	click_box3.hide();
}
//统一请求筛选
function request_filtor(JsonRequest)
{   
    JsonRequest = get_filtor_action(JsonRequest);
    var page    = JsonRequest.page;
    delete JsonRequest.page;
    //根据第一次加载的条数判断
    var contBox  = $("#list_content_show");
	var is_fenzhan  = $("#is_fenzhan").val();
    var the_page = parseInt($('#the_page').html());
    if('undefined' != typeof($('#the_page').html())
        &&  parseInt($('#the_page').html()) == 2)
    {
        var pro_type = $('#pro_type').html();
		if(is_fenzhan)
		{
		var url = '/ajax/list.php?act=product_search&pro_type='+pro_type+'&page='+page+'&is_fz=1';
		}
		else
		{
        var url = '/ajax/list.php?act=product_search&pro_type='+pro_type+'&page='+page;
		}
    }
    else
    {
        var destid  = $('#destid').html();
		if(is_fenzhan)
		{
		var url = '/ajax/list.php?act=product_search&destid='+destid+'&page='+page+'&is_fz=1';
		}
		else
		{
        var url = '/ajax/list.php?act=product_search&destid='+destid+'&page='+page;
		}
    }

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data:JsonRequest,
        beforeSend:function(){
            $("<div id='loading'><b class='loading_L'></b><div class='loading_C'><p><a></a>数据加载中</p></div><b class='loading_L loading_R'></b></div>").show();
        },
        success:function(data){
            if(data != null || data.length > 0)
            {
                contBox.html('');
                data = jQuery.parseJSON(data);
                $('#totalRows').html(data.total);
                contBox.html(data.view);
                var pagestr = data.page ? data.page : '';
                $('#show_page').html(pagestr);
                //滑动到 第一个产品起始处
                $("html,body").animate({scrollTop : $(".view").offset().top}, 300);
                $("img.lazy").lazyload({
                    placeholder : "/static/img/loading_tu.jpg",
                    effect: "fadeIn"
                });
            }
        }
    });
    
            
}
//获取表单请求动作 -筛选-排序-分页-加载块
function get_filtor_action(JsonRequest)
{
    // 筛选
    if(typeof(JsonRequest.search) == "undefined" || JsonRequest.search.length < 1)
    {
        var cBoxAll = $('#menuBox').find(".checkbox_style");//全部选择框
        var filtor = collect_filtor_data(cBoxAll);
        JsonRequest['search'] = filtor.search;
        JsonRequest['tripTime'] = filtor.tripTime;
    }

    // 请求第几页
    if(typeof(JsonRequest.page) == "undefined" || JsonRequest.page.length < 1)
    {
       JsonRequest.page = $('#show_page a[class="current"]').text();
    }

    // 排序规则
    if(typeof(JsonRequest.orderby) == "undefined" || JsonRequest.orderby.length < 1)
    {
       JsonRequest['orderby'] = get_order_info();
    }

    return JsonRequest;
}

//收集筛选信息
function collect_filtor_data(ObjBoxAll)
{
    var ValueTripTime = new Array();
    var cBoxTripTime = ObjBoxAll.filter($('[name="trip_time"]'));
    cBoxTripTime.each(function()
    {
        if($(this).attr('myvalue') != -1)
        {
            ValueTripTime.push($(this).attr('myvalue'));
        }
    });

    //初始化存储 --name1=v1|name2=v2,v3,v4|name3=v5....
	var search = '';
    var style_checked_add = 'checkbox_style_click';
    var style_checked     = 'checkbox_style checkbox_style_click';

    var cBoxAllChecked = ObjBoxAll.filter($('[class="'+style_checked+'"]'));
    var cBag = new Array();
    cBoxAllChecked.each(function()
    {
        var cName  = $(this).attr('name');
        var cValue = $(this).attr('myvalue');
        if(cName.substr(-3) == 'all') return true;//
        if(typeof(cBag[cName])=="undefined")
        {
            cBag[cName] = cValue;
        }
        else
        {
            if(cBag[cName].length != 0)
            {
                cBag[cName] += ',';
            }
            cBag[cName] += cValue;
        }
    });
    //拼接字符串
    var search = '';
    for(var j in cBag)
    {
        if(search.length != 0)
        search += '|';
        search += j+'='+cBag[j];
    }
    //console.log(search);
    return {search:search,tripTime:ValueTripTime.join(',')};
 }


// 排序规则获取{1:ASC,-1:DESC}
function get_order_info()
{
	var orderby = '';
	var sort_list	= $('#sortList').find('li span');
	var sort_down	= sort_list.filter('.down_on').attr('id');
	var sort_up		= sort_list.filter('.up_on').attr('id');
	if(typeof(sort_down) != 'undefined')
	{
		orderby = sort_down+'=-1';
	}
	else
	{
		orderby = sort_up+'=1';
	}
	return orderby;
}

//ajax分页
function pageto(page)
{
    var JsonRequest = {page:page};
    request_filtor(JsonRequest);
}