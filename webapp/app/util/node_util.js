import $ from 'jquery'

const body = $('body');
const document = $('document');
const window = $('window');


const mount = (node, id) => {
    const render_node = node.render_();

    // if(id) {
    $(id).html(render_node)
    // }

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
}

export {mount, add_animate}