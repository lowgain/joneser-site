import { WORDS } from './words.js'

const CORRECT_WORD = WORDS[Math.floor(Math.random() * WORDS.length)]
const GUESSES = 6

let guess = []
let guessesLeft = GUESSES
let nextLetter = 0

console.log(CORRECT_WORD)

const modal = document.getElementById('modal')
const modalText = document.getElementById('modal-text')
const close = document.getElementsByClassName('close')[0]

for (let i = 0; i < GUESSES; i++) {
  let row = document.createElement('div')
  row.classList.add('letter-row')
  for (let j = 0; j < CORRECT_WORD.length; j++) {
    let box = document.createElement('div')
    box.classList.add('letter-box')
    row.appendChild(box)
  }
  document.getElementById('game-board').appendChild(row)
}

/**
 *
 * @param {Array.string} guess Array The current guess
 */
function checkGuess(guess) {
  const rightGuess = Array.from(CORRECT_WORD)
  const row = document.getElementsByClassName('letter-row')[GUESSES - guessesLeft]
  let guessString = guess.toString().replaceAll(',', '')
  if (guessString.length != CORRECT_WORD.length) {
    modalText.textContent = 'Not enough letters!'
    modal.style.display = 'flex'
    Object.values(row.children).forEach((box) => {
      box.textContent = ''
      box.classList.remove('filled-box')
      nextLetter -= 1
    })
    guess = []
    return
  } else if (!WORDS.includes(guessString)) {
    modalText.textContent = 'This is not a valid word!'
    modal.style.display = 'flex'
    Object.values(row.children).forEach((box) => {
      box.textContent = ''
      box.classList.remove('filled-box')
      nextLetter -= 1
    })
    guess = []
    return
  }

  for (let i = 0; i < CORRECT_WORD.length; i++) {
    let status = ''
    let box = row.children[i]
    let letter = guess[i]

    let letterPosition = rightGuess.indexOf(guess[i])
    status =
      letterPosition === -1 ? 'not-present' : guess[i] === rightGuess[i] ? 'correct' : 'wrong-place'
    rightGuess[letterPosition] = '#'

    let delay = 250 * i
    setTimeout(() => {
      box.classList.add(status)
      const key = Object.values(document.getElementsByClassName('keyboard-button')).find(
        (val) => val.textContent == letter,
      )
      if (key.classList.contains('correct')) {
        return
      }
      if (status == 'correct') {
        key.classList.remove('not-present')
        key.classList.remove('wrong-place')
      }
      if (status == 'wrong-place') {
        key.classList.remove('not-present')
      }
      key.classList.add(status)
    }, delay)
  }

  if (guessString === CORRECT_WORD) {
    modalText.textContent = 'You guessed right! Game over!'
    tryAgainBtn()
    modal.style.display = 'flex'
    guessesLeft = 0
    return
  } else {
    guessesLeft--
    guess = []
    if (guessesLeft === 0) {
      modalText.textContent = `You've run out of guesses!\nThe right word was "${CORRECT_WORD}`
      modal.style.display = 'flex'
      tryAgainBtn()
    }
  }
}

document.addEventListener('keyup', (e) => {
  const row = document.getElementsByClassName('letter-row')[GUESSES - guessesLeft]
  const pressedKey = String(e.key).toLowerCase()
  if (guessesLeft === 0) {
    return
  }
  if (pressedKey === 'backspace' && nextLetter !== 0) {
    let box = row.children[nextLetter - 1]
    box.textContent = ''
    box.classList.remove('filled-box')
    guess.pop()
    nextLetter -= 1
    return
  }

  if (pressedKey === 'enter') {
    checkGuess(guess)
    guess = []
    nextLetter = 0
    return
  }

  const found = pressedKey.match(/[a-z]/gi)
  if (found && found.length == 1) {
    if (nextLetter == CORRECT_WORD.length) {
      return
    }
    row.children[nextLetter].textContent = pressedKey
    row.children[nextLetter].classList.add('filled-box')
    guess.push(pressedKey)
    nextLetter++
  }
})

document.getElementById('keyboard-cont').addEventListener('click', (e) => {
  if (!e.target.classList.contains('keyboard-button')) {
    return
  }
  const key = e.target.textContent == 'Del' ? 'Backspace' : e.target.textContent
  document.dispatchEvent(new KeyboardEvent('keyup', { key: key }))
})

close.onclick = () => {
  modal.style.display = 'none'
}

/**
 *
 */
function tryAgainBtn() {
  const modalBody = document.getElementsByClassName('modal-body')
  const button = document.createElement('button')
  button.classList.add('try-again')
  button.textContent = 'Try Again?'
  button.onclick = () => {
    location.reload()
  }
  modalBody[0].appendChild(button)
  return
}
