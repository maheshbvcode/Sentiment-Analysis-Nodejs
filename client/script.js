document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sentimentForm');
    const textInput = document.getElementById('textInput');
    const generalSentiment = document.getElementById('g-sentiment');
    const confidenceScore = document.getElementById('s-score');
    const resultsContainer = document.querySelector('.results');

    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission

      const text = textInput.value.trim();

      if (text !== '') {
        analyzeSentiment(text);
      }
    });

    function analyzeSentiment(text) {
      fetch('https://sentiment-analysis-qcfk.onrender.com/analyze?text=' + encodeURIComponent(text),{
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
          const sentimentScore = data.score;
          const sentiment = determineSentiment(sentimentScore);
          generalSentiment.textContent = sentiment;
          confidenceScore.textContent = sentimentScore.toFixed(2);
          updateBackgroundColor(sentiment);
        })
        .catch(error => {
          console.error('Request failed:', error);
        });
    }

    function determineSentiment(score) {
      if (score > 0) {
        return 'Positive';
      } else if (score < 0) {
        return 'Negative';
      } else {
        return 'Neutral';
      }
    }

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
