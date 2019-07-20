var cvs = document.getElementById('canvas');
var ctx = cvs.getContext ('2d');


var aircraft =  new Image();
var bg = new Image();
var fg = new Image();
var mounthBottom = new Image();
var mounthUp  = new Image();
var fly = new Audio();
var scoreAudio = new Audio();
var lose = new Audio();
var gap = 160;
var xPos = 50;
var yPos = 250;
var grav = 1.5;
var score = 0;
fly.src ='audio/up.mp3';
scoreAudio.src = 'audio/score.mp3';
lose.src = 'audio/lose.mp3'
document.addEventListener('keydown',moveUp,false);
function moveUp () {
	yPos -= 25;
    if (yPos < 0) yPos = 0;
    fly.play();
}
var mounth =[];
mounth[0] = {
	x : cvs.width,
	y : 0 ,
}
aircraft.src = 'img/biplan1.png' ;
bg.src = 'img/bg2.png';
fg.src = 'img/fg3.png';
mounthBottom.src = 'img/block.png';
mounthUp.src = 'img/block2.png' ;

function draw () {
	ctx.drawImage (bg, 0 ,0);
	for (var i = 0; i < mounth.length;i++){
	ctx.drawImage(mounthUp,mounth[i].x,mounth[i].y);
    ctx.drawImage(mounthBottom,mounth[i].x,mounth[i].y + mounthUp.height + gap); 
	ctx.drawImage(fg,0,cvs.height - fg.height); 
	mounth[i].x-=2;
    if (mounth[i].x == 150)  {
    	mounth.push ({
         x: cvs.width,
         y: Math.floor(Math.random() * mounthUp.height) - mounthUp.height
    	});
    }

    if (xPos + aircraft.width >= mounth[i].x
    	&& xPos <= mounth[i].x + mounthUp.width
    	&& (yPos <= mounth[i].y + mounthUp.height
    	|| yPos + aircraft.height >= mounth[i].y + mounthUp.height + gap )
        || yPos + aircraft.height >= cvs.height - fg.height) {
        
    	   lose.play();
           setTimeout(function(){
             location.reload()
           },900);

    	}
    if (mounth[i].x == 10) {
            score++;
            scoreAudio.play();
        }
    if (mounth[i].x >= cvs.width)  mounth.shift();   
    }	
	ctx.drawImage(aircraft,xPos,yPos);
	yPos += grav ; 
    ctx.fillStyle = 'red';
    ctx.font = '25px Arial';
    ctx.fillText('Score:' + score,10,cvs.height-20);
	requestAnimationFrame(draw)
}
mounthUp.onload = draw ;