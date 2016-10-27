let cardIdGen = (function*() {
    let id = 0;
    while(true) {
        id += 1;
        yield `card ${id}`;
    }
})();

export let cardId = () => {
    return cardIdGen.next().value;
}


let menuIdGen = (function*() {
    let id = 0;
    while(true) {
        id += 1;
        yield `menu ${id}`;
    }
})();

export let menuId = () => {
    return menuIdGen.next().value;
}