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
    snowflake.style.fontSize = Math.random() * 5 + 10 + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 6 + 's';
    document.body.appendChild(snowflake);
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}
setInterval(createSnowflake, 100);