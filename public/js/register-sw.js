if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('Service worker registered successfully', reg);

    if (!navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      updateReady(reg.waiting);
      return;
    }

    if (reg.installing) {
      trackInstalling(reg.installing);
      return;
    }

    reg.addEventListener('updatefound', function() {
      trackInstalling(reg.installing);
    });

  }).catch(function(err) {
    console.log('Service worker registration failed: ', err);
  });
};

// Ensure refresh is only called once.
// This works around a bug in "force update on reload".
var refreshing;
navigator.serviceWorker.addEventListener('controllerchange', function() {
  if (refreshing) return;
  window.location.reload();
  refreshing = true;
});

let trackInstalling = function(worker) {
  var indexController = this;
  worker.addEventListener('statechange', function() {
    if (worker.state == 'installed') {
      updateReady(worker);
    }
  });
};

let updateReady = function(worker) {
  worker.postMessage({action: 'skipWaiting'});
};