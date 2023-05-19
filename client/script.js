document.addEventListener('DOMContentLoaded', function() {
  // Get references to the required elements
  const form = document.getElementById('sentimentForm');
  const textInput = document.getElementById('textInput');
  const generalSentiment = document.getElementById('g-sentiment');
  const confidenceScore = document.getElementById('s-score');
  const resultsContainer = document.querySelector('.results');

  // Add a submit event listener to the form
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const text = textInput.value.trim();

    if (text !== '') {
      analyzeSentiment(text); // Call the function to analyze sentiment
    }
  });

  // Function to analyze sentiment using an API endpoint
  function analyzeSentiment(text) {
    fetch('https://sentiment-analysis-qcfk.onrender.com/analyze?text=' + encodeURIComponent(text), {
      method: 'GET'
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed. Status: ' + response.status);
        }
      })
      .then(data => {
        // Extract sentiment score from the API response
        const sentimentScore = data.score;
        // Determine sentiment label based on the score
        const sentiment = determineSentiment(sentimentScore);

        // Update the DOM with the sentiment and confidence score
        generalSentiment.textContent = sentiment;
        confidenceScore.textContent = sentimentScore.toFixed(2);

        // Update the background color based on sentiment
        updateBackgroundColor(sentiment);
      })
      .catch(error => {
        console.error('Request failed:', error);
      });
  }

  // Function to determine sentiment label based on the sentiment score
  function determineSentiment(score) {
    if (score > 0) {
      return 'Positive';
    } else if (score < 0) {
      return 'Negative';
    } else {
      return 'Neutral';
    }
  }

  // Function to update the background color based on sentiment
  function updateBackgroundColor(sentiment) {
    resultsContainer.className = 'results'; // Reset the class name

    if (sentiment === 'Positive') {
      resultsContainer.classList.add('bg-color-positive');
    } else if (sentiment === 'Negative') {
      resultsContainer.classList.add('bg-color-negative');
    } else {
      resultsContainer.classList.add('bg-color-neutral');
    }
  }
});
