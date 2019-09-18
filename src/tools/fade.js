

export const fadeOut = (element, callback = {}) => {
    let opa = 1;
    const timer = setInterval(() => {
        if (opa <= 0){
            clearInterval(timer);
            element.style.visibility = "hidden";
            if (callback !== Object.keys(callback).length > 0){
            setTimeout(callback, 100)}
        }
        element.style.opacity = opa;
        opa -= 0.05
    }, 100)
}

export const fadeIn = (element) => {
    let opa = 0;
    const timer = setInterval(() => {
        if (opa >= 1){
            clearInterval(timer);
            // element.style.display = "hidden";
        }
        element.style.opacity = opa;
        opa += 0.01
    }, 50)
}