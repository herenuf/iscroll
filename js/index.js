

var myScroll = new IScroll('.main',{
	
	probeType:3
	
});

//1.进入页面，隐藏下拉刷新的div
myScroll.scrollTo(0,-40);

//
var refreshImg = document.querySelector('.refresh img');
var refreshText = document.querySelector('.refresh span');

/************************下拉刷新***************************/
myScroll.on('scroll',function(){
//	console.log(myScroll.y);
	if(myScroll.y<0 && myScroll.y>-40){
		//未达到刷新条件
		refreshImg.className = '';
		refreshText.innerText = '下拉可以刷新...';
	}
	else if(myScroll.y>=0){
		//达到刷新条件
		refreshImg.className = 'up';
		refreshText.innerText = '释放立即刷新...';
	}
})

myScroll.on('scrollEnd',function(){
	if(myScroll.y<0 && myScroll.y>-40){
		//下拉刷新没有完全展示回到-40的位置
		myScroll.scrollTo(0, -40, 200);
	}
	
	if(myScroll.y==0){
		//下拉刷新的div完全展示 执行刷新
		refreshImg.src = 'img/ajax-loader.gif';
		refreshText.innerText = '正在刷新...';
		//重新发送ajax请求，请求最新的数据
		setTimeout(function(){
			endRefresh();
		},1000)
	}
})

//刷新完毕的方法
function endRefresh(){
	refreshImg.src = 'img/arrow.png';
	refreshText.innerText = '下拉可以刷新...';
	myScroll.scrollTo(0, -40, 200);
	myScroll.refresh();
}

//。。。。。。。。。。。。。。。。下拉加载更多。。。。。。。。。。。。。。。。。。。

var loadMoreImg = document.querySelector('.load-more img');
var loadMoreText = document.querySelector('.load-more span');

myScroll.on('scroll',function(){
	if(myScroll.y > myScroll.maxScrollY && myScroll.y < myScroll.maxScrollY+40){
		//没有达到加载更多的条件
		loadMoreImg.className = '';
		loadMoreText.innerText = '上拉加载更多...';
	}
	else if(myScroll.y>=0){
		//达到加载更多的条件
		loadMoreText.className = 'down';
		loadMoreText.innerText = '释放立即加载...';
	}
})

myScroll.on('scrollEnd',function(){
	
//	console.log(myScroll.y);
	
	if(myScroll.y > myScroll.maxScrollY && myScroll.y < myScroll.maxScrollY+40){
		//没有达到加载更多的条件
		myScroll.scrollTo(0, myScroll.maxScrollY+40, 200);
	}
	else if(myScroll.y <= myScroll.maxScrollY){
		//达到了加载更多的条件
		loadMoreImg.src = 'img/ajax-loader.gif';
		loadMoreText.innerText = '正在加载...';
		//请求下一页数据
		setTimeout(function(){
			//请求完成，需要将请求数据凭借到列表之后
			var arr = ['new item1','new item2','new item3','new item4','new item5'];
			var html = '';
			arr.map(function(item){
				html += '<li>'+item+'</li>';
			})
			document.querySelector('.list').innerHTML +=html;
			
			//关闭加载更多的动画
			endLoadMore();
		},1000);
	}
})
function endLoadMore(){
	loadMoreImg.src = 'img/arrow.png';
	loadMoreText.innerText = '上拉加载更多...';
	//更新滚动容器
	myScroll.refresh();
}
