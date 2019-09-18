import audioData from "../tools/audio_context";
import {circle, barLength, pokeball} from "../tools/math";
import {pokemonLineColors, pokeballLineColors} from "../tools/line_color"
import drawBar from "../tools/draw_line";
import {fadeIn} from "../tools/fade"

const pokeArray = 
['./images/pokewalk.png', './images/pokemon.png', './images/mudkip.jpg', './images/entei.jpg', './images/twins.jpg', './images/pan.png', './images/ditto.jpg']

export const pokeWall = () => {
    
    document.body.style.backgroundImage = `url('${pokeArray[0]}')`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.opacity = 1
    }   

export const pokeTheme = (bars, canvas, ctx, radius, audio, barWidth) => {

    const {dataArray, floatArray, gain, analyser} = audioData(audio)
    let f = 0;
    let switchWall = 0;
    let wallpaper;

    function animationLoop() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY= canvas.height / 2;

        analyser.getByteFrequencyData(dataArray)
        analyser.getByteTimeDomainData(floatArray)
       
        const rads = (2) * Math.PI / bars
        ctx.moveTo(0, 0);

        let total = 0;
        for (let i = 0; i < floatArray.length; i++) {
            const adjusted = (floatArray[i] * gain.gain.value);
            const square = adjusted  ** 2
            total += square;
        }
        let rms = total / floatArray.length
        rms = Math.sqrt(rms) / (radius * gain.gain.value) 
        if (rms > 1.45) {
            if ( switchWall === 0) {
                wallpaper = Math.floor((Math.random() * pokeArray.length))
                document.body.style.backgroundImage = `url('${pokeArray[wallpaper]}')`;
            }
            switchWall += 0.2;
            if (switchWall > 10) {
                switchWall = 0;
            }
        } 
        else {
            f += 0.05
        }

        for (let i = 0; i < bars; i++) {
            
            const frequency = dataArray[i] * 0.5
            const barHeight = barLength(dataArray, i, bars, gain)
            const angle = rads * (i + f);
            const halfAngle = angle / 2;

            const barLineColor = pokemonLineColors(wallpaper, frequency, rms);
            const {black} = pokeballLineColors(frequency);
            const {white} = pokeballLineColors(frequency);
            const {red} = pokeballLineColors(frequency);

            const {x, y, xEnd, yEnd} = circle(centerX, centerY, rms, angle, radius, barHeight)
            const outerCircle = pokeball(centerX, centerY, rms, angle, radius, 0.975, 1)
            const bottomOuterFillCircle = pokeball(centerX, centerY, rms, halfAngle, radius, 0.4, 0.95)
            const upperOuterFillCircle = pokeball(centerX, centerY, rms, halfAngle, -radius, 0.4, 0.95)
            const innerOutlineCircle = pokeball(centerX, centerY, rms, angle, radius, 0.4, 0.37)
            const innerInnerOutlineCircle = pokeball(centerX, centerY, rms, angle, radius, 0.2, 0.19)
            const innerUpperFillCircle = pokeball(centerX, centerY, rms, halfAngle, -radius, 0.21, 0.37)
            const innerBottomFillCircle = pokeball(centerX, centerY, rms, halfAngle, radius, 0.21, 0.37)
            const innerInnerFillCircle = pokeball(centerX, centerY, rms, angle, radius, 0.19, 0)

            drawBar(x, y, xEnd, yEnd, barWidth, barLineColor, ctx)
            drawBar(outerCircle.x, outerCircle.y, outerCircle.xEnd, outerCircle.yEnd, barWidth, black, ctx) 
            drawBar(bottomOuterFillCircle.x, bottomOuterFillCircle.y, bottomOuterFillCircle.xEnd, bottomOuterFillCircle.yEnd, barWidth, white, ctx) 
            drawBar(upperOuterFillCircle.x, upperOuterFillCircle.y, upperOuterFillCircle.xEnd, upperOuterFillCircle.yEnd, barWidth, red, ctx) 
            drawBar(innerOutlineCircle.x, innerOutlineCircle.y, innerOutlineCircle.xEnd, innerOutlineCircle.yEnd, barWidth, black, ctx) 
            drawBar(innerInnerFillCircle.x, innerInnerFillCircle.y, innerInnerFillCircle.xEnd, innerInnerFillCircle.yEnd, barWidth, rms > 1.45 ? red : white, ctx) 
            drawBar(innerInnerOutlineCircle.x, innerInnerOutlineCircle.y, innerInnerOutlineCircle.xEnd, innerInnerOutlineCircle.yEnd, barWidth, black, ctx) 
            drawBar(innerUpperFillCircle.x, innerUpperFillCircle.y, innerUpperFillCircle.xEnd, innerUpperFillCircle.yEnd, barWidth, white, ctx) 
            drawBar(innerBottomFillCircle.x, innerBottomFillCircle.y, innerBottomFillCircle.xEnd, innerBottomFillCircle.yEnd, barWidth, white, ctx) 

    }
        window.requestAnimationFrame(animationLoop);
        audio.play()
    }    
    
    animationLoop();
} 
