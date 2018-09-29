
// Establishing a service worker to cache the applications pages that need access offline
if(navigator.serviceWorker){
    console.log("SW supported");
    // registering
    window.addEventListener('Load', ()=>{
        navigator.serviceWorker.register('handleSW.js', {scope: '/'})
        .then((resp)=>{
            console.log(`SW registered: ${resp}` );
        })
        .catch((err)=>{
            console.log(`SW not registered:${err}`);
        })
    })
}