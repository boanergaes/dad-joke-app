import './style.css'

const jokeDisplay = document.getElementById('joke-display')
const randomJokeBtn = document.getElementById('random-joke-btn')
const saveJokeBtn = document.getElementById('save-joke-btn')
const toolBarPopup = document.getElementById('tool-bar-popup')

async function getRandomJoke() {
  jokeDisplay.textContent = 'Fetching joke...'
  try {
    const randomJoke = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json'
      }
    })
    const data = await randomJoke.json()
    jokeDisplay.textContent = data['joke']
  }
  catch(err) {
      jokeDisplay.textContent = 'Error: There was trouble fetching the joke!'
      console.log(err)
  }
}

randomJokeBtn.addEventListener('click', getRandomJoke)

function getJokeStorage() {
  let jokes = localStorage.getItem('jokes')
  if (!jokes) {
    localStorage.setItem('jokes', JSON.stringify(new Set()))
    jokes = localStorage.getItem('jokes')
  }
  console.log(JSON.parse(jokes))
  return JSON.parse(jokes)
}

function storeJoke(joke) {
  const jokes = getJokeStorage()
  if (jokes.has(joke)) return false
  jokes.add(joke)
  localStorage.setItem('jokes', JSON.stringify(jokes))
  return true
}

saveJokeBtn.addEventListener('click', () => {
  const joke = jokeDisplay.textContent
  if (joke == '') {
    toolBarPopup.textContent = 'No joke to save!'
  }
  else if (storeJoke(jokeDisplay.textContent)) toolBarPopup.textContent = 'Joke saved!'
  else toolBarPopup.textContent = 'This joke is already saved!'
  toolBarPopup.style.display = 'block'
  setTimeout(() => {
    toolBarPopup.style.display = 'none'
  }, 1200)
})
