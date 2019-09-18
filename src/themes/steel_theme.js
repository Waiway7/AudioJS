import audioData from "../tools/audio_context";
import {circle, barLength} from "../tools/math"
import drawBar from "../tools/draw_line"

export const steelBackground = () => {
    document.body.style.backgroundColor = "rgb(" + 73 + ", " + 63 + ", " + 79 + ")";
}

export const steelSeries = (bars, canvas, ctx, radius, audio, barWidth) => {
    
    const {dataArray, floatArray, gain, analyser} = audioData(audio)

    let f = 0

    function animationLoop() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2; 

        analyser.getByteFrequencyData(dataArray)
        analyser.getByteTimeDomainData(floatArray)
       
        const rads = 2 * Math.PI / bars

        let total = 0;

        for (let i = 0; i < floatArray.length; i++) {
            const adjusted = (floatArray[i] * gain.gain.value);
            const square = adjusted  ** 2
            total += square;
        }
        

        let rms = total / floatArray.length
        rms = Math.sqrt(rms) / (radius * gain.gain.value) 

        if (rms > 1.45) {
            f = 0
        } else {
            f += 0.05
        }

        for (let i = 0; i < bars; i++) {
            
            let frequency = dataArray[i] * 0.5
            const barHeight = barLength(dataArray, i, bars, gain)
            const angle = rads * (i + f);
            const {x, y, xEnd, yEnd} = circle(centerX, centerY, rms, angle, radius, barHeight)
            const lineColor = "rgb(" + 255 + ", " + 100 + ", " + frequency + ")";
            drawBar(x, y, xEnd, yEnd, barWidth, lineColor, ctx)

    }
        window.requestAnimationFrame(animationLoop);
    }
    
    audio.play()
    animationLoop();
}