export const pokemonLineColors = (wallpaper, frequency, rms) => {
    let lineColor;
    if (wallpaper === 5){lineColor = "rgb(" + (frequency - 50 +231) + ", " + (frequency + 50) + ", " + (frequency + 100) + ")";}
    else if (wallpaper === 4){lineColor = "rgb(" + (frequency + 50) + ", " + (frequency + 130) + ", " + (frequency + 150) + ")"}
    else if (wallpaper === 3 && rms > 1.5){lineColor = "rgb(" + (frequency / 2) + ", " + (frequency + 70) + ", " + (frequency + 200) + ")"}
    else if (wallpaper === 1){lineColor = "rgb(" + (frequency + 40) + ", " + (frequency + 130) + ", " + (frequency + 160) + ")"}
    else if (wallpaper === 3){lineColor = "rgb(" + (255) + ", " + (frequency + 50) + ", " + (frequency + 50) + ")"}
    else if (wallpaper === 2 && rms < 1.4){lineColor = "rgb(" + (255) + ", " + (frequency + 180) + ", " + (frequency / 2 + 0) + ")"}
    else {lineColor = "rgb(" + 255 + ", " + frequency + ", " + frequency + ")"}
    return lineColor
}

export const pokeballLineColors = (frequency) => {
    return {
        black: "rgb(" + 0 + ", " + 0 + ", " + 0 + ")",
        white: "rgb(" + 255 + ", " + (255 - frequency * 0.1) + ", " + (255 - frequency * 0.1) + ")",
        red: "rgb(" + 255 + ", " + (frequency * 0.5) + ", " + (frequency * 0.5)  + ")"
    }
}