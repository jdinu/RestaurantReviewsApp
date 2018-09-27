
if(navigator.serviceWorker){
    console.log("SW supported");
    // registering
    window.addEventListener('Load', ()=>{
        navigator.serviceWorker.register('someName.js', {scope: '/'})
        .then((resp)=>{
            console.log(`SW registered: ${resp}` );
        })
        .catch((err)=>{
            console.log(`SW not registered:${err}`);
        })
    })
}