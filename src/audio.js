import { defaultCipherList } from "constants";



document.addEventListener("DOMContentLoaded", () => {
    document.body.style.backgroundColor = "rgb(" + 73 + ", " + 63 + ", " + 79 + ")";
    // document.body.style.backgroundImage = "url('https://cdn.wallpapersafari.com/4/38/mOfcQ2.png')";

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const audio = document.querySelector('audio');
    const source = audioCtx.createMediaElementSource(audio);
    
    const analyser = audioCtx.createAnalyser();
    const gain = audioCtx.createGain();
    source.connect(gain)
    source.connect(analyser);
    gain.gain.value = 0.7;
    gain.connect(audioCtx.destination)
    const fftSize = analyser.fftSize
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const floatArray = new Uint8Array(bufferLength)
    // const dbArray = new Unit
    
    const canvas = document.getElementById("visualizer");
    document.getElementById("visualizer").blur();
    const ctx = canvas.getContext("2d");
    const bars = 200;

    let f = 0
    let h = 0
    let a = 30;
    function animationLoop() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const centerX = canvas.width / 2;
        const centerY= canvas.height / 2;
        const radius = 100;

        analyser.getByteFrequencyData(dataArray)
        analyser.getByteTimeDomainData(floatArray)
       
        const rads = (2) * Math.PI / bars
        ctx.moveTo(0, 0);

        function drawBar(x, y, xEnd, yEnd, barWidth, frequency){


            // ctx.strokeStyle = lineColor;
            // ctx.lineWidth = width;
            // ctx.beginPath();
            // // ctx.strokeRect(x1, y1, x2, y2)

            // ctx.moveTo(x1, y1);
            // ctx.lineTo(x2, y2);
            // ctx.stroke()
            const lineColor = "rgb(" + 255 + ", " + 100 + ", " + frequency + ")";
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = barWidth;
            ctx.beginPath();
            ctx.moveTo(x, y)
            ctx.lineTo(xEnd, yEnd);
            ctx.stroke()
            ctx.closePath();
        }
        let total = 0;
        for (let i = 0; i < floatArray.length; i++) {
            const adjusted = (floatArray[i] * gain.gain.value);
            const square = adjusted  ** 2
            total += square;
        }
        let rms = total / floatArray.length
        rms = Math.sqrt(rms) / (radius * gain.gain.value) 
        if (rms > 1.45) {
            a = 100
        } else {
            f += 0.05
            a = 30
        }

        function drawCircle() {
            // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
     
            // color in the background
             ctx.fillStyle = "#EEEEEE";

             // draw the circle
             ctx.beginPath();

             var radius = 175;
             ctx.arc(100, 100, 100, 0, Math.PI * 2);
            ctx.stroke();
             // color in the circle
            
            }

        for (let i = 0; i < bars; i++) {
            
            // let barHeight = (dataArray[i]) * gain.gain.value
            // if (dataArray[i] > 170 && dataArray[i] < 180){
            //     barHeight = dataArray[i] * gain.gain.value * 2
            // }
            
            let frequency = dataArray[i] * 0.5

            let barHeight;

           if (i <= (bars * 0.25)) {
                barHeight = (dataArray[i])  * gain.gain.value * 1.5
           }
           else if (i > (bars * 0.25) && i <= (bars * 0.5)) {
                barHeight = (dataArray[i]) * gain.gain.value * 1.2
           } 
           else if (i > (bars * 0.5) && i <= 150){
                barHeight = (dataArray[i]) * gain.gain.value * 0.9
        }    
            else {
                barHeight = (dataArray[i]) * gain.gain.value * 0.6
           }

        

            let angle = rads * (i + h - f);
            let x = centerX + (rms * Math.cos(angle) * (radius));
            let y = centerY + (rms * Math.sin(angle) * (radius));
            let xEnd = centerX + ( Math.cos(angle ) * (radius + barHeight) );
            let yEnd = centerY + ( Math.sin(angle ) * (radius + barHeight) );
            // let lineColor = "rgb(" + 80 + ", " + frequency + ", " + 200 + ")";

            const barWidth = 8;

            const outerX = centerX + (rms * Math.cos(angle) * (radius * 0.95));
            const outerY = centerY + (rms * Math.sin(angle) * (radius * 0.95));

            const outerXEnd = centerX + (rms * Math.cos(angle) * (radius));
            const outerYEnd = centerY + (rms * Math.sin(angle) * (radius));
            // ctx.strokeStyle = "rgb(" + 255 + ", " + 100 + ", " + 50 + ")";
            ctx.beginPath();
            let lineColor = "rgb(" + 255 + ", " + 100 + ", " + a + ")";
            ctx.lineWidth = barWidth + 2;
            ctx.strokeStyle = lineColor;
            ctx.moveTo(outerX, outerY)
            ctx.lineTo(outerXEnd, outerYEnd);
            ctx.stroke();
            ctx.closePath()

            // const innerX = centerX + (rms * Math.cos(angle) * (radius * 0.4));
            // const innerY = centerY + (rms * Math.sin(angle) * (radius * 0.4));

            // const innerXEnd = centerX + (rms * Math.cos(angle) * (radius * 0.35));
            // const innerYEnd = centerY + (rms * Math.sin(angle) * (radius * 0.35));

            const innerX = centerX + (rms * Math.cos(angle / 2) * (radius * 0.4));
            const innerY = centerY + (rms * Math.sin(angle / 2) * (radius * 0.4));

            const innerXEnd = centerX + (rms * Math.cos(angle / 2) * (radius * 0.95));
            const innerYEnd = centerY + (rms * Math.sin(angle / 2) * (radius * 0.95));

            ctx.beginPath();
            // lineColor = "rgb(" + 255 + ", " + 100  + ", " + a + ")";
            lineColor = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = barWidth + 2;
            ctx.moveTo(innerX, innerY)
            ctx.lineTo(innerXEnd, innerYEnd);
            ctx.stroke();
            ctx.closePath()

            const pokeX = centerX + (rms * -Math.cos(angle / 2) * (radius * 0.4));
            const pokeY = centerY + (rms * -Math.sin(angle / 2) * (radius * 0.4));

            const pokeXEnd = centerX + (rms * -Math.cos(angle / 2) * (radius * 0.95));
            const pokeYEnd = centerY + (rms * -Math.sin(angle / 2) * (radius * 0.95));

            ctx.beginPath();
            // lineColor = "rgb(" + 255 + ", " + 100  + ", " + a + ")";
            lineColor = "rgb(" + 255 + ", " + 0 + ", " + 0 + ")";
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = barWidth + 2;
            ctx.moveTo(pokeX, pokeY)
            ctx.lineTo(pokeXEnd, pokeYEnd);
            ctx.stroke();
            ctx.closePath()

            // ctx.beginPath();
            // // lineColor = "rgb(" + 255 + ", " + 100  + ", " + a + ")";
            // lineColor = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
            // ctx.strokeStyle = lineColor;
            // ctx.lineWidth = barWidth + 2;
            // ctx.moveTo(-innerX, -innerY)
            // ctx.lineTo(-innerXEnd, innerYEnd);
            // ctx.stroke();
            // ctx.closePath()

            drawBar(x, y, xEnd, yEnd, barWidth, frequency)

            
           


            // x = centerX + (rms * Math.cos(angle) * (radius - 50));
            // y = centerY + (rms * Math.sin(angle) * (radius - 50));
            // ctx.beginPath();
            // ctx.strokeStyle = "rgb(" + 128 + ", " + 128 + ", " + 128 + ")"
            // ctx.moveTo(centerX, centerY)
            // ctx.lineTo(x, y);
            // ctx.stroke()  
            
            // drawBar(x, y, xEnd, yEnd, barWidth, lineColor)
            // drawBar(canvas.width, canvas.height, xEnd, yEnd, barWidth, lineColor)

    }
        window.requestAnimationFrame(animationLoop);
    }
    


    audio.play();

    animationLoop();
})