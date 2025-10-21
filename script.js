const searchBtn = document.getElementById('searchBtn');
const wordInput = document.getElementById('wordInput');
const result = document.getElementById('result');

searchBtn.addEventListener("click", () => {
    const word = wordInput.value

} )

fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
.then(response => response.json)
.then(data => console.log(data))