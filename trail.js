// function/trail.js - Efeito tech de trilhas neon que seguem o mouse

const canvas = document.getElementById('trail-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let dots = [];
    const mouse = { x: -1000, y: -1000 };

    // Cores Tech do tema CTRL
    const colorNeonGreen = '#00FF66';
    const colorNeonAqua = '#00F0FF';

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        createDot();
    });

    class Dot {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3.5 + 1.5;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.opacity = 0.9;
            this.color = Math.random() > 0.5 ? colorNeonGreen : colorNeonAqua;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.opacity > 0.01) this.opacity -= 0.015;
            if (this.size > 0.1) this.size -= 0.04;
        }

        draw() {
            ctx.globalAlpha = Math.max(0, this.opacity);
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        }
    }

    function createDot() {
        for (let i = 0; i < 2; i++) {
            dots.push(new Dot(mouse.x, mouse.y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < dots.length; i++) {
            dots[i].update();
            dots[i].draw();
            
            if (dots[i].opacity <= 0.01 || dots[i].size <= 0.1) {
                dots.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(animate);
    }

    animate();
}
