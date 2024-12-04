
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.challenge-form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent actual form submission

            const challengeCard = form.closest('.challenge-card');
            const pointsElement = challengeCard.querySelector('.points');
            const submitButton = form.querySelector('button');
            const pointsValue = form.getAttribute('data-points');
            const userPoints = document.getElementById('user-points');

            // Update the points display
            pointsElement.innerHTML = `<i class="fas fa-check-circle"></i> ${pointsValue}`;

            // Update the total user points
            userPoints.textContent = parseInt(userPoints.textContent) + parseInt(pointsValue);

            // Disable the button and show 'Submitted'
            submitButton.textContent = 'Submitted';
            submitButton.disabled = true;
            submitButton.classList.add('btn-disabled');

            // Add a 'submitted' class to disable hover effect and style the card
            challengeCard.classList.add('submitted');

            // Apply party boom effect
            const confettiCanvas = document.getElementById('confettiCanvas');
            const confetti = createConfetti(confettiCanvas);
            confetti();

            // Simulate an asynchronous upload process
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds

            // Remove party boom effect after the animation
            confettiCanvas.style.display = 'none';
        });
    });

    function createConfetti(canvas) {
        const myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true
        });

        return () => myConfetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
});
