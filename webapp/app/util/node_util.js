import $ from 'jquery'

const body = $('body');
const document = $('document');
const window = $('window');


const mount = (node, parent, replace = true) => {
    const hasEvent = node.render_event != null;

    if(hasEvent && node.render_event["before"]) {
        node.render_event["before"]()
    }
    if (parent!=null) {
        replace? $(parent).html(node):$(parent).append(node)
    } else {
        replace? body.html(node):body.append(node)
    }
    if(hasEvent && node.render_event["rendered"]) {
        node.render_event["rendered"]()
    }

}

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