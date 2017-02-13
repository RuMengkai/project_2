//rem布局。js
function initSize() {
	var _w = document.documentElement.clientWidth||document.body.clientWidth;
	var _size=_w/375*100;
	document.documentElement.style.fontSize=_size+"px";
}
window.onload=function(){
	initSize();
}