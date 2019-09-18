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
    divs[0].style.display = "flex"
    divs[1].style.positon = "absolute"

    const pika = document.getElementById("pika");
    const text = p[0]
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

    text.style.position = "absolute"
    text.style.fontFamily = "Cute Font, cursive"
    text.style.top = "60%"
    text.style.left = "5%"
    text.style.fontSize = "100px"
    
    let theme = () => pokeTheme(bars, canvas, ctx, radius, audio, barWidth);
    eightBitPokeball.addEventListener("click", () => {
        play();
        pika.play();
        fadeOut(text)
        fadeOut(eightBitPikachu,  theme)
        fadeOut(eightBitPokeball,  theme)
    })
    
})