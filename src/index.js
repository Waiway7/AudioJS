document.addEventListener("DOMContentLoaded", () => {
    const pokeArray = 
    // ['./images/ditto.jpg']
    ['./images/pokemon.png', './images/mudkip.jpg', './images/entei.jpg', './images/twins.jpg', './images/pan.png', './images/ditto.jpg']
    let wallpaper;
    // document.body.style.backgroundImage = `url('${pokeArray[wallpaper]}')`;
    // document.body.style.backgroundColor = "rgb(" + 73 + ", " + 63 + ", " + 79 + ")";
    document.body.style.backgroundImage = `url('${pokeArray[0]}')`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.opacity = 1
    


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
    let innerPokeR = 255;
    let innerPokeB = 255;
    let innerPokeG = 255;
    let timeout = 5000
    let dittoR = 231;
    let dittoG =  139;
    let dittoB = 231;
    let switchWall = 0;
    
    // const fadeEffect = setInterval( () => {
       
    //     if (!document.body.style.opacity) {
    //          document.body.style.opacity = 1;
    //     }
    //     if ( document.body.style.opacity > 0) {
    //          document.body.style.opacity -= 0.1;
    //     } else {
    //         clearInterval(fadeEffect);
    //     }
    // }, 200);

    // const fadeIn = setInterval( () => {
    //     if (!wall.style.opacity)
    // })

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

            let lineColor = "rgb(" + 255 + ", " + frequency + ", " + frequency + ")";
            if (wallpaper === 5){lineColor = "rgb(" + (frequency - 50 +231) + ", " + (frequency + 50) + ", " + (frequency + 100) + ")";}
            else if (wallpaper === 4){lineColor = "rgb(" + (frequency + 50) + ", " + (frequency + 130) + ", " + (frequency + 150) + ")"}
            else if (wallpaper === 3 && rms > 1.5){lineColor = "rgb(" + (frequency / 2) + ", " + (frequency + 70) + ", " + (frequency + 200) + ")"}
            else if (wallpaper === 1){lineColor = "rgb(" + (frequency + 40) + ", " + (frequency + 130) + ", " + (frequency + 160) + ")"}
            else if (wallpaper === 3){lineColor = "rgb(" + (255) + ", " + (frequency + 50) + ", " + (frequency + 50) + ")"}
            else if (wallpaper === 2 && rms < 1.4){lineColor = "rgb(" + (255) + ", " + (frequency + 180) + ", " + (frequency / 2 + 0) + ")"}
            // else {lineColor = "rgb(" + 255 + ", " + frequency + ", " + frequency + ")";
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
            innerPokeR = 255;
            innerPokeB = 0;
            innerPokeG = 0;
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
            a = 30
            innerPokeR = 255;
            innerPokeB = 255;
            innerPokeG = 255;
        }

        // ctx.beginPath();
        // lineColor = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
        // ctx.lineWidth = 8 + 2;
        // ctx.moveTo()


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
            // const ang = rads * (i);
            let x = centerX + (rms * Math.cos(angle) * (radius));
            let y = centerY + (rms * Math.sin(angle) * (radius));
            let xEnd = centerX + ( Math.cos(angle ) * (radius + barHeight) );
            let yEnd = centerY + ( Math.sin(angle ) * (radius + barHeight) );
            // let lineColor = "rgb(" + 80 + ", " + frequency + ", " + 200 + ")";

            const barWidth = 8;
            drawBar(x, y, xEnd, yEnd, barWidth, frequency)

            const outerX = centerX + (rms * Math.cos(angle) * (radius * 0.95));
            const outerY = centerY + (rms * Math.sin(angle) * (radius * 0.95));

            const outerXEnd = centerX + (rms * Math.cos(angle) * (radius));
            const outerYEnd = centerY + (rms * Math.sin(angle) * (radius));
            // ctx.strokeStyle = "rgb(" + 255 + ", " + 100 + ", " + 50 + ")";
            ctx.beginPath();
            let lineColor = "rgb(" + 0 + ", " + 0 + ", " + 0 + ")";
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
            lineColor = "rgb(" + 255 + ", " + (255 - frequency * 0.1) + ", " + (255 - frequency * 0.1) + ")";
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
            lineColor = "rgb(" + 255 + ", " + (frequency * 0.5) + ", " + (frequency * 0.5)  + ")";
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = barWidth + 2;
            ctx.moveTo(pokeX, pokeY)
            ctx.lineTo(pokeXEnd, pokeYEnd);
            ctx.stroke();
            ctx.closePath()

            const innerPokeLineX = centerX + (rms * Math.cos(angle) * (radius * 0.4));
            const innerPokeLineY = centerY + (rms * Math.sin(angle) * (radius * 0.4));

            const innerPokeLineXEnd = centerX + (rms * Math.cos(angle) * (radius * 0.37));
            const innerPokeLineYEnd = centerY + (rms * Math.sin(angle) * (radius * 0.37));

            ctx.beginPath();
            // lineColor = "rgb(" + 255 + ", " + 100  + ", " + a + ")";
            lineColor = "rgb(" + 0 + ", " + 0 + ", " + 0 + ")";
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = barWidth + 2;
            ctx.moveTo(innerPokeLineX, innerPokeLineY)
            ctx.lineTo(innerPokeLineXEnd, innerPokeLineYEnd);
            ctx.stroke();
            ctx.closePath()

            const outlineCapsuleX = centerX + (rms * Math.cos(angle) * (radius * 0.2));
            const outlineCapsuleY = centerY + (rms * Math.sin(angle) * (radius * 0.2));

            const outlineCapsuleXEnd = centerX + (rms * Math.cos(angle) * (radius * 0.19));
            const outlineCapsuleYEnd = centerY + (rms * Math.sin(angle) * (radius * 0.19));

            ctx.beginPath();
            // lineColor = "rgb(" + 255 + ", " + 100  + ", " + a + ")";
            lineColor = "rgb(" + 0 + ", " + 0 + ", " + 0 + ")";
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 10;
            ctx.moveTo(outlineCapsuleX, outlineCapsuleY)
            ctx.lineTo(outlineCapsuleXEnd, outlineCapsuleYEnd);
            ctx.stroke();
            ctx.closePath()

            const fillInnerCapsuleX = centerX + (rms * Math.cos(angle) );
            const fillInnerCapsuleY = centerY + (rms * Math.sin(angle) );

            const fillInnerCapsuleXEnd = centerX + (rms * Math.cos(angle) * (radius * 0.195));
            const fillInnerCapsuleYEnd = centerY + (rms * Math.sin(angle) * (radius * 0.195));

            ctx.beginPath();
            // lineColor = "rgb(" + 255 + ", " + 100  + ", " + a + ")";
            lineColor = "rgb(" + innerPokeR + ", " + (innerPokeB + 100) + ", " + (innerPokeB + 100) + ")";
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 10;
            ctx.moveTo(fillInnerCapsuleX, fillInnerCapsuleY)
            ctx.lineTo(fillInnerCapsuleXEnd, fillInnerCapsuleYEnd);
            ctx.stroke();
            ctx.closePath()

            const fillBottomMiddleCapsuleX = centerX + (rms * Math.cos(angle / 2) * (radius * 0.37) );
            const fillBottomMiddleCapsuleY = centerY + (rms * Math.sin(angle / 2) * (radius * 0.37) );

            const fillBottomMiddleCapsuleXEnd = centerX + (rms * Math.cos(angle / 2) * (radius * 0.21));
            const fillBottomMiddleCapsuleYEnd = centerY + (rms * Math.sin(angle / 2) * (radius * 0.21));

            ctx.beginPath();
            // lineColor = "rgb(" + 255 + ", " + 100  + ", " + a + ")";
            lineColor = "rgb(" + 255 + ", " + (255 - frequency * 0.1) + ", " + (255 - frequency * 0.1) + ")";
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 10;
            ctx.moveTo(fillBottomMiddleCapsuleX, fillBottomMiddleCapsuleY)
            ctx.lineTo(fillBottomMiddleCapsuleXEnd, fillBottomMiddleCapsuleYEnd);
            ctx.stroke();
            ctx.closePath()

            const fillUpperMiddleCapsuleX = centerX + -(rms * Math.cos(angle / 2) * (radius * 0.37) );
            const fillUpperMiddleCapsuleY = centerY + -(rms * Math.sin(angle / 2) * (radius * 0.37) );

            const fillUpperMiddleCapsuleXEnd = centerX + -(rms * Math.cos(angle / 2) * (radius * 0.21));
            const fillUpperMiddleCapsuleYEnd = centerY + -(rms * Math.sin(angle / 2) * (radius * 0.21));

            ctx.beginPath();
            // lineColor = "rgb(" + 255 + ", " + 100  + ", " + a + ")";
            lineColor = "rgb(" + 255 + ", " + (255 - frequency * 0.1) + ", " + (255 - frequency * 0.1) + ")";
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 10;
            ctx.moveTo(fillUpperMiddleCapsuleX, fillUpperMiddleCapsuleY)
            ctx.lineTo(fillUpperMiddleCapsuleXEnd, fillUpperMiddleCapsuleYEnd);
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
    if (audioCtx.state === "running"){
    animationLoop();
    } else {
        audioCtx.suspend();
    }
})