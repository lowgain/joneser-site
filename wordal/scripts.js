const DIFFICULTY = 5

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

const createModal = (text, retry = false) => {
  const page = document.getElementById('body')
  const modalBG = document.createElement('div')
  const modal = document.createElement('div')
  const modalHeader = document.createElement('div')
  const modalBody = document.createElement('div')
  const modalText = document.createElement('p')
  const modalClose = document.createElement('button')
  modalBG.classList.add('modal-bg')
  modal.classList.add('modal')
  modalHeader.classList.add('modal-header')
  modalClose.classList.add('modal-close')
  modalBody.classList.add('modal-body')
  modalText.classList.add('modal-text')
  page.appendChild(modalBG)
  modalBG.appendChild(modal)
  modal.appendChild(modalHeader)
  modalHeader.appendChild(modalClose)
  modal.appendChild(modalBody)
  modalBody.appendChild(modalText)
  modalClose.textContent = `X`
  modalText.textContent = text
  if (retry) {
    const button = document.createElement('button')
    button.classList.add('try-again')
    button.textContent = 'Try Again?'
    button.onclick = () => {
      location.reload()
    }
    modalBody.appendChild(button)
  }
  modalClose.onclick = () => {
    modalBG.remove()
  }
  window.onclick = (event) => {
    if (event.target == modalBG) {
      modalBG.remove()
    }
  }
}

/**
 *
 * @param {Array.string} guess Array The current guess
 */
/*
function checkGuess(guess) {
  const rightGuess = Array.from(WORD)
  const row = Object.values(board.children).slice(
    rowNum * DIFFICULTY,
    rowNum * DIFFICULTY + DIFFICULTY,
  )
  let guessString = guess.toString().replaceAll(',', '')
  if (guessString.length != DIFFICULTY) {
    modalText.textContent = 'Not enough letters!'
    modal.style.display = 'flex'
    Object.values(row).forEach((box) => {
      box.textContent = ''
      box.classList.remove('filled-box')
      nextLetter -= 1
    })
    guess = []
    return
  } else if (!WORDS.includes(guessString)) {
    modalText.textContent = 'This is not a valid word!'
    modal.style.display = 'flex'
    Object.values(row).forEach((box) => {
      box.textContent = ''
      box.classList.remove('filled-box')
      nextLetter -= 1
    })
    guess = []
    return
  }

  for (let i = 0; i < DIFFICULTY; i++) {
    let status = ''
    let box = row[i]
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

  if (guessString === WORD) {
    modalText.textContent = 'You guessed right! Game over!'
    tryAgainBtn()
    modal.style.display = 'flex'
    guessesLeft = 0
    return
  } else {
    guessesLeft--
    guess = []
    if (guessesLeft === 0) {
      modalText.textContent = `You've run out of guesses!\nThe right word was "${WORD}`
      modal.style.display = 'flex'
      tryAgainBtn()
    }
  }
}

let rowNum = 0
document.addEventListener('keyup', (e) => {
  const row = Object.values(board.children).slice(
    rowNum * DIFFICULTY,
    rowNum * DIFFICULTY + DIFFICULTY,
  )
  const pressedKey = String(e.key).toLowerCase()
  if (guessesLeft === 0) {
    return
  }
  if (pressedKey === 'backspace' && nextLetter == lastRow) {
    console.log(nextLetter)
    console.log(lastRow)
    let box = row[nextLetter - 1]
    box.textContent = ''
    box.classList.remove('filled-box')
    guess.pop()
    nextLetter -= 1
    return
  }

  if (pressedKey === 'enter') {
    checkGuess(guess)
    guess = []
    lastRow += DIFFICULTY
    return
  }

  const found = pressedKey.match(/[a-z]/gi)
  if (found && found.length == 1) {
    if (nextLetter == DIFFICULTY) {
      return
    }
    row[nextLetter].textContent = pressedKey
    row[nextLetter].classList.add('filled-box')
    guess.push(pressedKey)
    nextLetter++
  }
})

document.getElementById('keyboard-cont').addEventListener('click', (e) => {
  if (!e.target.classList.contains('keyboard-button')) {
    return
  }
  const key = e.target.textContent == 'Back' ? 'Backspace' : e.target.textContent
  document.dispatchEvent(new KeyboardEvent('keyup', { key: key }))
})
*/
