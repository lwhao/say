window.onload = function(){
	//获取卷出部分
	function scroll(){
		return{
			"top":document.documentElement.scrollTop + document.body.scrollTop,
		    "left":document.documentElement.scrollLeft + document.body.scrollLeft
		} 	
	}
	//缓动效果
	function animationX(obj,target,fn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			//（目标位置-盒子本身位置）/ 10；
			var speed = (target - obj.offsetLeft)/10;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			//盒子位置 = 盒子本身位置+（目标位置-盒子本身位置）/ 10；
			obj.style.left = obj.offsetLeft + speed + "px";
			if(obj.offsetLeft == target){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		},30)
	}
	
	function animationY(obj,target,fn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			//（目标位置-盒子本身位置）/ 10；
			var speed = (target - obj.offsetLeft)/10;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			//盒子位置 = 盒子本身位置+（目标位置-盒子本身位置）/ 10；
			obj.style.left = obj.offsetLeft + speed + "px";
			if(obj.offsetLeft == target){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		},100)
	}
	function animate(obj,target){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
		var speed = (obj.offsetLeft>target?-50:50);
			if(Math.abs(obj.offsetLeft-target)<50){
				obj.style.left = target+"px";
				clearInterval(obj.timer);
			}
			else{
				obj.style.left = obj.offsetLeft+speed+"px";
			}	
		},50)			
	}		
	//获取任意属性
	function getStyle(obj,attr){
		if(window.getComputedStyle){
			return window.getComputedStyle(obj,null)[attr]
		}else{
			return obj.currentStyle[attr];
		}
	}
	
	//多属性缓动	
	function animation(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var flag = true;
			//json里面有几个属性就要执行几次
			var target=0;//记录目标位置
			var leader=0;//记录当前位置
			var speed =0;//记录速度
			for(var key in json){						
				if(key=='opacity'){
					target = Math.round(json['opacity']*100)//0-100
					leader = getStyle(obj,'opacity')*100//0-100
				}
				else{
					target = parseInt(json[key]);
					leader = parseInt(getStyle(obj,key));
				}
				speed = (target-leader)/10;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				leader = leader + speed;//0-100
				if(key=='opacity'){
					obj.style.opacity = leader/100;
					obj.style.filter = "alpha(opacity="+leader+")";
				}
				else if(key=="zIndex"){
					obj.style.zIndex = json['zIndex'];
				}
				else{
					obj.style[key] = leader+"px";
				}				
				if(leader!=target){
					flag = false						
				}
			}	
			if(flag){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}			
						
		},20)
	}
	//弹出搜索框
	var inp = document.getElementById('inp');
	var btn = document.getElementById('btn');
	btn.onclick = function(){
		animation(inp,{'width':202});
	}
	//页面底部广告关闭
		var banner = document.getElementById('banner');
		var close = document.getElementById('close');
		close.onclick = function(){
			animation(banner,{'opacity':0});
		}
	//返回头部
	function scroll(){
		return{
			"top":document.documentElement.scrollTop + document.body.scrollTop,
	    	"left":document.documentElement.scrollLeft + document.body.scrollLeft
		} 	
	}
	var tools = document.getElementById('tools');
	var ret = document.getElementById('ret');
	window.onscroll = function(){
		if(scroll().top>800){
			tools.style.display = "block";
		}else{
			tools.style.display = "none";
		}
	}
	ret.onclick = function(){
		clearInterval(ret.timer)
		ret.timer = setInterval(function(){
			var speed = (0 - scroll().top)/10;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			window.scrollTo(0,scroll().top+speed);
			if(scroll().top==0){
				clearInterval(ret.timer);
			}
		},30)
	}
//	轮播图
	var slider = document.getElementById('slider');
	var imgUl = slider.children[0];
	var arrowUl =slider.children[1];
	var left = arrowUl.children[0];
	var right = arrowUl.children[1];
	var index = 0;
	var newLi = imgUl.children[0].cloneNode(true);
    imgUl.appendChild(newLi);
    var imgLis = imgUl.children;
	right.onclick = autoplay;
    //autoplay:看后一张
    function autoplay(){
        index++;
        if(index>imgLis.length-1){
            imgUl.style.left = 0;
            index = 1;
        }
        animate(imgUl,-index*slider.offsetWidth);
    }
    left.onclick = function () {
        index--;
        if(index<0){
            imgUl.style.left = -(imgLis.length-1)*slider.offsetWidth+"px";
            index = imgLis.length-2;
        }
        animate(imgUl,-index*slider.offsetWidth);
    };
    //添加自动轮播功能
    slider.timer = setInterval(autoplay,5000);
    slider.onmouseover = function () {
        clearInterval(slider.timer);
    };
    slider.onmouseout = function () {
        clearInterval(slider.timer);
        slider.timer = setInterval(autoplay,5000);
    };
    
    
    //触摸变透明
    var bigImg = document.getElementById('bigImg');
    var imgTop = document.getElementById('imgTop');
    var imgBottom = document.getElementById('imgBottom');
    var maskBig = document.getElementById('maskBig');
    var maskTop = document.getElementById('maskTop');
    var maskBottom = document.getElementById('maskBottom');
    bigImg.onmouseenter = function(){
    	animation(maskBig,{'opacity':0})
    }
    bigImg.onmouseleave = function(){
    	animation(maskBig,{'opacity':0.4})
    }
    imgTop.onmouseenter = function(){
    	animation(maskTop,{'opacity':0})
    }
    imgTop.onmouseleave = function(){
    	animation(maskTop,{'opacity':0.4})
    }
    imgBottom.onmouseenter = function(){
    	animation(maskBottom,{'opacity':0})
    }
    imgBottom.onmouseleave = function(){
    	animation(maskBottom,{'opacity':0.4})
    }
}
