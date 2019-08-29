chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {

        let existing_wrapper = document.getElementsByClassName('img-alt-a11y-wrapper');
        if (existing_wrapper.length > 0) {
            existing_wrapper[0].style.display = 'block';
            return;
        }
        
        // wrapper and container
        let wrapper = document.createElement('div')
        wrapper.classList.add('img-alt-a11y-wrapper');
        document.body.appendChild(wrapper);

        let container = document.createElement('div')
        container.classList.add('img-alt-a11y-container');
        wrapper.appendChild(container);

        // header
        let header = document.createElement('header')
        header.classList.add('img-alt-a11y-header')
        container.appendChild(header);

        let heading = document.createElement('h1')
        heading.classList.add('img-alt-a11y-h1')
        heading.innerText = 'Image Alt Text A11y'
        header.appendChild(heading);

        let closeButton = document.createElement('button')
        closeButton.innerText = 'Close Img Alt A11y'
        closeButton.classList.add('img-alt-a11y-close-button')
        closeButton.onclick = function(e) {
            wrapper.style.display = 'none';
        }
        header.appendChild(closeButton);

        // image list
        let list = document.createElement('ul')
        list.classList.add('img-alt-a11y-ul')
        container.appendChild(list);

        

        const images = [...document.getElementsByTagName('img')]
        const visibleImages = images.map((child) => {
            if (child.attributes['aria-hidden'] === true || 
                child.attributes['role'] === 'presentation' ||
                window.getComputedStyle(child).display === "none") {
                    return false;
                }

            return true;
        })

        images.forEach((child) => {
            let list_item = document.createElement('li')
            list_item.classList.add('img-alt-a11y-li')
            list.appendChild(list_item);

            let new_image = child.cloneNode(true);
            new_image.className = 'img-alt-a11y-li-image';
            list_item.appendChild(new_image);

            let alt_text = document.createElement('p');
            alt_text.classList.add('img-alt-a11y-li-text')
            alt_text.innerText = child.alt;
            list_item.appendChild(alt_text);

            console.log(child.src);
            console.log(child.alt);
        });

        window.scrollTo(0,0);
    }
});