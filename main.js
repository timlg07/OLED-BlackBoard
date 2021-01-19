let canvasMgr = {};

function init() {
    const container = document.getElementById("main");
    canvasMgr.canvas = document.createElement("canvas");
    canvasMgr.canvas.width = screen.width;
    canvasMgr.canvas.height = screen.height;
    container.appendChild(canvasMgr.canvas);
    
    canvasMgr.ctx = canvasMgr.canvas.getContext('2d');
    canvasMgr.ctx.fillStyle = '#000000';
    canvasMgr.ctx.fillRect(0, 0, canvasMgr.canvas.width, canvasMgr.canvas.height);
    
    // last known position:
    canvasMgr.pos = { x: 0, y: 0 };
    
    document.addEventListener('mousemove' , draw);
    document.addEventListener('touchmove' , draw);
    document.addEventListener('mousedown' , setPosition);
    document.addEventListener('mouseenter', setPosition);
    document.addEventListener('touchstart', setPosition);
    document.addEventListener('touchend'  , setPosition);
}

function openCanvas() {
    if (!canvasMgr.canvas) {
        init();
    }
    
    toggleFullscreen(canvasMgr.canvas);
}

function draw(evt) {
    if (
        // Ignore mouse when the left button is not pressed:
        evt.buttons !== undefined && evt.buttons !== 1
        // Diable drawing when not in fullscreen:
        || !isFullscreen()
    ) {
        return;
    }

    canvasMgr.ctx.beginPath();

    canvasMgr.ctx.lineWidth = 5;
    canvasMgr.ctx.lineCap = 'round';
    canvasMgr.ctx.strokeStyle = '#e0e0e0';
    
    canvasMgr.ctx.moveTo(canvasMgr.pos.x, canvasMgr.pos.y); // from
    setPosition(evt);
    canvasMgr.ctx.lineTo(canvasMgr.pos.x, canvasMgr.pos.y); // to

    canvasMgr.ctx.stroke();
}

function setPosition(evt) {
    let p = evt.touches && evt.touches.length ? evt.touches[0] : evt;
    canvasMgr.pos.x = p.clientX;
    canvasMgr.pos.y = p.clientY;
}

function toggleFullscreen(element) {    
    if (isFullscreen()) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }        
    } else {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}

function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("start").addEventListener("click", openCanvas);
});