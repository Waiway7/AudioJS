export default (x, y, xEnd, yEnd, barWidth, lineColor, ctx) => 
{
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = barWidth;
    ctx.beginPath();
    ctx.moveTo(x, y)
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke()
    ctx.closePath();
}

 // const fadeEffect = () => setInterval( () => {
       
    //     if (!canvas.style.opacity) {
    //          canvas.style.opacity = 1;
    //     }
    //     if ( canvas.style.opacity > 0) {
    //          canvas.style.opacity -= 0.1;
    //     } else {
    //         clearInterval(fadeEffect);
    //     }
    // }, 200);