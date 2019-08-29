chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
        
        let wrapper = document.createElement('div')
        wrapper.style.cssText = 'position: absolute; background-color: rgba(0,0,0,0.5); height: 100vh; width: 100vw; top: 0; left: 0; bottom: 0; right: 0; text-align: center; z-index: 2000000000; font-family: Verdana, san-serif; color: #222222;';
        document.body.appendChild(wrapper);

        let container = document.createElement('div')
        container.style.cssText = 'background-color: #EEEEEE; border: 2px solid black; height: 80%; width: 80%; margin: 5% auto; overflow: scroll; text-align: left;';
        wrapper.appendChild(container);

        let list = document.createElement('ul')
        list.style.cssText = 'list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap;'
        container.appendChild(list);

        images = document.getElementsByTagName('img')
        for (i=0; i<images.length; i++) {
            let list_item = document.createElement('li')
            list_item.style.cssText = 'display: flex; flex-direction: column; width: 25%;'
            list.appendChild(list_item);

            let image = images[i];
            image.style.cssText = 'object-fit: contain; width: 100%;'
            list_item.appendChild(image);

            let alt_text = document.createElement('p');
            alt_text.innerText = images[i].alt;
            alt_text.style.cssText = 'color: #222222';
            list_item.appendChild(alt_text);
        }

        window.scrollTo(0,0);
    }
});