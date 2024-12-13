export const toggleClass = (targetClass: string, activeClass: string) => {
    const element = document.querySelector(`.${targetClass}`);
    
    if (element) {
        element.classList.toggle(activeClass); // Toggles the class on or off
    }
};


export const toggleClassOnMultiple = (targetClasses: string[], activeClass: string) => {
    targetClasses.forEach(targetClass => {
        const elements = document.querySelectorAll(`.${targetClass}`);
        
        // Loop through all elements matching the current targetClass
        elements.forEach(element => {
            element.classList.toggle(activeClass); // Toggle the class on or off
        });
    });
};
