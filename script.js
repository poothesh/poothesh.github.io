document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 9 + 10 + 'px';
    snowflake.style.animationDuration = Math.random() * 75 + 6 + 's';
    document.body.appendChild(snowflake);
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

// Change the interval from 100ms to 500ms to make fewer snowflakes
setInterval(createSnowflake, 500);




document.body.addEventListener('pointermove', (event) => {
    const x = event.clientX.toFixed(2);
    const y = event.clientY.toFixed(2);
    const xp = (event.clientX / window.innerWidth).toFixed(2);
    const yp = (event.clientY / window.innerHeight).toFixed(2);
    
    document.documentElement.style.setProperty('--x', x);
    document.documentElement.style.setProperty('--xp', xp);
    document.documentElement.style.setProperty('--y', y);
    document.documentElement.style.setProperty('--yp', yp);
  });

















  const icons = document.querySelectorAll('.skill-icon');
        const container = document.querySelector('.skills-container');
        const toggleButton = document.querySelector('.toggle-follow');
        let isFollowing = false;
        let mouseX = 0, mouseY = 0;
        let positions = [];
        let waveAnimationFrame;
        let startTime = Date.now();

        // Initialize positions array
        icons.forEach(() => {
            positions.push({ x: 0, y: 0 });
        });

        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        function getDistance(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        }

        function updateWaveAnimation() {
            if (isFollowing) return;

            const currentTime = Date.now();
            const elapsed = (currentTime - startTime) / 1000;

            icons.forEach((icon, index) => {
                // Create alternating wave pattern
                const offset = index * (Math.PI / 4); // Phase offset for each icon
                const yOffset = Math.sin(elapsed * 2 + offset) * 5; // 5px amplitude
                icon.style.transform = `translateY(${yOffset}px)`;
            });

            waveAnimationFrame = requestAnimationFrame(updateWaveAnimation);
        }

        function updatePositions() {
            if (!isFollowing) return;

            // Update first position based on mouse
            let targetX = mouseX;
            let targetY = mouseY;

            // Update each icon's position
            icons.forEach((icon, index) => {
                if (index === 0) {
                    positions[0].x = lerp(positions[0].x, targetX, 0.15);
                    positions[0].y = lerp(positions[0].y, targetY, 0.15);
                } else {
                    const prevX = positions[index - 1].x;
                    const prevY = positions[index - 1].y;
                    const distance = getDistance(positions[index].x, positions[index].y, prevX, prevY);
                    const spacing = 30;

                    if (distance > spacing) {
                        const angle = Math.atan2(prevY - positions[index].y, prevX - positions[index].x);
                        const targetX = prevX - Math.cos(angle) * spacing;
                        const targetY = prevY - Math.sin(angle) * spacing;
                        
                        positions[index].x = lerp(positions[index].x, targetX, 0.2);
                        positions[index].y = lerp(positions[index].y, targetY, 0.2);
                    }
                }

                icon.style.left = `${positions[index].x}px`;
                icon.style.top = `${positions[index].y}px`;
                icon.style.transform = 'none'; // Reset wave animation transform
            });

            requestAnimationFrame(updatePositions);
        }

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        // Toggle following behavior
        toggleButton.addEventListener('click', () => {
            isFollowing = !isFollowing;
            container.classList.toggle('following');
            
            if (isFollowing) {
                cancelAnimationFrame(waveAnimationFrame);

                // Keep the current positions of the icons when starting the follow mode
                positions.forEach((pos, index) => {
                    const iconRect = icons[index].getBoundingClientRect();
                    pos.x = iconRect.left - container.getBoundingClientRect().left;
                    pos.y = iconRect.top - container.getBoundingClientRect().top;
                });

                icons.forEach(icon => {
                    icon.style.transform = 'none';
                });
                updatePositions();
                toggleButton.textContent = 'Stop Following';
            } else {
                icons.forEach(icon => {
                    icon.style.left = '';
                    icon.style.top = '';
                });
                startTime = Date.now();
                updateWaveAnimation();
                toggleButton.textContent = 'Click to suprise';
            }
        });

        // Start wave animation initially
        updateWaveAnimation();


        const nameElement = document.getElementById("name");
    const name = "POOTHESH M"; // Use a regular space here
    const repeatedName = name.split('').map((letter, index) => {
        // Check if the letter is a space and wrap it accordingly
        if (letter === ' ') {
            return `<span class="letter" style="animation-delay: ${index * 0.5}s">&nbsp;</span>`; // Use &nbsp; for proper spacing
        } else {
            return `<span class="letter" style="animation-delay: ${index * 0.5}s">${letter}</span>`; // For other letters
        }
    }).join('');
    nameElement.innerHTML = repeatedName;