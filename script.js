// Main Variables
const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags'

let state = {}

async function getData() {
    try{
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error("Unable to fetch data!")
        }
        const data = await response.json()
        const randomIndex = Math.floor(Math.random() * data.length)
        const country = data[randomIndex]

        state = {
            country: country.name.common,
            flag: country.flags.png
        }
        document.querySelector('#flag_img').innerHTML = `<img src="${state.flag}" alt="Flag">`
    }
    catch(error) {
        console.error('Error: ', error)
    }
}
const tipp = document.querySelector('#tipp')
const pontok = document.querySelector('#pont')
const tippEredmeny = document.querySelector('#tippEredmeny')
const gameOver = document.querySelector('.gameOver')
const vegPontszam = document.querySelector('#vegPontszam')
const probakSzama = document.querySelector('#proba')
let pont = 0
let probak = 0
let KihagyasvoltE = false
function playerTry() {
    if (probak >= 24) {
        document.querySelector('#flag_img').style.display = "none"
        document.querySelector('.main_form').style.display = "none"
        document.querySelector('.pontszam').style.display = "none"
        document.body.style.background = "rgb(0 0 0 / 0.4)"
        kihagyas_gomb.style.display = "none"
        gameOver.style.display = "flex"
        if (KihagyasvoltE) {
            vegPontszam.innerHTML = pont
        } else {
            vegPontszam.innerHTML = pont + 1
        }
    }
    else {
        probakSzama.innerHTML = probak
        if (tipp.value.toLowerCase() == state.country.toLowerCase()) {
            KihagyasvoltE = false
            pont++
            probak++
            probakSzama.innerHTML = probak
            pontok.innerHTML = pont
            getData()
            tipp.value = ''
        } else {
            tippEredmeny.style.display = "block"
            tippEredmeny.innerHTML = "Helytelen válasz!"
            setTimeout(() => {
                tippEredmeny.style.display = "none"
            }, 3000)
        }
    }
}

const kihagyas_gomb = document.querySelector('#kihagyas')

kihagyas_gomb.addEventListener('click', (e) => {
    KihagyasvoltE = true
    probak++
    tipp.value = ''
    probakSzama.innerHTML = probak
    getData()
})

const startBtn = document.querySelector('#kezdes_gomb')
startBtn.addEventListener('click', (e) => {
    getData()
    tipp.value = ''
    startBtn.style.display = "none"
    document.querySelector('.main_form').style.display = "block"
    document.querySelector('.pontszam').style.display = "block"
    kihagyas_gomb.style.display = "block"
})

const form_input = document.querySelector('form')
form_input.onsubmit = (e) => {
    e.preventDefault()
    playerTry()
}
