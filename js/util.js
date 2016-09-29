(function() {
	/*
	 * 自由行，公共JS
     +----------------------------------------------------
     * @author jianguang.ma 2014.3.13
	 */
    /*
	 * 提供一些工具方法  与业务逻辑相关性较大  
	 */
	IU.namespace('IU.util');
	IU.util.validEmail = function (str){
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;        
		return reg.test(str);
	}
    /**弹窗 用法 IU.util.dialog({id:"id",cssName:value}) 例如IU.util.dialog({id:"dialog",width:500,height:300})**/

	IU.util.dialog = function(myOption){
        var iFrameId = myOption.iFrameId;
        var overLayTop = myOption.overLayTop;//遮罩层位置设置
        var aHref = myOption.aHref;
        var bodyClick = myOption.bodyClick;//点击遮罩层是否可以关闭 0不可关闭 默认可以关闭
        var overLayer =myOption.overLayer;//是否显示遮罩 默认显示 0不显示
        var oOverlay = $("<div id = 'overlay'></div>");
        if(overLayer!='0'){
            $("body").prepend(oOverlay);
        }
        //$("body").css({"overflow":"hidden"})
        var oDialog = $("#"+myOption.id);
        var oCloseBtn = $(".close");
        var myOpacity = myOption.myOpacity||0.8;
        //var oCloseBtn = $("<div class = 'oCloseBtn'></div>");
        //oDialog.prepend(oCloseBtn);        
        var oDialogTop = parseInt(($(document).height() - myOption.height)/2);
        var ie6=!-[1,]&&!window.XMLHttpRequest;
		
        if(ie6){
            var oDialogLeft = parseInt(($("body").width() - myOption.width)/2);
            $("#overlay").css({"opacity":myOpacity,"left":0,"position":"absolute"});
            oDialog.css({"position":"absolute"});
            var defaultOp = {zIndex:'90000',left:oDialogLeft,top:oDialogTop,"display":"block"};
            $("html,body").animate({scrollTop : oDialogTop-160}, 300);
            $("select").css("display","none")
        }if (self != top) {
            oDialog.css({"top":"126px","left":"112px","position":"absolute","display":"block"})
        }else{
            $("#overlay").css({"opacity":myOpacity,"left":0,"position":"absolute"});
            if(myOption.height>650){
                oDialogTop = parseInt($(window).scrollTop()+115+($(window).height() - myOption.height)/2);
                oDialog.css({"position":"absolute","top":oDialogTop});
            }else{
                oDialogTop = parseInt(($(window).height() - myOption.height)/2);
                oDialog.css({"position":"fixed","top":oDialogTop});
                
            }
            
        	var oDialogLeft = parseInt(($(window).width() - parseInt(myOption.width))/2);
            var defaultOp = {zIndex:'90000',left:oDialogLeft,top:oDialogTop,"display":"block"};
        }
        
        var newOptions = $.extend(defaultOp,myOption);
        oDialog.css(newOptions);
        $("#"+iFrameId).attr("src",aHref);
        var oHeight = $("#myFrame").contents().find("body").height();
        if(overLayTop){
            oOverlay.height($(document).height()-overLayTop);
            oOverlay.css({"top":overLayTop+"px"})
        }
        else{
            oOverlay.height($(document).height());
        }
        oCloseBtn.click(function(event){
            oOverlay.remove();
            if($("#title").length){
                $("#title").remove();
                $("#ads").remove();
                $("#conect").remove()
            }
            oDialog.css({"display":"none"});
            //$("body").css({"overflow":"auto"})
            $("body").removeAttr("overflow");
            $("select").css("display","")
            //oCloseBtn.remove();
        });
        oOverlay.click(function(event){
            if(bodyClick=='0'){return false;}
            oOverlay.remove();
            if($("#title").length){
                $("#title").remove();
                $("#ads").remove();
                $("#conect").remove()
            }
            oDialog.css({"display":"none"});
            //$("body").css({"overflow":"auto"})
            $("body").removeAttr("overflow");
            $("select").css("display","")
            //oCloseBtn.remove();
        });
    }
    /**爱游首页面焦点图**/
    /**图片展示效果
    * @function
	* @name focusImgBox
	* @returns void
	* @example 使用时IU.util.focusImgBox({key:value,"color":"#f00",id:yourId}) 可以自己添加其他需要的样式
    *
    **/
    IU.util.focusImgBox = function(myOptions){
        var focusImgBox = $(myOptions.id);
        var oBigImgBox = focusImgBox.find("ul li");
        var oSmallImgBox = focusImgBox.find("div");
        var index = 0;
        var len = oBigImgBox.length;
        var timerC;
        var i = 0;
        if(len<=1){
            oSmallImgBox.hide();
            return;
        }else{
            oSmallImgBox.animate({"bottom":"20px","opacity":"1"},1000);
            for(i=0;i<len;i++){
                var oA = $("<a></a>");
                oSmallImgBox.append(oA);
            }
        }
        var oSmallBtn = oSmallImgBox.find("a");
            showImg(0);
        //oSmallBtn.eq(0).addClass("sy_banner_dian_on");
        oSmallBtn.on("click",function(){
            index = $(this).index();
            showImg(index)   
        }).eq(0).mouseover();
       
        function showImg(index){
            oSmallBtn.eq(index).addClass("sy_banner_dian_on").siblings().removeClass("sy_banner_dian_on");
            var oSrc = oBigImgBox.find("img").eq(index).attr("nrc");
            oBigImgBox.eq(index).find("img").attr("src",oSrc);
            //oBigImgBox.eq(index).show().siblings().hide();
			oBigImgBox.eq(index).css({"z-index":2,"display":"block"}).animate({"opacity":"1"},1000).siblings().css({"z-index":1}).animate({"opacity":"0"},1000);
        }
        focusImgBox.hover(function(){
            clearInterval(timerC);
        },function(){
            clearInterval(timerC);
			timerC = setInterval(function(){
                showImg(index);
                index++;
                if(index==len){
                    index = 0;
                }
            },4000);
        }).trigger("mouseout")
    }
    
    /**模拟下拉菜单
    * @function
	* @name divSelect
	* @returns void
	* @example 使用时IU.util.divSelect({key:value,"color":"#f00",id:yourId}) 可以自己添加其他需要的样式
    *
    **/   
    IU.util.divSelect = function(myOptions){
        var oSselBox = $(myOptions.clsName);
        var oOptions = oSselBox.find("ul li");
        var oSelArrow = oSselBox.find("b");
        oSselBox.click(function(event){
            //oSselBox.find('ul').addClass("displayNONE");
            $(this).find("ul").toggleClass("displayNONE");
            return false;
        })
        oOptions.click(function(event){
            // $("ul[mychoose]").hide();
            var oTarget = event.target;
            oVal = $(oTarget).text();
            //自定义 下拉框改变价格
            if(myOptions.flag == 'yxz')
            {
                var x_obj = $(this);
                var pinfo = {};
                pinfo.room_num = oVal;
                pinfo.find_pb  = $('#public_select').text();
                pinfo.find_df  = $('#default_select').text();
                pinfo.find_cr  = $(this).parents('.Up_Down').find('span').first().text();//定位参数
                
                $.post('/ajax/reserve_select.php?item=2', pinfo, function(data, textStatus, xhr) {
                    if(data)
                    {
                        x_obj.parents('.detail_list_hom_2_3').next().find("ul li span").text(data+'元');
                    }
                });
            }
            $(oTarget).parent().parent().find("input").attr("value",oVal);
            $(oTarget).parent("ul").addClass("displayNONE");
            oOptions.parent().addClass("displayNONE");
            return false;
        })
        $(document).click(function(){
            oOptions.parent().addClass("displayNONE");
        })
    }
    
    /**自定义下拉菜单
    * @function
	* @name divSelect
	* @returns void
	* @example 使用时IU.util.divSelect({key:value,"color":"#f00",id:yourId}) 可以自己添加其他需要的样式
    *
    **/   
    IU.util.CommSelect = function(id){
        var oParent = $(id);
        var oInput = oParent.find("input");
        var oOptions = oParent.find(".optionBox li");
        
        oInput.click(function(){
            var oNowId = $(this).parents(".showSel").attr("id");
			var nowClass = oParent.hasClass("showSel");
			if(!nowClass){
				var oNowParent = oParent;
			}else{
			var oNowParent = $("#"+oNowId);
			}
			oNowParent.find(".optionBox").toggleClass("displayNONE");
			
            return false
        })
        
        oOptions.on("click",function(){
            var nowClass = oParent.attr("class");
			if(nowClass!="showSel"){
				var oNowParent = oParent;
			}else{
				var oNowId = $(this).parents(".showSel").attr("id");
				//console.log(oNowId)
				var oNowParent = $("#"+oNowId);
			}
			
			var nowOptBox = oNowParent.find(".optionBox");
			var nowInput = oNowParent.find("input");
			var oVal = $(this).text();
			var oFor = $(this).attr("for");
            nowInput.val(oVal).attr("for",oFor);
            nowOptBox.addClass("displayNONE");
            return false;
        })
        $(document).click(function(){
            $(".optionBox").addClass("displayNONE");
        })
    }
	IU.util.infoSelect = function(){
        var oParent = $(".showSel");
        var oInput = oParent.find("input");
        var oInput2 = oParent.find(".neirong_img,b,span");
        var oOptions = oParent.find(".optionBox li");
        oInput.click(function(){
			var nowParent = $(this).parents(".showSel");
			nowParent.find(".optionBox").toggleClass("displayNONE");
			nowParent.parents("li").siblings().find(".optionBox").addClass("displayNONE")
            return false
        })
        oInput2.click(function(){
			var nowParent = $(this).parents(".showSel");
			nowParent.find(".optionBox").toggleClass("displayNONE");
			nowParent.parents("li").siblings().find(".optionBox").addClass("displayNONE")
            return false
        })
        oOptions.on("click",function(){
			var nowParent = $(this).parents(".showSel");
			var nowOptBox = nowParent.find(".optionBox");
			var nowInput = nowParent.find("input");
			var oVal = $(this).text();
			var oFor = $(this).attr("for");
            nowInput.val(oVal).attr("for",oFor);
            nowOptBox.addClass("displayNONE");
            return false;
        })
        $(document).click(function(){
            $(".optionBox").addClass("displayNONE");
        })
    }
    IU.util.divTip = function(){
        var oTitle = $(".img");
        
        oTitle.hover(function(){
                var oFlag = $(this).find("div").length;
                if(oFlag!=0){
                    $(this).find("div").show()
                }else{
                    $(this).next("div").show()
                }
            },
            function(){
                $(this).next("div").hide()
                $(this).find("div").hide()
        })
    }
    IU.util.showTip = function(){
        var oTitle = $(".show_tip");
        var ie6=!-[1,]&&!window.XMLHttpRequest;
        oTitle.hover(function(){$(this).parent().next(".divTip").show();
            if(ie6){
            //$(this).parents(".posi_lefy").nextAll(".aa").find(".Select_Num_B:first").hide();
            //alert("a")
            }
        },
            function(){
                $(this).parent().next(".divTip").hide();
                //$(this).parents(".posi_lefy").nextAll(".aa").find(".Select_Num_B:first").show();
        })
        $(".divTip").hover(function(){$(this).show();
            if(ie6){
            //$(this).parents(".posi_lefy").nextAll(".aa").find(".Select_Num_B:first").hide();
            }
        },
            function(){
                $(this).hide();
                //$(this).parents(".posi_lefy").nextAll(".aa").find(".Select_Num_B:first").show();
        })
    }
	IU.util.showTip2 = function(){
        var oTitle = $(".show_tip");
        oTitle.hover(function(){$(this).next(".divTip").show();},
            function(){
                $(this).next(".divTip").hide()
        })
        $(".divTip").hover(function(){$(this).show();},
            function(){
                $(this).hide()
        })
    }
    IU.util.dmxImgTip = function(id){
        var oParent = $(id);
        var oTitle = oParent.find(".show_tip");
        oTitle.hover(function(){
            $(this).find(".divTip").show().end().siblings().find(".divTip").hide();
        },
            function(){
                $(this).find(".divTip").hide()
        })
    }
    /**弹窗 用法 IU.util.showAlert({title:"弹窗的标题",content:弹窗的提示信息}) **/

	IU.util.showAlert = function(myOption){
        var oOverlay = $("<div style='z_index:99999;' id = 'overlay' class='change_capacity_bg'></div>");
        var oTitle = myOption.title?myOption.title:"温馨提示";
        var oReload = myOption.oReload?myOption.oReload:"0";
		var callBackOk = myOption.callBackOk;
		var callBackCancel = myOption.callBackCancel;
		var myUrl = myOption.myUrl;//点击确定的url
		
		var MYBTNWA = myOption.MYBTNWA;
		var MYBTN = myOption.MYBTN?myOption.MYBTN:"确定";
        $(".Select_Num").css("display","none")
        var oAlertTip =
        '<div id ="oAlert" class="alertBox">'+
            '<div class="mat_cue_head">'+
                            '<div class="cue_h_bg">'+
                                '<span class="tishi_icon"></span>'+
                                '<span class="tishi_zi">'+oTitle+'</span>'+
                                '<span class="tishi_close"></span>'+
                            '</div>'+
                        '</div>'+
                    '<div class="mat_cue_con">'+
                        '<p>'+myOption.content+'</p>'+
                        '<div id="okBtn" class="right_btn"><a href='+myUrl+' target="_blank">'+MYBTN+'</a></div>'+
                    '</div>'+
                    '<div class="mat_cue_foot"></div>'+
        '</div>';
        
        $("body").prepend(oOverlay,oAlertTip);
		if(!myUrl){
			$("#okBtn").find("a").removeAttr("target");
			$("#okBtn").find("a").removeAttr("href");
		}
        var oAlertBox = $("#oAlert");//提示信息窗口
        var oHeight = oAlertBox.outerHeight();
        var oWidth = oAlertBox.outerWidth();      
        var oAlertBoxTop = parseInt(($(window).height() - oHeight)/2-100);
        var oAlertBoxLeft = parseInt(($(window).width() - oWidth)/2);
        var ie6=!-[1,]&&!window.XMLHttpRequest;
        if (self != top) {
            oAlertBox.css({"top":"126px","left":"112px","position":"absolute"})
        }
        
        if(ie6){
            var oAlertBoxTop = parseInt(($(document).height() - oHeight)/2);
            var oAlertBoxLeft = parseInt(($(window).width() - 422)/2);
            oAlertBox.css({"top":oAlertBoxTop,"left":oAlertBoxLeft,"position":"absolute"})
            $("html,body").animate({scrollTop : oAlertBox.offset().top-160}, 300);
            $("select").css("display","none")
        }
        if (self != top&&ie6) {
            oAlertBox.css({"top":"126px","left":"112px","position":"absolute"})
            $(".CR_ET").css("display","none")
        }
        else if(self == top){
            oAlertBox.css({"top":oAlertBoxTop,"left":oAlertBoxLeft})
        }
        
        $("#overlay").css("opacity","0.8");
        oOverlay.height($(document).height());
        if(oReload==undefined||oReload==null||oReload==0){
            $(".tishi_close").click(function(event){
                oOverlay.remove();
                oAlertBox.remove();
                $(".Select_Num").css("display","")
                $(".CR_ET").css("display","")
                $("select").css("display","")
            });
			$("#okBtn").click(function(event){
                
				if(callBackOk){
					callBackOk()
				}
                oOverlay.remove();
                oAlertBox.remove();
                $(".Select_Num").css("display","")
                $(".CR_ET").css("display","")
                $("select").css("display","")
            });
        }
        else{
            $(".tishi_close,#okBtn").click(function(event){
                //alert(oReload)
				if(callBackCancel){
					callBackCancel()
				}
                location.reload() 
            });
        }
        
    }  
    /***支付订单***/
    IU.util.orderAlert = function(myOption){
        var oOverlay = $("<div id = 'overlay' class='change_capacity_bg'></div>");
        var oAlertTip =
		'<div class="change_capacity_bg alertBox">'+
			'<div class="change_capacity_xq clear">'+
				'<p><b></b>提交订单前请您认真核对信息</p>'+
				'<ul>'+
					'<li>'+myOption.info+'</li>'+
					'<li>'+myOption.he+'</li>'+
				'</ul>'+
			'</div>'+
		'</div>';
        $("body").prepend(oOverlay,oAlertTip);
        var oAlertBox = $("#oAlert");//提示信息窗口
        var oHeight = oAlertBox.outerHeight();
        var oWidth = oAlertBox.outerWidth();      
        var oAlertBoxTop = parseInt(($(window).height() - oHeight)/2);
        var oAlertBoxLeft = parseInt(($(window).width() - oWidth)/2);
        oAlertBox.css({"top":oAlertBoxTop,"left":oAlertBoxLeft})
        $("#overlay").css("opacity","0.5");
        oOverlay.height($(document).height());
        $(".tishi_close,#okBtn").click(function(event){
            oOverlay.remove();
            oAlertBox.remove();
        });
    }
	IU.util.orderAlert = function(myOption){
        var oOverlay = $("<div id = 'overlay' class='change_capacity_bg'></div>");
        var oAlertTip =
		'<div class="change_capacity_bg alertBox">'+
			'<div class="change_capacity_xq clear">'+
				'<p><b></b>提交订单前请您认真核对信息</p>'+
				'<ul>'+
					'<li>'+myOption.info+'</li>'+
					'<li>'+myOption.he+'</li>'+
				'</ul>'+
			'</div>'+
		'</div>';
        $("body").prepend(oOverlay,oAlertTip);
        var oAlertBox = $("#oAlert");//提示信息窗口
        var oHeight = oAlertBox.outerHeight();
        var oWidth = oAlertBox.outerWidth();      
        var oAlertBoxTop = parseInt(($(window).height() - oHeight)/2);
        var oAlertBoxLeft = parseInt(($(window).width() - oWidth)/2);
        oAlertBox.css({"top":oAlertBoxTop,"left":oAlertBoxLeft})
        $("#overlay").css("opacity","0.5");
        oOverlay.height($(document).height());
        $(".tishi_close,#okBtn").click(function(event){
            oOverlay.remove();
            oAlertBox.remove();
        });
    }
	IU.util.search = function(){
    	var oBtn = $(".head_ss b");
        var oInput = $(".head_ss input");
        var oKeyword = ''
        oInput.focus(function(){
            oKeyword = oInput.val()
            if(oKeyword=="搜索目的地、主题或关键字"){
                oInput.val("")
            }            
        })
        oInput.blur(function(){
            oKeyword = oInput.val()
            if(oKeyword==""){
                oInput.val("搜索目的地、主题或关键字")
            }            
        })
        oBtn.click(function(){
            searchlog();
            searchKeyword();
        })
        oInput.keydown(function(event){
            if(event.keyCode==13){
                searchlog();
                searchKeyword();
                oInput.focus()
                return false;
            }
        })
        function searchlog(){
            var oKey = oInput.val();
            $.ajax({
                cache: true,
                type: "POST",
                url:'/need/tongji.php?act=searchlog',
                data:{keyword:oKey},
                async: false,
                error: function(request) {
                    // alert("Connection error");
                },
                success: function(data) {
                }
            });
        }
        function searchKeyword(){
            oKeyword = oInput.val()
            if(oKeyword!="搜索目的地、主题或关键字"&&oKeyword!=""&&oKeyword.length<30){
                window.location.href="http://s.caissa.com.cn/"+oKeyword;
                //console.log(oKeyword)
            }
            if(oKeyword.length>30||oKeyword==""){
                IU.util.showAlert({"content":"搜索内容必须大于0小于30个字"});
                return false;
            }
            if(oKeyword=="搜索目的地、主题或关键字"){
                oInput.val("")
                IU.util.showAlert({"content":"搜索内容必须大于0小于30个字"});
                return false;
            }        
        }
    }
	/**发送短信验证码计时**/
    
    IU.util.sendMsg = function(id,mobileId,time,txt){
        var eventId = $(id);
        var flag = true;
        var timer = null;
        var tNow = time;
        //eventId.click(function(){          
            var mobile = $(mobileId).val();
			var reg = /^(((13[0-9]{1})|(15[0-9]{1})|170|(18[0-9]{1}))+\d{8})$/g;
			if(reg.test(mobile)&&mobile!=""&&flag){
				eventId.css({"background":"#ccc"});
				//$(this).parent().find("b").show().attr("class","right");
				clearInterval(timer);
				timer = setInterval(run,1000);
				$('#yzm_dm_3').remove();
			}else{
				eventId.css({"background":"#1bbc9b"});
				//$(this).parent().find("b").show().attr("class","wrong");
				return false;
			}
		   
           flag = false;
        //})
        function run(){
        time--;
        eventId.html(time + "秒")
        if(time<1){
           //window.location.href = 'http://www.baidu.com';
           flag = true;
           time = tNow;
           eventId.html(txt).css({"background":"#1bbc9b"})
           clearInterval(timer);
        }
        //console.log(time)
        
        }
    }
	//得失焦点
	IU.util.focusChange = function(id,txt){
		$(id).on("focus",function(){
			var oVal = $(this).val();
			if(oVal==txt){
				$(this).val("")
			}else{
				$(this).val(oVal)
			}
		})
		$(id).on("blur",function(){
			var oVal = $(this).val();
			if(oVal==""){
				$(this).val(txt)
			}else{
				$(this).val(oVal)
			}
		})
	}
    IU.util.inputColor = function(){
        $(".flight_room input[type='text']").on('input',function(e){  
           $(this).css({"color":"#000"})
        }); 
    }
    /*延迟加载中默认图片居中显示*/
    IU.util.initImgPos = function(){
        $("img.lazy").parent().parent().css("text-align","center")
    }
    /*****签证左侧菜单******/
    IU.util.gaikuangFixed = function(id){
        var oLeftNav = $(id);
        oLeftNav.css({"position":"absolute","top":"20px","_top":"20px"});
        oLeftNav.find("ul").css({"position":"static"});
        $(window).scroll(function(){
            var oScrollTop = $(window).scrollTop();
            var oLength = oLeftNav.find("ul li").length;
            oMenuHeight = oLength*oLeftNav.find("ul li").outerHeight()+20;
            if(oScrollTop>=188){
                oLeftNav.removeAttr("style");
                oLeftNav.find("ul").removeAttr("style");
                oLeftNav.css({"position":"fixed","top":"0"});
            }else if(oScrollTop<188){
                oLeftNav.removeAttr("style");
                oLeftNav.find("ul").removeAttr("style");
                oLeftNav.css({"position":"absolute","top":"20px"});
            }
            if(oScrollTop>=$(document).height()-$(window).height()-50){
                oLeftNav.removeAttr("style");
                oLeftNav.find("ul").removeAttr("style");
                oLeftNav.find("ul").css({"position":"absolute","bottom":"0"});
                oLeftNav.css({"position":"absolute","bottom":"94px","height":oMenuHeight});
            }

        })
    }
	//机票信息页右侧浮动
	IU.util.fixBar = function(id){
		var fixBar = $(id);
		$(window).scroll(function(){
            var oScrollTop = $(window).scrollTop();
            if(oScrollTop>=188){
                fixBar.css({"position":"fixed","top":"0","right":"150px"});
            }else if(oScrollTop<188){
                fixBar.css({"position":"absolute","top":"188px","right":"150px"});
            }
        })
	}
	
    /*****概况左侧菜单******/
    IU.util.gaikuangFixed2 = function(id){
        var oBanner = $(".gaik_banner");
        var oLeftNav = oBanner.next(".gak_comment").find(".gak_left");
        var ie6=!-[1,]&&!window.XMLHttpRequest;
        
        oLeftNav.find("ul").css({"position":"static"});
        var oLength = oLeftNav.find("ul li").length;
        var oMenuHeight = oLength*oLeftNav.find("ul li").outerHeight();
		//alert(oMenuHeight)
        var t = $(document).height()-$(window).height()-50;
        //alert(oLeftNav.find("ul li").outerHeight())
        $(window).scroll(function(){
            var oScrollTop = $(window).scrollTop();
            var oFlag = oScrollTop-588;
            if(oScrollTop>=588){
                if(ie6){
                    oLeftNav.removeAttr("style");
                    oLeftNav.find("ul").removeAttr("style");
                    oLeftNav.css({"position":"absolute","top":oFlag});
                }else{
                    oLeftNav.removeAttr("style");
                    oLeftNav.find("ul").removeAttr("style");
                    oLeftNav.css({"position":"fixed","top":"0"});
                }
            }else if(oScrollTop<588){
                oLeftNav.removeAttr("style");
                oLeftNav.find("ul").removeAttr("style");
                oLeftNav.css({"position":"absolute","top":"0"});
            }
            if(oScrollTop>=t){
                if(oLength>1){
                    if(ie6){
                        oLeftNav.removeAttr("style");
                        oLeftNav.find("ul").removeAttr("style");
                        oLeftNav.css({"position":"absolute","top":oFlag});
                    }else{
                        oLeftNav.removeAttr("style");
                        oLeftNav.find("ul").removeAttr("style");
                        oLeftNav.find("ul").css({"position":"absolute","width":"195px","bottom":"0"});
                        oLeftNav.css({"position":"absolute","bottom":"0px","height":oMenuHeight+"px"});
                    }
                }
            }
        })
    }
	//浮动菜单
	IU.util.floatMenu = function(myOption){
		var floatMenu = $(myOption.id);
		var oRight = myOption.right;
		var oTop = myOption.top;
		var oBottom = myOption.bottom;
		var oStartPos = myOption.startPos;
		var oContLeft = $(".WavesofIslands_nr").offset().left;
		var oContWidth = $(".WavesofIslands_nr").width();
		var oLeft = oContLeft+oContWidth+5
		var oWinHeight = $(window).width();
		var oLiHeight = floatMenu.find("li").height();
		var oLength = floatMenu.find("li").length;
		var oMenuHeight = oLiHeight*oLength;
		//console.log(oLeft)
		var ie6=!-[1,]&&!window.XMLHttpRequest;
		
		if(oWinHeight<1280){
			floatMenu.css({"position":"absolute","top":oStartPos+"px","right":0+"px","height":oMenuHeight});
		}else{
			floatMenu.css({"position":"absolute","top":oStartPos+"px","left":oLeft+"px","height":oMenuHeight});
		}
		$(window).scroll(function(){
            var oScrollTop = $(window).scrollTop();
			var oPos = $(document).height()-$(window).height();
			//console.log(oPos+"--s"+oScrollTop+"--w"+$(window).height()+"--d"+$(document).height())
			if(ie6){
				if(oWinHeight<1280){
					floatMenu.css({"position":"absolute","right":0+"px"});
				}else{
					floatMenu.css({"position":"absolute","left":oLeft+"px"});
				}
				if(oScrollTop>=oStartPos){
					floatMenu.stop(true,true).animate({"top":oScrollTop},0)
				}else{
					floatMenu.stop(true,true).animate({"top":oStartPos},0)
				}
				
			}else{
				if(oWinHeight<1280){
					floatMenu.css({"right":0+"px"});
				}else{
					floatMenu.css({"left":oLeft+"px"});
				}
				if(oScrollTop>=oStartPos&&oScrollTop<$(document).height()-$(window).height()){
					floatMenu.css({"position":"fixed","top":0+"px","z-index":"909"});
				}else if(oScrollTop>=$(document).height()-$(window).height()){
					if(oBottom){
						floatMenu.removeAttr("style").css({"position":"fixed","bottom":oBottom+"px"});
					}else{
						floatMenu.removeAttr("style").css({"position":"fixed","bottom":464+"px"});
					}
					if(oWinHeight<1280){
						floatMenu.css({"right":0+"px"});
					}else{
						floatMenu.css({"left":oLeft+"px"});
					}
				}else if(oScrollTop<oStartPos){
					floatMenu.css({"position":"absolute","top":oStartPos+"px"});
					//floatMenu.removeAttr("style")
				}
			}
        })
	}
    IU.util.init = function(){
    	IU.util.focusImgBox({"id":"#focusImgBox"});
        IU.util.divTip();
        IU.util.showTip();
		IU.util.showTip2();
        IU.util.divSelect({"className":".dialog_comment_con"});
        IU.util.search();
        IU.util.inputColor();
        IU.util.initImgPos();
        IU.util.gaikuangFixed("#gak_left1");
        IU.util.gaikuangFixed2();
		//IU.util.menuFix("#leftCont");
    }
    IU.util.login = function(func,hd,zyr){
		/*
    	var diag = new Dialog();
    	diag.Drag = false
    	diag.Width = 685;
    	diag.Height = 405;
    	diag.URL = "/user/login.php?act=main&is_ajax=1&func="+func;
        diag.show()*/
		if(typeof(zyr) == 'undefined')
		{
			var aHref = "/user/login.php?act=main&is_ajax=1&hd="+hd+"&func="+func+"&sub=reserve_submit(1)";
		}
		else
		{
			var aHref = "/user/login.php?act=main&is_ajax=1&hd="+hd+"&func="+func+"&sub="+zyr;
		}
        //window.location.href=aHref;
        //console.log("login")
        $(".showDialog").colorbox({iframe:true, width:"650", height:"630","href":aHref});
        var ie6=!-[1,]&&!window.XMLHttpRequest;
    	var oH = $(document).height();
    	if(ie6){
    		$("#cboxOverlay").css({"height":oH,"top":"0","position":"absolute"})
    	}    
        //$.fancybox.open({href :aHref,type : 'iframe',width:650,height:630});
    }
    IU.util.duihuan = function(){
        /*
         var diag = new Dialog();
         diag.Drag = false
         diag.Width = 685;
         diag.Height = 405;
         diag.URL = "/user/login.php?act=main&is_ajax=1&func="+func;
         diag.show()*/
        var aHref = "/activity/GoldenAgesdh.php?do=do_rob";
        //window.location.href=aHref;
        //console.log("login")
        $(".showDialog").colorbox({iframe:true, width:"795", height:"600","href":aHref});
        var ie6=!-[1,]&&!window.XMLHttpRequest;
        var oH = $(document).height();
        if(ie6){
            $("#cboxOverlay").css({"height":oH,"top":"0","position":"absolute"})
        }
        //$.fancybox.open({href :aHref,type : 'iframe',width:650,height:630});
    }
    IU.util.qiangpiao = function(ml){
        /*
         var diag = new Dialog();
         diag.Drag = false
         diag.Width = 685;
         diag.Height = 405;
         diag.URL = "/user/login.php?act=main&is_ajax=1&func="+func;
         diag.show()*/
        var aHref = "/activity/GoldenAgesqp.php?do=do_rob&ml="+ml;
        //window.location.href=aHref;
        //console.log("login")
        $(".showDialog").colorbox({iframe:true, width:"795",height:"600","href":aHref});
        var ie6=!-[1,]&&!window.XMLHttpRequest;
        var oH = $(document).height();
        if(ie6){
            $("#cboxOverlay").css({"height":oH,"top":"0","position":"absolute"})
        }
        //$.fancybox.open({href :aHref,type : 'iframe',width:650,height:630});
    }

    IU.util.duihuancg = function(phone,func){
        /*
         var diag = new Dialog();
         diag.Drag = false
         diag.Width = 685;
         diag.Height = 405;
         diag.URL = "/user/login.php?act=main&is_ajax=1&func="+func;
         diag.show()*/
        var aHref = "/activity/GoldenAgesdh.php?do=rob_succ&phone="+phone+"&func="+func;
        //window.location.href=aHref;
        //console.log("login")
        $(".showDialog").colorbox({iframe:true, width:"650", height:"630","href":aHref});
        var ie6=!-[1,]&&!window.XMLHttpRequest;
        var oH = $(document).height();
        if(ie6){
            $("#cboxOverlay").css({"height":oH,"top":"0","position":"absolute"})
        }
        //$.fancybox.open({href :aHref,type : 'iframe',width:650,height:630});
    }
    IU.util.loginDialog = function(func,hd){
        var aHref = "/user/login.php?act=main&is_ajax=1&hd="+hd+"&func="+func;
        window.location.href=aHref;
        //console.log("login")
        //$(".showDialog").colorbox({iframe:true, width:"650", height:"630","href":aHref});
        //$.fancybox.open({href :aHref,type : 'iframe',width:650,height:630});
    }
    IU.util.regist = function(func,hd){
    	/*var diag = new Dialog();
    	diag.Drag = false
    	diag.Width = 649;
    	diag.Height = 550;
    	diag.URL = "/user/regist.php?act=main&is_ajax=1&func="+func;
    	diag.show();*/
        var aHref = "/user/regist.php?act=main&is_ajax=1&hd="+hd+"&func="+func;
        //$(".showDialog").colorbox({iframe:true, width:"650", height:"630","href":aHref});
        window.location.href=aHref;
        //console.log("regist")
    }
    
    IU.util.newDialog = function(myOption){
        var oOverlay = $("<div id = 'overlay' class='change_capacity_bg'></div>");
        var oNewDialogBox = $("<div id='alertBox'>sda</div>");
        var alertBox = $("#alertBox");
        alertBox.css({"z-index":99999})
        //$("body").prepend(oOverlay,oNewDialogBox)
    }
    IU.util.slideDiv = function(myOption){
		var oParent = $(myOption.id);
		var oOption = oParent.find("li[slideDiv!=false]");
		oOption.hover(function(){
			$(this).find(".hotel_png_bg").stop(true,true).animate({"height":"60px"},500)
		},function(){
			$(this).find(".hotel_png_bg").stop(true,true).animate({"height":"100%"},500)
		})
	}
	
	//机票首页焦点图
	IU.util.imgFocusJp = function(myOption){
		var oParent = $(myOption.id);
		var oAnimateEle = oParent.find(".animateEle");
		var oLi = oParent.find("ul li")
		var oClickBtn = oParent.find(".clickBtn a");
		var myIndex = 0;
		var timer ='';
		var oLen = oAnimateEle.find("li").length;
		var oLiWidth = oAnimateEle.find("li").width();
		var oUlWidth = oLiWidth*oLen;
		//oAnimateEle.width(oUlWidth);
		function imgShow(myIndex){
			//oAnimateEle.animate({"left":-oLiWidth*myIndex+"px"},1500);
			oLi.eq(myIndex).css({"z-index":2,"height":"100%"}).stop(true,true).animate({"opacity":"1"},500).siblings().css({"z-index":1,"height":0},50).stop(true,true).animate({"opacity":"0"},500);
			oClickBtn.eq(myIndex).addClass("click").siblings().removeClass();
			//console.log(myIndex)
		}
		oClickBtn.click(function(){
			myIndex = $(this).index();
			imgShow(myIndex)
		})
		/*timer = setInterval(function(){
			myIndex++;
			if(myIndex>=oLen){
				myIndex=0;
			}
			imgShow(myIndex)
		},3000)*/
		oParent.hover(function(){clearInterval(timerE)},function(){
			//clearInterval(timerE);
			timerE = setInterval(function(){
				myIndex++;
				if(myIndex>=oLen){
					myIndex=0;
				}
				imgShow(myIndex)
			},3000)
		}).trigger("mouseout")
	}
	//机票首页图片滚动
	IU.util.imgScrollJp = function(myOption){
		var oParent = $(myOption.id);
		var oAnimateEle = oParent.find(".animateEle");
		var oLi = oParent.find("ul li")
		var oClickBtn = oParent.find(".clickBtn a");
		var oPrevBtn = oParent.find(".oPrevBtn");
		var oNextBtn = oParent.find(".oNextBtn");
		var myIndex = 0;
		var timer ='';
		var oHtml = oAnimateEle.html()+oAnimateEle.html();
		oAnimateEle.html(oHtml)
		var oLen = oAnimateEle.find("dl").length;
		var oLiWidth = 242;
		var oUlWidth = oLiWidth*oLen;
		oAnimateEle.width(oUlWidth);
		function imgShow(myIndex){
			var oLeft =oLiWidth*myIndex;
			oAnimateEle.animate({"left":-oLeft+"px"},500);
		}
		oPrevBtn.click(function(){
			myIndex--;
			if(myIndex<0){
				myIndex=0;
			}
			imgShow(myIndex)
		})
		oNextBtn.click(function(){
			myIndex++;
			if(myIndex>=oLen-2){
				myIndex=0;
			}
			imgShow(myIndex)
		})
		/*oParent.hover(function(){clearInterval(timer)},function(){
			timer = setInterval(function(){
				myIndex++;
				if(myIndex>=oLen-2){
					myIndex=0;
				}
				imgShow(myIndex)
			},3000)
		}).trigger("mouseout")*/
	}
	//酒店首页搜索建议
	IU.util.searchSuggest = function (myOption){
		var sugId = myOption.sugId;
		var url = myOption.url;
		function log( message ) {
			$( "<div>" ).text( message ).prependTo( "#log" );
			$( "#log" ).scrollTop( 0 );
		}
		$(sugId).keyup(function(){
			$("#type").val("");
		})
		$(sugId).autocomplete({
			source: url,
			//source:'ajax/jd/index_think.php'+'?destinationval='+($(this).attr("id")),
			minLength: 1,
			response: function( event, ui ) {
				var oDataName = ui.content[0];
				var oDataBrand = ui.content[1];
				var oDestinationval = $("#destination").val();
				//console.log(oDestinationval)
				var nameHtml = '<ol>';
				var brandHtml = '<ol>';
				var oTxt = $(this).val();
				if(oDataName){
					$("#searchBox").attr("data","true")
				}
				for(var i in oDataName){
					for(var o in oDataName[i]){
						//console.log(oDataName[i][o])
						//console.log(o)
						if(o){
							var re = new RegExp(oTxt,"gmi");
							var newO = o.replace(re, "<a>"+oTxt+"</a>")
							var newName = oDataName[i][o].replace(re, "<a>"+oTxt+"</a>")
							nameHtml+='<li><p><span class="nowKey" r_key='+o+'>'+newO+'</span><span class="myval">'+newName+'</span></p></li>';
						}
					}
				}
				for(var i in oDataBrand){
					for(var o in oDataBrand[i]){
						if(o){
							var re = new RegExp(oTxt,"gmi");
							var newO = o.replace(re, "<a>"+oTxt+"</a>")
							var newBrand = oDataBrand[i][o].replace(re, "<a>"+oTxt+"</a>")
							//brandHtml+='<li><span class="nowKey">'+newO+'</span><i class="myval">'+newBrand+'</i></li>';
							brandHtml+='<li><span class="nowKey myval" r_key='+o+'>'+newBrand+'</span></li>';
						}
					}
				}
				$(".ui-helper-hidden-accessible").hide();
				$("#searchBox").show();
				$("#noResult").show();
				if(oDataName[0]){
					$("#jdList").show().html(nameHtml+"<b>酒店</b></ol>");
				}else{
					$("#jdList").hide()
				}
				if(oDataBrand[0]){
					$("#brandList").show().html(brandHtml+"<b>品牌</b></ol>");
				}
				else{
					$("#brandList").hide()
				}
				if(!oDataBrand[0]&&!oDataName[0]){
					$("#noResult .needChange").html("没找到相关内容");
				}else{
					$("#noResult .needChange").html("<a>"+oTxt+",若需缩小范围，请输入更多条件");
				}
				$("#searchBox li").click(function(){
					var oVal = $(this).find(".myval").text();
					oVal.replace(/<[^>]+>/g,"");
					var oNowKey = $(this).find(".nowKey").text();
					oNowKey.replace(/<[^>]+>/g,"");
					var oParentId = $(this).parents(".djhotel_jd").attr("id");
					if(oParentId=="jdList"){var oType="byName"}
					if(oParentId=="brandList"){var oType="byBrand"}
					//$("#type").attr({"key":oNowKey,"types":oType});
					$("#type").val(oType);
					$("#r_key").val(oType);
					$(sugId).val(oVal);
					$("#searchBox").hide();
					var oRkey = $(this).find(".nowKey").attr("r_key");
					$("#r_key").val(oRkey);
				});
				$(".jdmcpp_tst_close").click(function(){
					$(this).parents("#searchBox").hide();
				})
				$("#jdList ol li:first,#brandList ol li:first").hover(function(){
					$(this).parent().find("b").css({"color":"#fff"})
				},function(){
					$(this).parent().find("b").css({"color":"#000"})
				})
			}
		});
		$(document).click(function(){
			$("#searchBox").hide();
		})
		$(sugId).click(function(event){
			var oFlag = $("#searchBox").attr("data");
			$(this).select();
			if(oFlag=="true"){
				$("#searchBox").show();
				return false;
			}else{
				$("#searchBox").hide();
			}
		})
	}
	//酒店评分
	IU.util.rating = function (myOption){
		var rateBox = $(myOption.id);
		var oParent = rateBox.find(".rateItem");
		var oStar =  oParent.find("s");
		oStar.click(function(){
			var oParent = $(this).parents(".rateItem")
			var oDir = oParent.find(".dir");
			var oDirText = $(this).attr("title");
			var rateVal = $(this).attr("rel");
			var rateInput = oParent.find(".rate");
			var myIndex = $(this).index();
			//console.log(myIndex)
			var ThisTitle = $(this).attr("title");
			var thisVal = $(this).attr("rel");
			oDir.text(oDirText);
			rateInput.val(rateVal);
			oParent.find("s:lt("+(myIndex+1)+")").addClass("liang light");
			oParent.find("s:gt("+(myIndex)+")").removeClass("liang light");
		})
		$("#start_times").click(function(){
			var oHeight = ($(window).height()-360)/2+160
			var ie6=!-[1,]&&!window.XMLHttpRequest;
			if(ie6){
				
			}else{
				setTimeout(function(){
					
					$("div[lang='zh-cn']").css({"position":"fixed","top":oHeight+"px"})
				},200)
			}
		})
		
	}
	/**点击添加标签，复制出相同功能的内容 cloneBtnId 
    *添加新项目的按钮Id cloneItemId 为点击"添加"的那个按钮id
    * @function
    * @name newClone
    * @returns void
    * @example 使用时IU.util.changeItem(cloneBtnId,cloneItemId)
    *cloneItemId要复制的项目，为最外层父亲的id
    **/
    IU.util.newClone = function(cloneBtnId,cloneItemId){
        var cloneBtn = $(cloneBtnId);
        var cloneItemId = $(cloneItemId);
        var len = cloneItemId.find(".itemChange").length;
		var maxLen = parseInt($("#add_ck").find("b").text());
        cloneBtn.click(function(){            
            var lastItem = cloneItemId.find(".itemChange:last");
			maxLen--;
			//console.log(maxLen)
			if(maxLen<0){
				maxLen = 0;
				
				return false;
			}
			if(maxLen==0){cloneBtn.find("span").css({"background":"#999"})}else{$("#add_ck span").css({"background":"#1bbc9b"})}
            if(len==1){
               len++;
               //lastItem.clone(true).find(".showProD").attr("name","").end().insertAfter(lastItem).addClass("E").find("input:not(.paperExpiry)").val("").end().find("textarea").html("").end().find(".clear a").html("").end().find("p a").removeAttr("href");
               lastItem.clone(true).find(".showProD").attr("name","").end().find("input.empty").val("").end().insertAfter(lastItem);
               //lastItem.clone(true).find(".sz_radio").attr("name","c").end().appendTo(lastItem.parent()).addClass("E").find("input").val("").end().find("textarea").html("").end().find(".clear a").html("").end().find("p a").removeAttr("href");
               //lastItem.addClass("E").find("input").val("").end().find("textarea").html("").end().find(".clear a").html("").end().find("p a").removeAttr("href");
				var lastItem = cloneItemId.find(".itemChange:last");
                lastItem.find("p img").remove();
                lastItem.find("h3 b").text(len);
				lastItem.find(".ckxx_css_012").show();
				lastItem.find(".psgFirstName").val("姓（拼音或英文）")
				lastItem.find(".psgLastName").val("名（拼音或英文）");
				lastItem.find(".paperNo").val("请输入证件号码");
				lastItem.find(".paperType").val("护照").attr("for",4);
            }else{
                len++;
                lastItem.clone(true).find(".showProD").attr("name","").end().find("input.empty").val("").end().insertAfter(lastItem);
				var lastItem = cloneItemId.find(".itemChange:last");
                lastItem.find("p img").remove();
				lastItem.find("h3 b").text(len);
				lastItem.find(".psgFirstName").val("姓（拼音或英文）");
				lastItem.find(".psgLastName").val("名（拼音或英文）");
				lastItem.find(".paperNo").val("请输入证件号码");
				lastItem.find(".paperType").val("护照");
            }
            lastItem.find(".removeItem").text("删除");
			var oLen = $(".radio").length;
			for(var i=0;i<oLen;i++){
				$(".radio").eq(i).find(".showProD").attr("name","engine"+i)
			}
			
			$("#add_ck").find("b").text(maxLen);
        });
        $(".itemChange").find(".removeItem").click(function(){
            var nowLen = $(".itemChange").length;
			var lastItem = cloneItemId.find(".itemChange:last");
			if(len==1){
                $(this).text("清空");
				//$(".itemChange").find("input:not('.noEmpty,.showProD'),select").val("");
				lastItem.find(".psgFirstName").val("姓（拼音或英文）");
				lastItem.find(".psgLastName").val("名（拼音或英文）");
				lastItem.find(".paperNo").val("请输入证件号码");
				lastItem.find(".paperSign").val("中国");
				lastItem.find(".psgNationalCode").val("中国");
				lastItem.find(".paperExpiry,.psgBirthday").val("");
				lastItem.find("#chengren").prop("checked","checked");
				lastItem.find("#ertong").attr("checked",false);
				lastItem.find(".psgSex span:first input").prop("checked","checked");
				lastItem.find(".psgSex span:last input").attr("checked",false);
				var nowIndex = $(this).parents(".itemChange").find(".psgInfo").attr("index");
				$("#passInfo input[index="+nowIndex+"]").removeAttr("checked");
				return;
            }
			maxLen++;
			$("#add_ck").find("b").text(maxLen);
			if(len==2){$(".itemChange").find(".removeItem").text("清空");}
			var nowIndex = $(this).parents(".itemChange").find(".psgInfo").attr("index");
			$("#passInfo input[index="+nowIndex+"]").removeAttr("checked");
            $(this).parents(".itemChange").remove();
			$("#add_ck span").css({"background":"#1bbc9b"})
            len--;   
			if(len<=0){
				len = 0;
			}			
            initSort(len,cloneItemId)
        })
		function initSort(len,oParent){
			for(var i=0;i<len;i++){
				oParent.find(".itemChange").eq(i).find("h3").find("b").text(i+1)
			}
			for(var i=0;i<len;i++){
				/* var a = $(".itemChange").eq(i).find(".xian_pro").attr("ck");
				if(a=='1'){
					$(".itemChange").eq(i).find(".xian_pro:[ck=1]").click()
				} */
			}
		}
    }
	//限制字数输入
	IU.util.sizeLimit = function (myOption){
		var oParent = $(myOption.id);//父级
		var oTotalLenth = myOption.oTotalLenth;//限制的总字数
		var oNorText = myOption.oNorText;//文本框默认显示的文字
		var oTextBox = oParent.find(".oTextBox");//文本框
		var oTips = oParent.find(".remainSize");//剩余字数
		
		oTextBox.focus(function(){
			var oNowVal = $(this).val();
			if(oNowVal==oNorText){
				$(this).val("");
			}
		})		
		oTextBox.blur(function(){
			var oNowVal = $(this).val();
			if(oNowVal==""){
				$(this).val(oNorText);
			}
		})		
		oTextBox.on("input propertychange",function(){
			var oVal = oTextBox.val();
			var oLen = oVal.length;
			var oRemainSize = oTotalLenth-oLen;
			if(oLen>=oTotalLenth){
				var a = oVal.substr(0,oTotalLenth);
				oTips.html("0");
				oTextBox.val(a)
				return false
			}
			oTips.html(oRemainSize)
		})
	}
	IU.util.inputFocus = function(options){
		var oInput = $(options.cls);
		oInput.focus(function(){
			var defVal = $(this).attr("def");
			var curVal = $(this).val()||$(this).text();
			if(defVal==curVal){
				$(this).val(" ")
			}else{
				$(this).val(curVal)
			}
		})
		oInput.blur(function(){
			var defVal = $(this).attr("def");
			var curVal = $(this).val();
			if(curVal==" "||curVal==""||curVal==defVal){
				$(this).val(defVal)
			}else{
				$(this).val(curVal)
			}
		})
	}
})();
/*******设置cookie********/
function setCookie(name, value, iDay)
{
    var oDate=new Date();
    
    oDate.setDate(oDate.getDate()+iDay);
    
    document.cookie=name+'='+value+';expires='+oDate;
}

function getCookie(name)
{
    //'username=abc; password=123456; aaa=123; bbb=4r4er'
    var arr=document.cookie.split('; ');
    var i=0;
    
    //arr->['username=abc', 'password=123456', ...]
    
    for(i=0;i<arr.length;i++)
    {
        //arr2->['username', 'abc']
        var arr2=arr[i].split('=');
        
        if(arr2[0]==name)
        {
            return arr2[1];
        }
    }
    
    return '';
}
function removeCookie(name)
{
    setCookie(name, '1', -1);
}

$(function(){
	IU.util.init();
})
$(function(){
    $(".closeDialog").click(function(){
        parent.jQuery.colorbox.close();
    })
	$("#myQuestion").click(function(){
		$.post("/ajax/ask.php?act=my_ask",{},function(json){
			if(json.suc == 1){
					$("#tw_list_row").html(json.str);
					$("#yes").html(json.yes);
					$("#no").html(json.no);
					IU.util.dialog({id:"questionDialog",width:700,height:372});
	            }else{
				    alert(json.msg);
					window.location.href="/user/login.php";
				}
				
		},"json");
		
	})
	/*$("#tw_list_row li").click(function(){
		$(".close").click();
		IU.util.dialog({id:"quesDialog",width:698,height:372});
	})*/
	
	$(".twck_btn").click(function(){
		$(".close").click();
		IU.util.dialog({id:"questionDialog",width:700,height:372});
	});
	var nowUrl = document.location.href;
	var flagIndex = nowUrl.indexOf("detail");
	var flagPoint = nowUrl.lastIndexOf(".");
	var id = nowUrl.substring(parseInt(flagIndex)+7,flagPoint);
	if(IsPC()){
		return ;
	}else{
		if(nowUrl=="http://dj.caissa.com.cn/"){
			window.location.href="http://m.caissa.com.cn/";
		}if(nowUrl=="http://172.16.37.178:90/"){
			window.location.href="http://172.16.37.178:8081/";
		}if(flagIndex>-1){
			window.location.href="http://m.caissa.com.cn/product/detail?id="+id;
		}if(flagIndex==-1&&nowUrl!="http://dj.caissa.com.cn/"){
			return;
		}
	}
})
function IsPC()  
{  
   var userAgentInfo = navigator.userAgent;  
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
   var flag = true;  
   for (var v = 0; v < Agents.length; v++) {  
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
   }  
   return flag;  
}  
function showDialog(id){
	$(".close").click();
	$.post("/ajax/ask.php?act=my_reply",{"id":id},function(json){
			if(json.suc == 1){
					$(".tw_cont_center").html(json.str);
	            }else{
				    alert(json.msg);
				}
				
	},"json");
	IU.util.dialog({id:"quesDialog",width:700,height:372});
}
function open15(id)
{
    var aHref = "/detail/hotel_show.php?hotel="+id;
    $(".showDialog").colorbox({iframe:true, width:"1008", height:"830","href":aHref});
    var ie6=!-[1,]&&!window.XMLHttpRequest;
    var oH = $(document).height();
    if(ie6){
    	$("#cboxOverlay").css({"height":oH,"top":"0","position":"absolute"})
    }    
}
