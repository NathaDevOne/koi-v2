document.addEventListener("DOMContentLoaded", function () {
    const text = "meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow.";
    const newText = "Hemlo! You must be Kath... or maybe not? Just to be sure, may I ask what you usually call my hooman Nath?";
    const thirdText = "My hooman wanna say a Hampy Valentines! He wuvs you so much... until a cat says 'Arf'! <3";
    const fifthText = "Uhm... actually, he's asking if you're free on Friday, February 13. You know... to eat together, have fun, and maybe some “kissu” he said.";
    
    const typewriter = document.getElementById('typewriter');
    const typewriterThird = document.getElementById('typewriter-third');
    const typewriterFifth = document.getElementById('typewriter-fifth');
    
    const startBtn = document.getElementById('start-btn');
    const learnBtn = document.getElementById('learn-btn');
    const inputSection = document.getElementById('input-section');
    const submitBtn = document.getElementById('submit-btn');
    const catNameInput = document.getElementById('cat-name-input');
    const firstContent = document.getElementById('first-content');
    const secondContent = document.getElementById('second-content');
    const thirdContent = document.getElementById('third-content');
    const fourthContent = document.getElementById('fourth-content');
    const fifthContent = document.getElementById('fifth-content');
    const sixthContent = document.getElementById('sixth-content');
    const seventhContent = document.getElementById('seventh-content');
    const submitBtnFourth = document.getElementById('submit-btn-fourth');
    const catNameInputFourth = document.getElementById('cat-name-input-fourth');
    const meowBtn = document.getElementById('meow-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const kiddingBtn = document.getElementById('kidding-btn');

    let index = 0;
    let currentText = text;

    // Confetti Animation
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let confettiParticles = [];
    let animationFrame;

    // Hearts Animation (Sixth Content)
    const heartsCanvas = document.getElementById('hearts-canvas');
    const heartsCtx = heartsCanvas.getContext('2d');
    let heartParticles = [];
    let heartsAnimationFrame;

    // Rain Animation (Seventh Content)
    const rainCanvas = document.getElementById('rain-canvas');
    const rainCtx = rainCanvas.getContext('2d');
    let rainDrops = [];
    let rainAnimationFrame;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // ========== CONFETTI FUNCTIONS ==========
    function createConfetti() {
        const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ffa801', '#5f27cd', '#00d2d3'];
        for (let i = 0; i < 150; i++) {
            confettiParticles.push({
                x: randomRange(0, canvas.width),
                y: randomRange(-canvas.height, 0),
                size: randomRange(5, 15),
                speedY: randomRange(2, 5),
                speedX: randomRange(-1, 1),
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: randomRange(0, 360),
                rotationSpeed: randomRange(-5, 5)
            });
        }
    }

    function updateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiParticles.forEach((particle, index) => {
            particle.y += particle.speedY;
            particle.x += particle.speedX;
            particle.rotation += particle.rotationSpeed;

            // Remove particles that fall off screen and add new ones at top
            if (particle.y > canvas.height) {
                confettiParticles[index] = {
                    x: randomRange(0, canvas.width),
                    y: -10,
                    size: randomRange(5, 15),
                    speedY: randomRange(2, 5),
                    speedX: randomRange(-1, 1),
                    color: particle.color,
                    rotation: randomRange(0, 360),
                    rotationSpeed: randomRange(-5, 5)
                };
            }

            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate((particle.rotation * Math.PI) / 180);
            ctx.fillStyle = particle.color;
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            ctx.restore();
        });

        animationFrame = requestAnimationFrame(updateConfetti);
    }

    function startConfetti() {
        resizeCanvas();
        createConfetti();
        updateConfetti();
    }

    function stopConfetti() {
        cancelAnimationFrame(animationFrame);
        confettiParticles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // ========== HEARTS FUNCTIONS ==========
    function resizeHeartsCanvas() {
        heartsCanvas.width = window.innerWidth;
        heartsCanvas.height = window.innerHeight;
    }

    function drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(x, y, x - size / 2, y - size / 2, x - size / 2, y + size / 4);
        ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size, x, y + size);
        ctx.bezierCurveTo(x, y + size, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
        ctx.bezierCurveTo(x + size / 2, y - size / 2, x, y, x, y + size / 4);
        ctx.fill();
    }

    function createHearts() {
        const colors = ['#ff6b9d', '#ff1744', '#f50057', '#ff4081', '#e91e63'];
        heartParticles = [];
        for (let i = 0; i < 50; i++) {
            heartParticles.push({
                x: randomRange(0, heartsCanvas.width),
                y: randomRange(heartsCanvas.height, heartsCanvas.height + 200),
                size: randomRange(15, 30),
                speedY: randomRange(-2, -4),
                speedX: randomRange(-0.5, 0.5),
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: randomRange(0.6, 1)
            });
        }
    }

    function updateHearts() {
        heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
        
        heartParticles.forEach((heart, index) => {
            heart.y += heart.speedY;
            heart.x += heart.speedX;

            if (heart.y < -50) {
                heartParticles[index] = {
                    x: randomRange(0, heartsCanvas.width),
                    y: heartsCanvas.height + 10,
                    size: randomRange(15, 30),
                    speedY: randomRange(-2, -4),
                    speedX: randomRange(-0.5, 0.5),
                    color: heart.color,
                    opacity: randomRange(0.6, 1)
                };
            }

            heartsCtx.save();
            heartsCtx.globalAlpha = heart.opacity;
            heartsCtx.fillStyle = heart.color;
            drawHeart(heartsCtx, heart.x, heart.y, heart.size);
            heartsCtx.restore();
        });

        heartsAnimationFrame = requestAnimationFrame(updateHearts);
    }

    function startHearts() {
        resizeHeartsCanvas();
        createHearts();
        updateHearts();
    }

    function stopHearts() {
        cancelAnimationFrame(heartsAnimationFrame);
        heartParticles = [];
        heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
    }

    // ========== RAIN FUNCTIONS ==========
    function resizeRainCanvas() {
        rainCanvas.width = window.innerWidth;
        rainCanvas.height = window.innerHeight;
    }

    function createRain() {
        rainDrops = [];
        for (let i = 0; i < 200; i++) {
            rainDrops.push({
                x: randomRange(0, rainCanvas.width),
                y: randomRange(-rainCanvas.height, 0),
                length: randomRange(10, 30),
                speed: randomRange(5, 15),
                opacity: randomRange(0.3, 0.8)
            });
        }
    }

    function updateRain() {
        rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        
        rainDrops.forEach((drop, index) => {
            drop.y += drop.speed;

            if (drop.y > rainCanvas.height) {
                rainDrops[index] = {
                    x: randomRange(0, rainCanvas.width),
                    y: -drop.length,
                    length: drop.length,
                    speed: drop.speed,
                    opacity: drop.opacity
                };
            }

            rainCtx.save();
            rainCtx.globalAlpha = drop.opacity;
            rainCtx.strokeStyle = '#000000';
            rainCtx.lineWidth = 2;
            rainCtx.beginPath();
            rainCtx.moveTo(drop.x, drop.y);
            rainCtx.lineTo(drop.x, drop.y + drop.length);
            rainCtx.stroke();
            rainCtx.restore();
        });

        rainAnimationFrame = requestAnimationFrame(updateRain);
    }

    function startRain() {
        resizeRainCanvas();
        createRain();
        updateRain();
    }

    function stopRain() {
        cancelAnimationFrame(rainAnimationFrame);
        rainDrops = [];
        rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    }

    // Resize handlers
    window.addEventListener('resize', function() {
        resizeConfettiCanvas();
        resizeHeartsCanvas();
        resizeRainCanvas();
    });

    function type() {
        if (index < currentText.length) {
            typewriter.textContent += currentText.charAt(index);
            index++;
            setTimeout(type, 20);
        }
    }

    function clearAndType(newMessage) {
        typewriter.textContent = '';
        currentText = newMessage;
        index = 0;
        type();
    }

    // Typewriter for third section
    function typeThird() {
        typewriterThird.textContent = ''; // Clear first
        let indexThird = 0;
        function typeChar() {
            if (indexThird < thirdText.length) {
                typewriterThird.textContent += thirdText.charAt(indexThird);
                indexThird++;
                setTimeout(typeChar, 20);
            }
        }
        typeChar();
    }

    // Typewriter for fifth section
    function typeFifth() {
        typewriterFifth.textContent = ''; // Clear first
        let indexFifth = 0;
        function typeChar() {
            if (indexFifth < fifthText.length) {
                typewriterFifth.textContent += fifthText.charAt(indexFifth);
                indexFifth++;
                setTimeout(typeChar, 20);
            }
        }
        typeChar();
    }

    function checkCatName(name) {
        const validNames = ['koi', 'tan'];
        return validNames.includes(name.toLowerCase());
    }

    // Button click handler for start button
    startBtn.addEventListener('click', function() {
        firstContent.style.display = 'none';
        secondContent.style.display = 'flex';
        type();
    });

    // Button click handler for learn button
    learnBtn.addEventListener('click', function() {
        clearAndType(newText);
        learnBtn.style.display = 'none';
        inputSection.style.display = 'flex';
    });

    // Button click handler for submit button (second content)
    submitBtn.addEventListener('click', function() {
        const catName = catNameInput.value.trim();
        if (catName) {
            if (checkCatName(catName)) {
                // Correct name - go to third content
                secondContent.style.display = 'none';
                thirdContent.style.display = 'flex';
                typeThird();
                startConfetti(); // Start confetti
            } else {
                // Wrong name - go to fourth content
                secondContent.style.display = 'none';
                fourthContent.style.display = 'flex';
            }
        } else {
            alert('Please enter your cat name!');
        }
    });

    // Button click handler for submit button (fourth content)
    submitBtnFourth.addEventListener('click', function() {
        const catName = catNameInputFourth.value.trim();
        if (catName) {
            if (checkCatName(catName)) {
                // Correct name - go to third content
                fourthContent.style.display = 'none';
                thirdContent.style.display = 'flex';
                typeThird();
                startConfetti(); // Start confetti
            } else {
                // Wrong name - stay on fourth content, clear input
                catNameInputFourth.value = '';
                catNameInputFourth.placeholder = 'Hmmm...';
            }
        } else {
            alert('Please enter your cat name!');
        }
    });

    // Meow button handler - go to fifth content
    meowBtn.addEventListener('click', function() {
        thirdContent.style.display = 'none';
        fifthContent.style.display = 'flex';
        stopConfetti(); // Stop confetti
        typeFifth();
    });

    // Yes button handler - go to sixth content
    yesBtn.addEventListener('click', function() {
        fifthContent.style.display = 'none';
        sixthContent.style.display = 'flex';
        startHearts(); // Start hearts effect
    });

    // No button handler - go to seventh content
    noBtn.addEventListener('click', function() {
        fifthContent.style.display = 'none';
        seventhContent.style.display = 'flex';
        startRain(); // Start rain effect
    });

    // Kidding button handler - go to sixth content
    kiddingBtn.addEventListener('click', function() {
        seventhContent.style.display = 'none';
        sixthContent.style.display = 'flex';
        stopRain(); // Stop rain
        startHearts(); // Start hearts
    });
});