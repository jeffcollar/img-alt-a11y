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
        let hiddenImageCount = 0;
        const visibleImages = images.filter((child) => {
            ariaHidden = child.hasAttribute('aria-hidden') && child.attributes['aria-hidden'].value === true;
            presentation = child.hasAttribute('role') && child.attributes['role'].value === 'presentation';
            computedSylte = window.getComputedStyle(child);
            hidden = computedSylte.display === "none" || computedSylte.visibility === "hidden";
            if (ariaHidden || presentation || hidden) {
                hiddenImageCount += 1;
                return false;
            }

            return true;
        })

        visibleImages.forEach((child) => {
            let list_item = document.createElement('li')
            list_item.classList.add('img-alt-a11y-li')
            list.appendChild(list_item);

            let new_image = child.cloneNode(true);
            new_image.removeAttribute('height');
            new_image.removeAttribute('width');
            new_image.className = 'img-alt-a11y-li-image';
            list_item.appendChild(new_image);

            let alt_text = document.createElement('p');
            alt_text.classList.add('img-alt-a11y-li-text')
            alt_text.innerText = child.alt;
            list_item.appendChild(alt_text);

            console.log(child.src);
            console.log(child.alt);
        });

        if (hiddenImageCount > 0) {
            let hiddenImageText = document.createElement('p');
            hiddenImageText.classList.add('img-alt-a11y-hidden-image-text')
            let verb = (hiddenImageCount > 1) ? 'are' : 'is';
            let countLabel = (hiddenImageCount > 1) ? 'images' : 'image';
            hiddenImageText.innerText = `There ${verb} ${hiddenImageCount} ${countLabel} on the page not visible to screen readers.`
            container.appendChild(hiddenImageText);
        }

        window.scrollTo(0,0);
    }
});