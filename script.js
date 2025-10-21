const searchBtn = document.getElementById('searchBtn');
const wordInput = document.getElementById('wordInput');
const result = document.getElementById('result');

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const word = wordInput.value

    if(word === ''){
        result.innerHTML=`
        <p>Please type a word</p>
        `
        return
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
        const myWord = data[0];
        const phonetic = data[0].phonetics[1]
        console.log(data)

        result.innerHTML = `
        <div class="card">
        <h2>${data[0].word}</h2>
        <div>${phonetic.text}</div>
        <audio controls src=${phonetic.audio}></audio>

        </div>


        ${myWord.meanings.map(meaning => `
        <div class="card">
            <div class="muted">${meaning.partOfSpeech}</div>
            <ol>
                ${meaning.definitions.map((def, i) => `
                <li>
                ${def.definition}
                ${def.example ? `<div class="muted">Example: “${def.example}”</div>` : ""}
                </li> `).join("")}
            </ol>

                ${meaning.synonyms.length > 0 
      ? `<div class="muted">Synonyms: ${meaning.synonyms.join(", ")}</div>` 
      : ""}


        </div>
        `).join("")}

        `
    })
    .catch(() => {
      result.innerHTML = `<h2>Sorry! There is no such word</h2>`;
    });

} )

wordInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchBtn.click();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const word = wordInput.value.trim();
  searchBtn.click();
});