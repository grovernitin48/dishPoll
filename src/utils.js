const LocalStorage = {
    get: function(name) {
        const ls = localStorage.getItem(name);
        if(ls) {
            return JSON.parse(ls)
        } return null;
    },
    set: function(name, val) {
        localStorage.setItem(name, JSON.stringify(val))
    }
}

export {
    LocalStorage,
}
