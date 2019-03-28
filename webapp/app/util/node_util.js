import $ from 'jquery'

const body = $('body');
const document = $('document');
const window = $('window');


const mount = (node, jDom) => {
    const render_node = node.render_();

    if(jDom) {
        jDom.html(render_node)
        node.mounted = true;
    }

};

const add_animate = (element, animationName, callback) => {
    $(element).addClass('animated');
    $(element).addClass(animationName);

    function handleAnimationEnd() {
        $(element).removeClass(['animated', animationName]);
        $(element).off('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback()
    }

    $(element).on('animationend', handleAnimationEnd)
};

const LetterAvatar =  (name, size) => {
    name  = name || '';
    size  = size || 60;
    const colours = [
            "#A93226", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
            "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
        ];
    const nameSplit = String(name).toUpperCase().split(' ');
    let initials, charIndex, colourIndex, canvas, context, dataURI;

    if (nameSplit.length == 1) {
        initials = nameSplit[0] ? nameSplit[0].charAt(0):'?';
    } else {
        initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }
    if (window.devicePixelRatio) {
        size = (size * window.devicePixelRatio);
    }
    charIndex     = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
    colourIndex   = charIndex % 20;
    canvas        = $('<canvas/>').get(0);
    canvas.width  = size;
    canvas.height = size;
    context       = canvas.getContext("2d");
    context.fillStyle = colours[colourIndex];
    context.fillRect (0, 0, canvas.width, canvas.height);
    context.font = Math.round(canvas.width/2)+"px Arial";
    context.textAlign = "center";
    context.fillStyle = "#FFF";
    context.fillText(initials, size / 2, size / 1.5);
    dataURI = canvas.toDataURL();
    canvas  = null;
    return dataURI;
}

export {mount, add_animate, LetterAvatar}