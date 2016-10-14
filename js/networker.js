module.exports.connect = (host) => {
    return new Promise((resolve, reject) => {
        // register service worker
        if(window.navigator.serviceWorker) {
            console.log('registering service worker...');
            window.navigator.serviceWorker.register('./cacher.js').then(() => {
                console.log('service worker registered');
            });
        }
        
        // detect network disconnect
        // display information abt conn
        // cache requests (esp card data)
        
        // connect to peers
        
        // listen for events
        
        resolve();
    });
};