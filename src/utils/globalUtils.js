/**
 * @description function that is triggered when the source element has the targeted class name
 * @param {HTMLElement} elementSrc a html source element (for instance a target from a click event)
 * @param {String} targetClassName the targeted class name
 * @param {Function} cb the callback that has to be handled
 * @returns {*} the callback handled with the following data: isFound (if the element with the targeted class is found) and the element found
 */
function triggerWhenElementFound(elementSrc, targetClassName, cb) {
    if(elementSrc.classList.contains(targetClassName))
        return cb(true, elementSrc);
    let parent = elementSrc.parentElement;
    while(parent && !parent.classList.contains(targetClassName))
        parent = parent.parentElement;
    if(!parent || (parent && !parent.classList.contains(targetClassName)))
        return cb(false, parent);
}

export {
    triggerWhenElementFound
}