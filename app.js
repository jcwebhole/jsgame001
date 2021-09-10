function up(){
	var t = parseInt(document.querySelector('#player').style.top);
	if(isNaN(t)) t = 175;
	t-=10;
	document.querySelector('#player').style.top=t+'px';
}
function down(){
	var t = parseInt(document.querySelector('#player').style.top);
	if(isNaN(t)) t = 175;
	t+=10;
	document.querySelector('#player').style.top=t+'px';
}

function left(){
	var l = parseInt(document.querySelector('#player').style.left);
	if(isNaN(l)) l = 160;
	l-=10;
	document.querySelector('#player').style.left=l+'px';
}

function right(){
	var l = parseInt(document.querySelector('#player').style.left);
	if(isNaN(l)) l = 160;
	l+=10;
	document.querySelector('#player').style.left=l+'px';
}

window.addEventListener("keydown", keys);
function keys(e){
	var x = event.which || event.keyCode;
	if(x==38) up();
	if(x==40) down();
	if(x==37) left();
	if(x==39) right();
}