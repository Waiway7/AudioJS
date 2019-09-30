# [PokeBoom Audio Visualizer](https://waiway7.github.io/AudioJS/)

![image](https://github.com/Waiway7/AudioJS/blob/master/images/Screen%20Shot%202019-09-29%20at%201.25.19%20PM.png)

![image](https://user-images.githubusercontent.com/49809862/62941202-7e6e7d80-bda3-11e9-8aa4-adf1e725b67a.png)

# PokeBoom
A visualizer that uses the data from Web Audio API to render a circle visualizer with a pokemon theme inspired by an App Academy pokedex project. Web Audio API generates an array of numbers which represents the frequency of the music at that time and by using those numbers another formula is used to draw the visualizer on to the canvas. 

![image](https://github.com/Waiway7/AudioJS/blob/master/images/Screen%20Shot%202019-09-29%20at%201.29.32%20PM.png)

The hardest challenge was creating the visualizer in a circular shape. After some time, I was able to find the geometric formula to create an arc of a circle that would draw the bar from (x, y) to (xEnd, yEnd) and by setting this function in a loop, it will draw x amount of bars to shape a circle. 

'''
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
'''

# Future Implementation
Customize options for user to change theme and songs 
Implementation of different types of visualizer with D3

