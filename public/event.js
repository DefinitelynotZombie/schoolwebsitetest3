const body = document.body;
let lastScroll = 0;
window.addEventListener("scroll",() => {
    let currentscroll = window.scrollY
    if (currentscroll <= 0){
        body.classList.remove("scroll-up")
    }

    // if (window.scrollY <= 300){
    //     body.classList.remove("scroll-down")
    if (window.scrollY >= 100 && currentscroll > lastScroll && !body.classList.contains("scroll-down")){
        body.classList.remove("scroll-up")
        body.classList.add("scroll-down")
    }
    // }
    if ( currentscroll < lastScroll && body.classList.contains("scroll-down")){
        body.classList.remove("scroll-down")
        body.classList.add("scroll-up")
    }

    lastScroll = currentscroll;
})

function sideBar(){
    const sidebar = document.querySelector(".side-bar")
    document.querySelector(".first-bar").style.display = "none"
    sidebar.style.display = 'flex'

    return false;//to prevent the anchor tag from taking me to the top of the screen  
}

function closeBar(){
    const sidebar = document.querySelector(".side-bar")
    document.querySelector(".first-bar").style.display = "flex"
    sidebar.style.display = 'none'

    return false;
}

document.querySelector(".first-bar").addEventListener("click",sideBar)
document.querySelector(".second-bar").addEventListener("click",closeBar)

const all_button = document.querySelectorAll(".event-button")
document.addEventListener('click', function(event) {
    // Check if the clicked element is a button with the specified class
    if (event.target.classList.contains('event-button')) {
        const container = event.target.closest(".event-card");
        const paragraph = container.querySelector(".event-content");

        // Check if this paragraph is already open
        const isOpen = paragraph.classList.contains("open");

        // Close all open paragraphs
        const openParagraphs = document.querySelectorAll(".event-content.open");
        openParagraphs.forEach(openPara => {
            openPara.classList.remove("open");
            openPara.classList.add("hide");
        });

        // If the clicked paragraph was not open, open it
        if (!isOpen) {
            paragraph.classList.remove("hide");
            paragraph.classList.add("open");
        }
    }
});
document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('emailInput').value;

    // Example of using fetch to send a POST request to the server
    const show_message = document.querySelector(".subscription")
    function show(){
        show_message.classList.add("show-successfull")
    };
    function hide(){
        show_message.classList.remove("show-successfull")
    };
    fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        if (response.ok) {
            setTimeout(show,100);
            setTimeout(hide,1000);
            document.getElementById('emailInput').value = ''; // Clear input field
        } else {
            throw new Error('Failed to subscribe');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to subscribe' + " "+ error.message);
    });
});

