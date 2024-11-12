document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function smoothScrollTo(target, duration) {
    const startPosition = window.pageYOffset;
    const targetPosition = document.querySelector(target).offsetTop;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
  
    // Ease function for smooth scroll effect
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }

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
                toggleButton.textContent = 'Step back';
            } else {
                icons.forEach(icon => {
                    icon.style.left = '';
                    icon.style.top = '';
                });
                startTime = Date.now();
                updateWaveAnimation();
                toggleButton.textContent = 'Abracadabra';
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




    function setupPixelEffect(container, imgSrc) {
        const rows = 15;
        const cols = 15;
        const pixelSize = 10;
  
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.width = `${pixelSize}px`;
            pixel.style.height = `${pixelSize}px`;
            pixel.style.backgroundImage = `url(${imgSrc})`;
            pixel.style.backgroundPosition = `-${col * pixelSize}px -${row * pixelSize}px`;
            pixel.style.left = `${col * pixelSize}px`;
            pixel.style.top = `${row * pixelSize}px`;
            container.appendChild(pixel);
          }
        }
      }
  
      function disappearIn3D(container) {
        const pixels = container.querySelectorAll('.pixel');
        pixels.forEach(pixel => {
          const randomX = (Math.random() - 0.5) * 300;
          const randomY = (Math.random() - 0.5) * 300;
          const randomZ = (Math.random() - 0.5) * 300;
  
          pixel.style.transform = `translate3d(${randomX}px, ${randomY}px, ${randomZ}px) rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`;
          pixel.style.opacity = '0';
        });
  
        setTimeout(() => {
          pixels.forEach(pixel => {
            pixel.style.transform = 'translate3d(0, 0, 0)';
            pixel.style.opacity = '1';
          });
        }, 1000);
      }
  
      document.querySelectorAll('.image-pixel-wrapper').forEach(wrapper => {
        const imgSrc = wrapper.getAttribute('data-img-src');
        setupPixelEffect(wrapper, imgSrc);
  
        wrapper.addEventListener('click', () => disappearIn3D(wrapper));
      });

      const certifications = [
        { name: 'C Programming', platform: 'Udemy', logo: 'https://img.icons8.com/color/48/000000/c-programming.png' },
        { name: 'Java', platform: 'Udemy', logo: 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png' },
        { name: 'Python', platform: 'Guvi', logo: 'https://img.icons8.com/color/48/000000/python.png' },
        { name: 'HTML', platform: 'Udemy', logo: 'https://img.icons8.com/color/48/000000/html-5.png' },
        { name: 'CSS', platform: 'Udemy', logo: 'https://img.icons8.com/color/48/000000/css3.png' },
        { name: 'Bootstrap', platform: 'Guvi', logo: 'https://img.icons8.com/color/48/000000/bootstrap.png' },
        { name: 'JavaScript', platform: 'Udemy', logo: 'https://img.icons8.com/color/48/000000/javascript.png' },
        { name: 'React', platform: 'Udemy', logo: 'https://img.icons8.com/color/48/000000/react-native.png' },
        { name: 'Git', platform: 'Udemy', logo: 'https://img.icons8.com/color/48/000000/git.png' }
    ];

    const track = document.getElementById('certTrack');
    let scrollPosition = 0;
    let isScrolling = true;
    let animationFrameId = null;

    function createCertificationCards() {
        // Create three sets of cards for smooth infinite scrolling
        const tripleCards = [...certifications, ...certifications, ...certifications];
        
        tripleCards.forEach((cert) => {
            const card = document.createElement('div');
            card.className = 'cert-item';
            
            card.innerHTML = `
                <div class="cert-logo-wrapper">
                    <img src="${cert.logo}" alt="${cert.name}" class="cert-logo">
                </div>
                <div class="cert-info">
                    <div class="cert-name">${cert.name}</div>
                    <div class="cert-platform">${cert.platform}</div>
                </div>
            `;
            
            // Pause scrolling on hover
            card.addEventListener('mouseenter', () => {
                stopScrolling();
            });
            
            card.addEventListener('mouseleave', () => {
                startScrolling();
            });
            
            track.appendChild(card);
        });
    }

    function scrollCertifications() {
        if (!isScrolling) return;

        scrollPosition -= 0.5; // Reduced speed for smoother scrolling
        const firstCardWidth = track.firstElementChild.offsetWidth + 24; // Including gap

        if (Math.abs(scrollPosition) >= firstCardWidth) {
            scrollPosition = 0;
            track.appendChild(track.firstElementChild);
        }

        track.style.transform = `translateX(${scrollPosition}px)`;
        animationFrameId = requestAnimationFrame(scrollCertifications);
    }

    function stopScrolling() {
        isScrolling = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }

    function startScrolling() {
        if (!isScrolling) {
            isScrolling = true;
            scrollCertifications();
        }
    }

    // Initialize
    createCertificationCards();
    scrollCertifications();

    // Add event listeners for the container
    track.addEventListener('mouseenter', stopScrolling);
    track.addEventListener('mouseleave', startScrolling);


    function createSoftSkillsStars() {
        const starSection = document.querySelector('.soft-skills-star-section');
        for (let i = 0; i < 50; i++) {
          const star = document.createElement('span');
          star.className = 'soft-skills-star';
          star.textContent = '✦';
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.animationDelay = Math.random() * 3 + 's';
          starSection.appendChild(star);
        }
      }
      createSoftSkillsStars();

    //   contact


    document.getElementById('contactForm').addEventListener('submit', async function(event) {
        event.preventDefault();
  
        const form = event.target;
        const formData = new FormData(form);
  
        try {
          const response = await fetch('https://script.google.com/macros/s/AKfycbxv-1dsfLI83oCbXZbkTKW0rHEoB5wC4cgpqa4lRmq8LjbEAQZsfx9n5naO3eSEFXyl/exec', {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            alert('Form submitted successfully!');
            form.reset(); // Reset form fields
          } else {
            alert('There was an error submitting the form. Please try again.');
          }
        } catch (error) {
          alert('There was an error submitting the form. Please try again.');
        }
      });

      const pageHeight = document.body.scrollHeight;
      console.log("Total page height:", pageHeight + "px");
      



    //   party

    function fireSkyCracker() {
        // Create multiple "crackers" that rise up and burst
        const duration = 2 * 1000; // Duration of the effect in ms
        const animationEnd = Date.now() + duration;
        const defaultColors = ['#ff0', '#f00', '#0f0', '#fff' , '#ff69b4', '#ff4500'];

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        (function frame() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return;
            }

            // Configure and launch a confetti burst
            confetti({
                particleCount: 5,
                startVelocity: 30, // Speed of particles moving up
                spread: 60,
                origin: {
                    x: Math.random(), // Random horizontal position
                    y: 1 // Start from bottom of the screen
                },
                colors: [defaultColors[Math.floor(Math.random() * defaultColors.length)]]
            });

            // Continue launching confetti
            requestAnimationFrame(frame);
        })();
    }

    // Add event listener to the button to trigger the sky-cracker effect on click
    document.getElementById('yes').addEventListener('click', fireSkyCracker);