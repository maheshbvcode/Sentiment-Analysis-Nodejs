const { SentimentAnalyzer , PorterStemmer , WordTokenizer} = require("natural");
const { removeStopwords } = require("stopword");


 function getSentiment(text){
     /** 
     * Removing non alphabetical and special characters
     * Converting to lowercase
     */
     const alphaOnlyReview = text.replace(/[^a-zA-Z\s]+/g, '');
    
     /**
      * Tokenization
      */
     const tokenizer = new WordTokenizer();
     const tokenizedText= tokenizer.tokenize(alphaOnlyReview);
   
 
     /** Remove stop words */
     const filteredText = removeStopwords(tokenizedText);
  
     const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

     return analyzer.getSentiment(filteredText);
}


module.exports = getSentiment;
