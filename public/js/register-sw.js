// if (!navigator.serviceWorker) return;

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/js/sw.js').then( reg => {
        console.log('Sevice Worker Registered.');
    }).catch( err => {
        console.log(`Service Worker Registered Failed: ${err}`);
    });    

    // Ensure refresh is only called once.
    // This works around a bug in "force update on reload".
    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function() {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
}

