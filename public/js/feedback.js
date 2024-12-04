function submitFeedback(event) {
    event.preventDefault();

    // Assuming feedback submission is successful
    document.getElementById('feedbackForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
}