const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// measure buttons
const buttonElements = document.querySelectorAll('.button');
let buttonMeasurements = [];
function measureButtons(){  
    buttonMeasurements = [];
    buttonElements.forEach(button => {
    buttonMeasurements.push(button.getBoundingClientRect());
    });
};
measureButtons();

// sound
const fireSound = new Audio();
fireSound.src = 'fire.wav';

// create particles
let particlesArray = [];
class Particle {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.weight = (Math.random() * 1.5) + 1.5;
        this.directionX = Math.random() * 2;
    }
    update() {
        this.weight -= 0.01;
        this.y -= this.weight;
        this.x += this.directionX;
        if (this.size >= 0.3) this.size -= 0.2;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'orange';
        ctx.fill();
    }
}

let activeButton = -1;
buttonElements.forEach(button => button.addEventListener('mouseenter', function(){
    activeButton = button.dataset.number;
    fireSound.play();
}));
buttonElements.forEach(button => button.addEventListener('mouseleave', function(){
    activeButton = -1;
    fireSound.stop();
}));

ctx.lineWidth = 1;
function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){

        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 1){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (activeButton > -1) {
        let size = Math.random() * 40 + 10;
        let x = Math.random() * (buttonMeasurements[activeButton].width - size * 2) + buttonMeasurements[activeButton].x + size;
        let y = buttonMeasurements[activeButton].y + 40;

        particlesArray.push(new Particle(x, y, size));
    }
    handleParticles();

    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    measureButtons();
});