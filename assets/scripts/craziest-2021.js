// WAVY TRANSITION
const TRANS_PATHS = [
	{ value: 'M85,235c111.4,53.9,204-28.6,315-35c87.3-5,123,69.8,200,70c73.8,0.2,169.9-92,200-145V0H0v165 C19.5,194.8,48.5,217.3,85,235z' },
	{ value: 'M131,199c111.4,53.9,156,25.4,267,19c87.3-5,139-35.2,216-35c73.8,0.2,95,47,186,17V0H0v200 C19.5,229.8,94.5,181.3,131,199z' }
];
anime({
targets: '#transitionIntro path',
d: [
TRANS_PATHS[1],
TRANS_PATHS[0]
],
duration: 10000,
easing: 'easeInOutSine',
direction: 'alternate',
loop: true
});
	
if (navigator.userAgent.match(/iPhone/)){
	var iosStyle = document.createElement('style');
	iosStyle.innerHTML =
		'.expense-image>img {' +
			'margin-top: 3rem;' +
			'margin-bottom: 3rem;' +
		'}';
		var scref = document.querySelector('script');
		scref.parentNode.insertBefore(iosStyle, scref);
}

// CRAZIEST LOGO
var pinkLetters = document.querySelectorAll('#pink-letters path')
var blueLetters = document.querySelectorAll('.blue-letters')
anime({
	targets: [blueLetters,pinkLetters],
	duration: 800,
	scale: [0, 1],
	easing: 'spring(1, 80, 10, 0)',
	opacity: [0, 1],
	loop: false,
	delay: anime.stagger(100, {start: 300}),
	complete: function(anim){
		anime({
			targets: pinkLetters,
			duration: 1000,
			scale: [1, 1.05, 1],
			easing: 'easeInQuart',
			loop: true,
			delay: anime.stagger(100),
			endDelay: 1000
		}).play();
	}
});





var topEmojis = document.querySelectorAll('.emoji-bar.large>img')
anime({
	targets: topEmojis,
	duration: function() { return anime.random(2500, 3000)},
	rotate: [function() { return anime.random(-50, -15)}, function() { return anime.random(15, 50)}],
	delay: anime.stagger(100, {from: 'center'}),
	easing: 'linear',
	direction: 'alternate',
	loop: true
});


// when scrolls into view
function scrollCheck(){
	var sections = document.querySelectorAll('.expense-section, .survey-section, .graph-container, .grid-section');
	sections.forEach(sec => {
		if (sec.classList.contains('scrolled')) {
			return;
		};
		var secTop = sec.getBoundingClientRect().top;
		var vhPos = Math.round(window.innerHeight/4)
		var yPos = (window.innerHeight)-vhPos;
		if (secTop < yPos){
			sec.classList.add('scrolled');
			var startX = -100;
			var startE = 100;
			if (sec.classList.contains('right')) {
				startX = 100;
				startE = -100;
			}
			if (sec.classList.contains('graph-container')){
				anime({
					targets: sec.querySelectorAll('div'),
					duration: 1800,
					scaleX: [0, 1],
					easing: 'easeInOutQuad'
				})
				sec.childNodes.forEach(num =>{
					var finalNum = num.innerHTML;
					var workingNum = { wn: 0 };
					anime({
						targets: workingNum,
						duration: 1800,
						easing: 'easeInOutCirc',
						wn: finalNum,
						round: 1,
						update: function(){
							num.innerHTML = workingNum['wn'];
						}
					})
				})
				return;
			} else if (sec.classList.contains('survey-section')) {
				anime({
					targets: sec,
					duration: 500,
					translateY: [-100, 0],
					opacity: [0, 1],
					easing: 'easeInOutQuad'
					})
					.play();
				return;
			} else {
				anime({
					targets: sec,
					duration: 500,
					translateX: [startX, 0],
					opacity: [0, 1],
					easing: 'easeInOutQuad'
					})
					.play();
					
					var priceEl = sec.querySelector('.price-block>p:nth-child(2)');
					console.log(priceEl.innerHTML)
					var finalNum = currency(priceEl.innerHTML).value;
					console.log(finalNum)
					console.log(finalNum >=100)
					var workingNum = { wn: 0 };
					var roundNum = 100;
					if (finalNum >= 100 )
						 roundNum = 1;
					anime({
						targets: workingNum,
						duration: 1500,
						easing: 'easeInOutCirc',
						wn: finalNum,
						round: roundNum,
						update: function(){
							if (roundNum == 100){
								var outputPrice = currency(workingNum['wn']).format()
							} else {
								var outputPrice = currency(workingNum['wn']).format()
								outputPrice = outputPrice.slice(0, outputPrice.length-3)
							}
							priceEl.innerHTML = outputPrice;
						}
					})
					.play();
				anime({
					targets: sec.querySelector('.emoji-bar').children,
					duration: 500,
					translateX: [startE, 0],
					rotate: [startE, 0],
					opacity: [0, .5],
					delay: anime.stagger(100, {start: 600}),
					easing: 'easeOutElastic',
					complete: function(anim){
						anime({
							targets: sec.querySelector('.emoji-bar>img:not(.gray)'),
							opacity: [.5, 1],
							duration: 500,
							scale: [1, 1.2, 1],
							easing: 'easeInOutQuad'
					}).play();
				}
					
				})
				.play();
			};
		}
	});
}
window.addEventListener("scroll",scrollCheck);