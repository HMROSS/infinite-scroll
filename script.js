const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// let intialRun = true;
let imgCount = 30;


// Unsplash API
const apiKey = 'QD-1cWaD4aDw-GW09yMrRQbzF8Cbxev71l4jg1iv_TA';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`;

// Check if all images were Loaded
function imageLoaded() {
    imagesLoaded++;
    // console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
        // imagesLoaded = 0;
    }
}

//Helper-super function to make the code DRY and set Attributes on DOM Elements
function setAttributes(element, attObject) {
    for(const key in attObject) {
        element.setAttribute(key, attObject[key]);
    }
}
// Create Elements for Links and Photos, Add to DOM 
function displayPhotos() {
    // intialRun = false;
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



// Get Photos From Unsplash API
async function getPhotos(imgCount) {
    // const apiKey = 'QD-1cWaD4aDw-GW09yMrRQbzF8Cbxev71l4jg1iv_TA';
    // let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`;
    
    
    try {
        console.log(imgCount);
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);/////
        // console.log(photosArray);
        displayPhotos();
       
    } catch (error) {
        //catch Error here
    }
}


// function intialAndAfterRun() {
//     if(intialRun === true) {
//         getPhotos();
//     } else {
//          imgCount = 30;
//          getPhotos();
//     }
// }

//Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        // intialAndAfterRun();
        getPhotos();
        
    }
});

// On Load
getPhotos();
// intialAndAfterRun();



