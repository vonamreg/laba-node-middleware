import _ from "lodash"
import fs from "fs"

const models = ["Model A", "Model B", "Model Y", "Model X", "Model XXL", "Model Grace", "Model XYZ", "Model Palada", "Model Titan"]
const colors = ["whitesmoke", "space", "black", "red", "yellow", "lime", "grey", "gold"]
const images = [
    "https://adsboard-static.spectrumdata.tech/files/blogs_content/fe2a89919d8aa9a/v7f79c8.jpg",
    "https://rr-life.ru/upload/medialibrary/6d5/2024_03_10_samie_dorogie_avto_v_mire-_13_.jpg",
    "https://adsboard-static.spectrumdata.tech/files/blog_previews/fe2a89919d8aa9a/v4d1d77.jpg",
    "https://s0.rbk.ru/v6_top_pics/resized/640xH/media/img/6/12/755809115374126.jpg",
    "https://s0.rbk.ru/v6_top_pics/resized/1080xH/media/img/9/50/755941276931509.jpg",
    "https://s0.rbk.ru/v6_top_pics/resized/1080xH/media/img/0/63/755174936982630.jpg",
    "http://cdn.motorpage.ru/Photos/800/001AB.jpg",
    "https://primamediamts.servicecdn.ru/f/big/4257/4256549.jpg"
]

async function getRandomCar() {
    let letters = ''
    for (let i = 0; i < 3; i++){
        letters += String.fromCharCode(Math.floor(Math.random() * 25 + 97))
    }
    let arr = letters.split('')
    arr.splice(2, 0, Math.floor(Math.random() * 999 ))

    let car = {
        carModel: _.sample(models),
        color: _.sample(colors),
        number: arr.join(''),
        image: ''
    }

    const res = await fetch(_.sample(images))
    const buffer = await res.arrayBuffer()

    fs.writeFile(`${process.cwd()}\\upload\\${car.carModel}.jpg`, new Uint8Array(buffer), () => undefined)
    car.image = `/upload/${car.carModel}.jpg`

    return car
 }

 export default getRandomCar