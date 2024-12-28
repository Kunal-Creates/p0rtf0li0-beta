document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    function updateCursor() {
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;
        
        cursorX += diffX * 0.1;
        cursorY += diffY * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(updateCursor);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    updateCursor();
    
    // Fade-in animation
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Detect hover on specific elements
    document.querySelectorAll('button, a, .hoverable').forEach((element) => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering'); // Add light blue class
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering'); // Remove light blue class
        });
    });

    // Track cursor movement for background color change
    document.addEventListener('mousemove', (event) => {
        // Get the element under the cursor
        const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);
        
        // Check the background color of the element
        const backgroundColor = window.getComputedStyle(elementUnderCursor).backgroundColor;

        // If the background is black, change cursor to white, else revert to black
        if (isBlack(backgroundColor)) {
            cursor.style.backgroundColor = 'white';
        } else {
            cursor.style.backgroundColor = 'black';
        }
    });
});

// Function to check if the background color is black or close to black
function isBlack(color) {
    const rgb = color.match(/^rgb\((\d+), (\d+), (\d+)\)$/);
    if (rgb) {
        const r = parseInt(rgb[1]);
        const g = parseInt(rgb[2]);
        const b = parseInt(rgb[3]);

        return r < 50 && g < 50 && b < 50;
    }
    return false;
}
