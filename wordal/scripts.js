const DIFFICULTY = 5

const randomWordApiUrl = 'https://random-word-api.herokuapp.com/word'
const dictionaryApiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const main = async () => {
  const difficulty = DIFFICULTY
  const guesses = difficulty + 1
  const word = await fetch(randomWordApiUrl + `?length=${difficulty}`)
    .then((res) => res.json())
    .then((json) => json[0])
  console.log(word)

  let guess = ''
  let guessesLeft = guesses
  let columnNum = 0
  document.addEventListener('keydown', async (event) => {
    const row = Object.values(document.getElementsByClassName(`row-${guesses - guessesLeft}`))
    if (guessesLeft <= 0) {
      return
    }
    if (event.key == 'Backspace' && columnNum != 0) {
      columnNum--
      removeLetter(row[columnNum])
      guess = guess.slice(0, -1)
      return
    }
    if (event.key == 'Enter') {
      if (guess == word) {
        modal('You Win!!!', true)
        colorize(row, guess, word)
        guessesLeft = 0
        return
      } else {
        if (await validateGuess(guess, difficulty)) {
          guessesLeft--
          colorize(row, guess, word)
        } else {
          row.forEach((letterBox) => removeLetter(letterBox))
        }
      }
      if (guessesLeft == 0) { modal(`You Lose :(<br>The word was ${word}`, true) }
      guess = ''
      columnNum = 0
      return
    }
    if (event.key.search(/^[a-z]$/i) == 0) {
      addLetter(row[columnNum], event.key)
      guess += event.key
      columnNum++
      return
    }
  })

  document.getElementById('keyboard').onclick = (event) => {
    const key = event.target.textContent == 'Back' ? 'Backspace' : event.target.textContent
    document.dispatchEvent(new KeyboardEvent('keydown', { key: key }))
  }

  init(difficulty, guesses)
}

const init = (difficulty, guesses) => {
  const board = document.getElementById('game-board')
  for (let i = 0; i < guesses; i++) {
    for (let j = 0; j < difficulty; j++) {
      const box = document.createElement('div')
      box.classList.add('letter-box', `row-${i}`, `column-${j}`)
      board.appendChild(box)
    }
  }
}

const removeLetter = (letterBox) => {
  letterBox.textContent = ''
  letterBox.classList.remove('filled-box')
}

const addLetter = (letterBox, letter) => {
  letterBox.classList.add('filled-box')
  letterBox.textContent = letter
}

const validateGuess = async (guess, difficulty) => {
  if (guess.length < difficulty) {
    modal('Not enough letters!')
    return false
  }
  const isValid = await fetch(dictionaryApiUrl + guess).then((res) => res.status)
  if (isValid == 404) {
    modal('Not a valid word!')
    return false
  }
  return true
}

const colorize = (row, guess, word) => {
  let key = [...word]
  guess = guess.split('').map((letter, index) => {
    return letter == word[index] ? key[index] = 'correct' : letter
  })
  guess = guess.map((letter) => {
    if (letter == 'correct') {
      return letter
    } else {
      return key.includes(letter) ? key[key.indexOf(letter)] = 'wrong-place' : 'not-present'
    }
  })
  row.forEach((letterBox, index) => {
    setTimeout(() => {
      letterBox.classList.add(guess[index])
    }, 250 * index)
  })
}

const modal = (text, retry = false) => {
  const modalBG = document.getElementById('modal-bg')
  const modalBody = document.getElementsByClassName('modal-body')[0]
  const modalClose = document.getElementsByClassName('modal-close')[0]
  modalBody.innerHTML = text
  if (retry) {
    const button = document.createElement('button')
    button.classList.add('try-again')
    button.textContent = 'Retry?'
    button.onclick = () => {
      location.reload()
    }
    modalBody.appendChild(button)
  }
  modalClose.onclick = () => {
    modalBG.style = 'display:none'
  }
  window.onclick = (event) => {
    if (event.target == modalBG) {
      modalBG.style = 'display:none'
    }
  }
  modalBG.style = 'display:flex'
}

main()
