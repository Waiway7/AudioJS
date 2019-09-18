export const circle = (centerX, centerY, rms, angle, radius,  barHeight) => {
    const x = centerX + (rms * Math.cos(angle) * (radius));
    const y = centerY + (rms * Math.sin(angle) * (radius));

    const xEnd = centerX + ( rms * Math.cos(angle) * (radius + barHeight));
    const yEnd = centerY + (rms * Math.sin(angle) * (radius + barHeight));

    return {
        x,
        y,
        xEnd,
        yEnd
    }
}

export const barLength = (dataArray, i, bars, gain) => {
    let barHeight;
    if (i <= (bars * 0.25)) {
        barHeight = (dataArray[i])  * gain.gain.value * 1.0
    }
    else if (i > (bars * 0.25) && i <= (bars * 0.5)) {
        barHeight = (dataArray[i]) * gain.gain.value * 0.8
    } 
    else if (i > (bars * 0.5) && i <= 150){
        barHeight = (dataArray[i]) * gain.gain.value * 0.6
    }    
    else {
        barHeight = (dataArray[i]) * gain.gain.value * 0.4
    }
    return barHeight
}

export const pokeball = (centerX, centerY, rms, angle, radius, dimOne, dimTwo) => {
    const x = centerX + (rms * Math.cos(angle) * (radius * dimOne));
    const y = centerY + (rms * Math.sin(angle) * (radius * dimOne));

    const xEnd = centerX + ( rms * Math.cos(angle) * (radius * dimTwo));
    const yEnd = centerY + ( rms * Math.sin(angle) * (radius * dimTwo));

    return {
        x,
        y,
        xEnd,
        yEnd
    }
}