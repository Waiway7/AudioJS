export default (audio) => {

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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

    return {
        analyser,
        bufferLength,
        dataArray,
        floatArray,
        gain
    }
}
