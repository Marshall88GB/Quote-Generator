const quoteContainer =document.getElementById ('quote-container');
const quoteText =document.getElementById ('quote');
const author =document.getElementById ('author');
const twitterBtn =document.getElementById ('twitter');
const newQuoteBtn =document.getElementById ('new-quote');
const loader = document.getElementById ('loader');

// Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }
//   hide Loader
function complite (){
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From Api

async function getQuote (){
    loading ();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
const response = await fetch (proxyUrl + apiUrl);
console.log (response)
const data = await response.json ();
// Ako je autor nepoznat dodaj 'Unknown'
if (data.quoteAuthor === '') {
    author.innerText = 'Unknown';
}else {
    author.innerText = data.quoteAuthor
}

// Za duzi tekst
if (data.quoteText.length > 120) {
    quoteText.classList.add('long-quote')
}else {
    quoteText.classList.remove('long-quote') 
}

quoteText.innerText = data.quoteText;
// stop loader
complite ();

    }catch (error){
        getQuote ();
       
    }


}

//twetter function

function tweetQuote (){
const quoteTwit = quoteText.innerText;
const authorTwit = author.innerText;
const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTwit} - ${authorTwit}`
window.open (twitterUrl, '_blank');

}

// Event Listener

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote)


// On Load
getQuote ();

