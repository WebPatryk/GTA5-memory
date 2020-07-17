const cards = [
	'michael.jpg',
	'trevor.jpg',
	'franklin.jpg',
	'michael.jpg',
	'trevor.jpg',
	'franklin.jpg',
	'michael.jpg',
	'trevor.jpg',
	'franklin.jpg',
	'michael.jpg',
	'trevor.jpg',
	'franklin.jpg'
];

const startGame = document.querySelector('.start-game');
const game = document.querySelector('.game');
const board = document.querySelector('.board');
const timeElement = document.querySelector('.time');

const card0 = document.getElementById('card0');
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');

const card4 = document.getElementById('card4');
const card5 = document.getElementById('card5');
const card6 = document.getElementById('card6');
const card7 = document.getElementById('card7');

const card8 = document.getElementById('card8');
const card9 = document.getElementById('card9');
const card10 = document.getElementById('card10');
const card11 = document.getElementById('card11');

card0.addEventListener('click', function () {
	revealCard(0);
});
card1.addEventListener('click', function () {
	revealCard(1);
});
card2.addEventListener('click', function () {
	revealCard(2);
});
card3.addEventListener('click', function () {
	revealCard(3);
});

card4.addEventListener('click', function () {
	revealCard(4);
});
card5.addEventListener('click', function () {
	revealCard(5);
});
card6.addEventListener('click', function () {
	revealCard(6);
});
card7.addEventListener('click', function () {
	revealCard(7);
});

card8.addEventListener('click', function () {
	revealCard(8);
});
card9.addEventListener('click', function () {
	revealCard(9);
});
card10.addEventListener('click', function () {
	revealCard(10);
});
card11.addEventListener('click', function () {
	revealCard(11);
});

let oneVisible = false;
let turnCounter = 0;
let visible_nr;
let lock = false;
let pairsLeft = 6;

function revealCard(nr) {
	const opacityValue = document.querySelector(`#card${nr}`).style.opacity;

	if (opacityValue !== 0 && lock === false) {
		lock = true;

		const obraz = `url(img/${cards[nr]})`;

		document.querySelector(`#card${nr}`).style.backgroundImage = obraz;
		document.querySelector(`#card${nr}`).classList.add('cardA');
		document.querySelector(`#card${nr}`).classList.remove('card');

		if (oneVisible == false) {
			//first card

			oneVisible = true;
			visible_nr = nr;
			lock = false;
		} else {
			//second card

			if (cards[visible_nr] == cards[nr]) {
				setTimeout(function () {
					hide2Cards(nr, visible_nr);
				}, 750);
			} else {
				setTimeout(function () {
					restore2Cards(nr, visible_nr);
				}, 1000);
			}

			turnCounter++;
			document.querySelector('.score').textContent = `Turn counter: ${turnCounter}`;
			oneVisible = false;
		}
	}
}

function hide2Cards(nr1, nr2) {
	document.querySelector(`#card${nr1}`).style.opacity = '0';
	document.querySelector(`#card${nr2}`).style.opacity = '0';

	pairsLeft--;

	if (pairsLeft == 0) {
		document.querySelector('.board').innerHTML = `
		<h1>Well done <br> Done in ${turnCounter} turns</h1>
		<h3>You have finished the game in ${timeElement.textContent}</h3>
		<button class="reset-game">Reset Game</button>
		`;
		clearInterval(countTime);
		const resetGame = document.querySelector('.reset-game');
		resetGame &&
			resetGame.addEventListener('click', () => {
				window.location.reload(true);
			});
	}

	lock = false;
}

function restore2Cards(nr1, nr2) {
	const firstCard = document.querySelector(`#card${nr1}`);
	const secondCard = document.querySelector(`#card${nr2}`);
	firstCard.style.backgroundImage = `url(img/gta5-logo.jpg)`;
	firstCard.classList.add('card');
	firstCard.classList.remove('cardA');

	secondCard.style.backgroundImage = `url(img/gta5-logo.jpg)`;
	secondCard.classList.add('card');
	secondCard.classList.remove('cardA');

	lock = false;
}

startGame.addEventListener('click', () => {
	game.style.visibility = 'visible';
	startGame.style.visibility = 'hidden';
});

const startTime = 0;
let time = startTime * 60;

function upadateTime() {
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;

	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	timeElement.innerHTML = `${minutes}:${seconds}`;
	time++;
}

const countTime = setInterval(upadateTime, 1000);
