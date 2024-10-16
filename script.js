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
