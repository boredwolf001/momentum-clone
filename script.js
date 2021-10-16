const nameInput = document.querySelector('.name')
const welcomeMsg = document.querySelector('.welcome-msg')
const time = document.querySelector('.time')
const container = document.querySelector('.container')
const quoteText = document.querySelector('.quote-text')
const quoteAuthor = document.querySelector('.quote-author')

container.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

setTimeImageAndWelcomemsg()
setInterval(setTimeImageAndWelcomemsg, 1000)

function setTimeImageAndWelcomemsg() {
  let date = new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()

  if (localStorage.getItem('name')) {
    welcomeMsg.innerHTML = `Good ${
      hours >= 12 ? 'Evening' : 'Morning'
    }, ${localStorage.getItem('name')}.`
  }
  container.style.backgroundImage = `url(${
    hours >= 12 ? './images/evening.jpg' : './images/morning.jpg'
  })`

  time.innerText = `${formatTime(hours)}:${formatTime(minutes)}`
}

function formatTime(time) {
  if (time < 10) {
    return '0' + time
  } else {
    return time
  }
}

function setName() {
  window.location.reload()
  localStorage.setItem('name', nameInput.value)
}

nameInput.onblur = setName

function setQuote() {
  let randomN = Math.floor(Math.random() * 500 + 1)

  axios
    .get('https://type.fit/api/quotes')
    .then((res) => {
      quoteText.innerHTML = res.data[randomN].text
      quoteAuthor.innerHTML = res.data[randomN].author
        ? res.data[randomN].author
        : 'Unknown'
    })
    .catch((err) => console.log(err))
}

setQuote()
