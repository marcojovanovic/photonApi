// get apiKey +
// html, css +
// curated photo sa api, slike koje su trending +
// osnovni api call, dokumentacija zahteva header +
// prikazi slike na strani +
// drugi api call za search +
// refactor ako te ne mrzi +
// clear page before submit, clear input +
// klikom na download da vidis orgnialnu sliku +
// doradi css +
// osposobi more za vise slika, novi api call sa trazenim slikama



// variables 
const apiKey = `563492ad6f917000010000014a31f051e3b24528b0764348c4f359df`
const imgContainer = document.querySelector('.img-container')
const input = document.querySelector('#input')
const searchBtn = document.querySelector('#btn')
const more = document.querySelector('#more')
let page = 1


let inputsArr = []


// basic call
document.addEventListener("DOMContentLoaded", () => {

  getPhotos()


})


async function getPhotos() {

  const res = await fetch(`https://api.pexels.com/v1/curated?per_page=16&page=1`, {
    headers: {
      Authorization: apiKey
    }
  })


  const data = await res.json()

  displayPhotos(data.photos)

}

function displayPhotos(photos) {


 

  photos.forEach(photo => {
  

    let img = document.createElement('img')
    let div = document.createElement('div')
    let a = document.createElement('a')
    a.setAttribute('href', photo.src.original)
    a.innerHTML = 'Download'
    div.classList.add('main')
    img.src = photo.src.large
    img.setAttribute('alt', 'img')
    img.classList.add('img-responsive')
    div.appendChild(img)
    div.appendChild(a)

    imgContainer.appendChild(div)

  })

}

searchBtn.addEventListener('click', getSearchPhotos)

async function getSearchPhotos() {

  const res = await fetch(`https://api.pexels.com/v1/search?query=${input.value}+query&per_page=16&page=1`, {
    headers: {
      Authorization: apiKey
    }
  })

  const data = await res.json()

  imgContainer.innerHTML = ''

    inputsArr.push(input.value)

  input.value = ''
 

  displayPhotos(data.photos)

}

more.addEventListener('click', addMorePictures)

async function addMorePictures() {

  page++


  let inputValue = inputsArr.slice(-1)


  console.log(inputValue)

 

  const res = await fetch(`https://api.pexels.com/v1/search?query=${inputValue}+query&per_page=16&page=${page}`, {
    headers: {
      Authorization: apiKey
    }
  })

  const data = await res.json()

  console.log(data.photos)

  displayPhotos(data.photos)

}