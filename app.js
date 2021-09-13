var bullet=[];
var monster=[];

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
	if(x==32) jump();
	if(x==17) attack();
}

function jump(){
	console.log('jump');
	setTimeout(function(){up()}, 100);
	setTimeout(function(){up()}, 200);
	setTimeout(function(){up()}, 300);
	setTimeout(function(){down()}, 400);
	setTimeout(function(){down()}, 500);
	setTimeout(function(){down()}, 600);

}
function attack(){
	// console.log('attack');
	document.querySelector('#f').play()
	// document.querySelector('#bullet').style.top
	var topP = document.querySelector('#player').style.top;
	var leftP = document.querySelector('#player').style.left;
	if(topP=='') topP = 175;
	if(leftP=='') leftP = 160;

	topP = parseInt(topP);
	leftP = parseInt(leftP);
	createBullet(topP, leftP);

}

function createBullet(topP,leftP){
var leftB = leftP+50;
var bID = 'bullet'+Date.now();
console.log(bID);
var b = document.createElement('div');
b.setAttribute('id',bID);
b.className = 'bullet';
b.style.top = (topP+8)+'px';
b.style.left = (leftP+50)+'px';
b.style.display = 'block';
document.querySelector('#board').appendChild(b);   


bullet[bID] = setInterval(function(){
	document.querySelector('#'+bID).style.left=leftB+'px';
	leftB = leftB + 10;
	checkHit(bID);

	if(leftB>=315){
		clearInterval(bullet[bID]);
		document.querySelector('#'+bID).style.display = 'none';
		document.querySelector('#board').removeChild(document.querySelector('#'+bID));
	}
}, 250);
}


function createMonster(){
var topM = Math.floor(Math.random() * 351);	
var leftM = 320;
var mID = 'monster'+Date.now();
console.log(mID);
var m = document.createElement('div');
m.setAttribute('id',mID);
m.className = 'monster';
m.style.top = (topM+8)+'px';
m.style.left = leftM+'px';
m.style.display = 'block';
document.querySelector('#board').appendChild(m);   

monster[mID] = setInterval(function(){
	document.querySelector('#'+mID).style.left=leftM+'px';
	leftM = leftM - 10;
	if(leftM<=0){
		clearInterval(monster[mID]);
		document.querySelector('#'+mID).style.display = 'none';
		document.querySelector('#board').removeChild(document.querySelector('#'+mID));
	}
}, 450);
}

function checkHit(b){
var b = document.querySelector('#'+b);
var m = document.querySelectorAll('.monster'), i;

for (i = 0; i < m.length; ++i) {
  // console.log(m[i].style.top);
  // console.log(m[i].style.left);
  var hitL = false;
  var hitT = false;
  if(parseInt(b.style.left)>=parseInt(m[i].style.left) && parseInt(b.style.left)<=parseInt(m[i].style.left)+50){
  	// console.log('hit left');
  	hitL = true;
  }
  if(parseInt(b.style.top)>=parseInt(m[i].style.top) && parseInt(b.style.top)<=parseInt(m[i].style.top)+50){
  	hitT = true;
  	// console.log('hit top');
  }
  if(hitL && hitT){
  	console.log('hit');
  	document.querySelector('#board').removeChild(document.querySelector('#'+m[i].getAttribute('id')));
  	document.querySelector('#board').removeChild(document.querySelector('#'+b.getAttribute('id')));
  	clearInterval(bullet[b.getAttribute('id')]);
  	clearInterval(monster[m[i].getAttribute('id')]);

  }
}
}


function start(){
	document.querySelector('#start').style.display='none'
	setInterval(function(){
		createMonster();
	}, 3000);
}