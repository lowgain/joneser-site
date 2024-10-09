const DIFFICULTY = 5

const randomWordApiUrl = 'https://random-word-api.herokuapp.com/word'
const dictionaryApiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const main = async () => {
  const difficulty = DIFFICULTY
  const guesses = difficulty + 1
  const word = await fetch(`https://random-word-api.herokuapp.com/word?length=${difficulty}`)
    .then((res) => res.json())
    .then((json) => json[0])
  console.log(word)

  init(difficulty, guesses)
}
main()

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

const modal = (text, retry = false) => {
  const modalBG = document.getElementById('modal-bg')
  const modalBody = document.getElementsByClassName('modal-body')[0]
  const modalText = document.getElementsByClassName('modal-text')[0]
  const modalClose = document.getElementsByClassName('modal-close')[0]
  modalText.textContent = text
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

const removeLetter = (letterBox) => {
  letterBox.textContent = ''
  letterBox.classList.remove('filled-box')
  return
}

const addLetter = (letterBox, letter) => {
  letterBox.classList.add('filled-box')
  letterBox.textContent = letter
}

const checkGuess = async (word, guess, difficulty) => {
  if (guess == word) {
    modal('Congrats!!\nYou Win!!', true)
  }
  if (guess.length < difficulty) {
    modal('Not enough letters!')
    return false
  }
  const isValid = await fetch(dictionaryApiUrl + guess).then((res) => res.status)
  if (isValid == 404) {
    modal('Not a valid word!')
    return false
  }
  guess = guess.split('').map((letter, index) => {
    return letter == word[index] ? 'correct' : letter
  })
  guess = guess.map((letter) => {
    if (letter == 'correct') {
      return letter
    }
    if (word.includes(letter)) {
      return 'wrong-place'
    }
    return 'not-present'
  })
  return guess
}

const colorize = (boxArray, key) => {
  boxArray.forEach((letterBox, index) => {
    setTimeout(() => {
      letterBox.classList.add(key[index])
    }, 250 * index)
  })
}

main()
