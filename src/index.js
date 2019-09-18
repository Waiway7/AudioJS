import {pokeWall, pokeTheme} from "./themes/poke";
import {steelBackground, steelSeries} from "./themes/steel_theme";
import {fadeOut, fadeIn} from "./tools/fade"

document.addEventListener("DOMContentLoaded", () => {
    pokeWall();
    steelBackground()
    const canvas = document.getElementById("visualizer");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bars = 200;
    const barWidth = 8;

    const audio = document.createElement("audio");
    audio.src = "audio/eightbitpoke.mp3"

    const radius = 100;
    canvas.setAttribute("status", "pause")
    const pause = () => canvas.setAttribute("status", "pause")
    const play = () => canvas.setAttribute("status", "play")
    const attr = canvas.getAttribute("status")
    const divs = document.getElementsByTagName("div")
    const p = document.getElementsByTagName("p")
    const i = document.getElementsByTagName("i")
    const a = document.getElementsByTagName("a")

    divs[0].style.display = "flex"
    // divs[1].style.position = "absolute"
    divs[2].style.position = "absolute"
    divs[2].style.display = "block"
    divs[2].style.marginLeft = "40px"

    divs[3].style.display = "flex"
    divs[3].style.marginTop = "50px";

    divs[4].style.display = "flex"
    divs[4].style.marginTop = "30px";

    a[0].style.textDecoration = "none"
    a[0].style.color = "black"
    a[1].style.textDecoration = "none"
    a[1].style.color = "black"
    a[2].style.textDecoration = "none"
    a[2].style.color = "black"
    a[3].style.textDecoration = "none"
    a[3].style.color = "black"

    const pika = document.getElementById("pika");
    const text = p[0]
    const angel = i[0]
    const linkedin = i[1]
    const cloud = i[2]
    const github = i[3]

    const eightBitPokeball = document.getElementsByTagName('img')[1]
    const eightBitPikachu = document.getElementsByTagName('img')[0]
    eightBitPikachu.style.position = "absolute"
    eightBitPikachu.style.left = "40%";
    eightBitPikachu.style.height = "500px";

    eightBitPokeball.style.position = "absolute"
    eightBitPokeball.style.left = "38%";
    eightBitPokeball.style.top = "220px";
    eightBitPokeball.style.height = "300px";
    eightBitPokeball.style.width = "300px";

    // angel.style.position = "absolute"
    text.style.position = "absolute"
    text.style.fontFamily = "Cute Font, cursive"
    text.style.top = "60%"
    text.style.left = "5%"
    text.style.fontSize = "100px"

    angel.style.marginLeft = "30px";
    angel.style.cursor = "pointer"

    linkedin.style.marginLeft = "42px";
    linkedin.style.cursor = "pointer"

    cloud.style.cursor = "pointer"
    cloud.style.marginLeft = "23px";

    github.style.cursor = "pointer"
    github.style.marginLeft = "30px";



    
    let theme = () => pokeTheme(bars, canvas, ctx, radius, audio, barWidth);
    eightBitPokeball.addEventListener("click", () => {
        play();
        pika.play();
        fadeOut(text)
        fadeOut(eightBitPikachu,  theme)
        fadeOut(eightBitPokeball,  theme)
    })
    
})