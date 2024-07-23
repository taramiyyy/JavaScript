const header = document.querySelector("header")

window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", this.window.scrollY > 0)
})

const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq =>{
    faq.addEventListener("click", ()=>{
        faq.classList.toggle("active");
    });
});



/**** */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}




const initSlide = () =>{
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-botton");
    const sliderScrollbar = document.querySelectorAll(".container-swip .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelectorAll(".scrollbar-thumb");
    constmaxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb = addEventListener("mousedown" , (e) =>{
        const starX = e.clientX;
        const thumbPosition = scrollThumb.offsetLeft;

        const handleMouseMove = (e) =>{
            const deltaX = e.clientX - starX;
            const newThumbPositin = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getboundingClientRect().width - scrollbarThumb.offsetWidth

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPositin));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = '${boundedPosition}px';
            imageList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () =>{
            document.removeventListener("mousemove", handleMouseMove);
            document.removeventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

    })

    slideButtons.forEach(button =>{
        button.addEventListener("click", ()=>{
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        });
    });

    const handleSlideButtons =()=>{
        slideButtons[0].style.display =imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display =imageList.scrollLeft >= maxScrollLeft ? "none" : "block";

    }    

    const updateScrollThumbPosition =()=>{
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = '${thumbPosition}px';
    }

    imageList.addEventListener("scroll", ()=>{
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}

window.addEventListener("load", initSlider);
