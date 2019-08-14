document.body.style.backgroundColor = "rgb(" + 73 + ", " + 63 + ", " + 79 + ")";

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const audio = document.querySelector('audio');
    const source = audioCtx.createMediaElementSource(audio);
    
    const analyser = audioCtx.createAnalyser();
    const gain = audioCtx.createGain();
    source.connect(gain)
    source.connect(analyser);
    gain.gain.value = 0.3;
    gain.connect(audioCtx.destination)
    const fftSize = analyser.fftSize
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const floatArray = new Float32Array(analyser.frequencyBinCount)
    // const dbArray = new Unit
    const canvas = document.getElementById("visualizer");
    document.getElementById("visualizer").blur();
    const ctx = canvas.getContext("2d");
    let j = 0;
    let f = 0
    
    function animationLoop() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const centerX = canvas.width / 2;
        const centerY= canvas.height / 2;
        const radius = 100;

        analyser.getByteFrequencyData(dataArray)
        analyser.getFloatFrequencyData(floatArray)
       
        const rads = (2) * Math.PI / dataArray.length


        function drawBar(x1, y1, x2, y2, width, lineColor){


            ctx.strokeStyle = lineColor;
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke()
        }

        // j -= 1
        // f += 1
        for (let i = 0; i < (dataArray.length ); i++) {

            // let barHeight = (dataArray[i]) * gain.gain.value
            // if (dataArray[i] > 170 && dataArray[i] < 180){
            //     barHeight = dataArray[i] * gain.gain.value * 2
            // }

            let frequency = dataArray[i]

           

            let barHeight = (dataArray[i]) * gain.gain.value

            const angle = rads * (i);
            let x = centerX + Math.cos(angle) * (radius);
	        let y = centerY + Math.sin(angle) * (radius);
            let xEnd = centerX + Math.cos(angle) * (radius + barHeight);
            let yEnd = centerY + Math.sin(angle) * (radius + barHeight);
            // let lineColor = "rgb(" + 80 + ", " + frequency + ", " + 200 + ")";
            let lineColor = "rgb(" + 255 + ", " + 100 + ", " + frequency + ")";
        

            const barWidth = 2;
            
            drawBar(x, y, xEnd, yEnd, barWidth, lineColor)

    }
        window.requestAnimationFrame(animationLoop);
    }


    audio.play();

    animationLoop();