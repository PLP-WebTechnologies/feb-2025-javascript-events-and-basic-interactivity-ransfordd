(() => {
    const changeBgButton = document.querySelector('.change-bg');
    const mainSection = document.getElementById('main');
    const backgrounds = [
      "images/@wallandiadesk (2).jpg",
      "images/@wallandiadesk (3).jpg",
      "images/@wallandiadesk (4).jpg",
      "images/@wallandiadesk (5).jpg"
    ];
    let currentIndex = 0;

    // Change background on click
    changeBgButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        mainSection.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
      });

    // Password match live validation
    const passwordInput = document.getElementById('password');
    const verifyPasswordInput = document.getElementById('verifyPassword');
    const passwordMatchMsg = document.getElementById('password-match-msg');
    function checkPasswordMatch() {
    const pwd = passwordInput.value;
    const verifyPwd = verifyPasswordInput.value;
    if (verifyPwd.length === 0) {
        passwordMatchMsg.textContent = '';
        passwordMatchMsg.classList.remove('match');
    } else if (pwd === verifyPwd) {
        passwordMatchMsg.textContent = 'Passwords match';
        passwordMatchMsg.classList.add('match');
    } else {
        passwordMatchMsg.textContent = 'Passwords do not match';
        passwordMatchMsg.classList.remove('match');
    }
    }
    verifyPasswordInput.addEventListener('input', checkPasswordMatch);
    passwordInput.addEventListener('input', checkPasswordMatch);
    // Keypress detection on all inputs: flash border and log to console
    const inputs = document.querySelectorAll('.input');
    inputs.forEach((input) => {
    input.addEventListener('keypress', (e) => {
        // Flash border color
        input.classList.add('keypress-flash');
        setTimeout(() => {
        input.classList.remove('keypress-flash');
        }, 200);
        // Log keypress info to console (can remove or comment out in production)
        console.log(`Key pressed: "${e.key}" in input with id "${input.id}"`);
    });
    });

    // Secret action on double-click or long press on changeBgButton
    const secretModal = document.getElementById('secret-modal');
    let longPressTimer = null;
    const longPressDuration = 600; // ms
    function showSecretModal() {
    secretModal.style.display = 'block';
    mainSection.classList.add('secret-mode');
    setTimeout(() => {
        secretModal.style.display = 'none';
        mainSection.classList.remove('secret-mode');
    }, 5000);
    }

    // Double click triggers secret action
    changeBgButton.addEventListener('dblclick', (e) => {
    e.preventDefault();
    showSecretModal();
    });
    // Long press detection (mouse and touch)
    function startLongPressTimer() {
    longPressTimer = setTimeout(() => {
        showSecretModal();
    }, longPressDuration);
    }

    function cancelLongPressTimer() {
    if (longPressTimer !== null) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
    }
    changeBgButton.addEventListener('mousedown', startLongPressTimer);
    changeBgButton.addEventListener('touchstart', startLongPressTimer);
    changeBgButton.addEventListener('mouseup', cancelLongPressTimer);
    changeBgButton.addEventListener('mouseleave', cancelLongPressTimer);
    changeBgButton.addEventListener('touchend', cancelLongPressTimer);
    changeBgButton.addEventListener('touchcancel', cancelLongPressTimer);
})();