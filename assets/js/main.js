window.addEventListener('load', () => {
  document.querySelector('body').style.overflowY = "auto"; // Make body scrollable
  document.querySelectorAll('section').forEach(section => section.style.opacity = 1); // Bring opacity back to 1
  document.querySelector('footer').style.opacity = 1; // Bring opacity back to 1


  // Preloader

  const preloader = document.querySelector('.preloader');

  preloader.classList.add('complete');

  setTimeout(() => {
    preloader.parentNode.removeChild(preloader); // Remove preloader element from the DOM
  }, 500);


  const header = document.querySelector('.header');
  const bgImage = document.querySelector('.bg');
  const sections = document.querySelectorAll('section');

  // Sidebar
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.toggle');
  const sidebarLinks = document.querySelectorAll('.links a');

  // Sidebar contact
  const sidebarContact = document.querySelector('.sidebar-contact');
  const toggleContact = document.querySelector('.toggle-contact');
  const button = document.querySelector('.button');
  const buttonBefore = document.querySelector('.button .before');
  const buttonAfter = document.querySelector('.button .after');
  const screen = document.querySelector('.screen');
  const closedScreen = document.querySelector('.screen .closed');
  const phoneTime = document.querySelector('.phoneTime')
  const homeScreen = document.querySelector('.screen .home-screen');
  const gmailIcon = document.querySelector('.contact-me');
  const openedScreen = document.querySelector('.screen .opened');
  
  // Contact
  const input = document.getElementsByClassName('input');

  // const image = bgImage.getBoundingClientRect();

  // header.addEventListener('mousemove', (e) => {
  //   const moveX = e.pageX - image.left;
  //   const moveY = e.pageY - image.top;

  //   const xPercent = (moveX / image.width) * 100;
  //   const yPercent = (moveY / image.height) * 100;

  //   bgImage.style.left = `${xPercent}%`;
  //   bgImage.style.top = `${yPercent}%`;
  // });

  // header.addEventListener('mouseleave', (e) => {
  //   bgImage.style.left = `50%`;
  //   bgImage.style.top = `15%`;
  // });


  // Smooth scroll and change active links on menu

  window.addEventListener('scroll', () => {
    const currentPosition = window.pageYOffset;
    // const scrollY = window.scrollY;

    sections.forEach(section => {
      const top = section.offsetTop - 1;
      const bottom = top + section.offsetHeight;
      // const bottom = top + section.clientHeight;

      if (currentPosition >= top && currentPosition <= bottom) {
        sidebar.querySelectorAll('a').forEach(link => link.classList.remove('active'));
        sidebar.querySelector(`a[href="#${section.id}"]`).classList.add('active');
      }
    });
  });

  
  // Sidebar

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Close sidebar after clicking links or on scroll

  sidebarLinks.forEach(link => {
    link.addEventListener('mouseup', () => {
      sidebar.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    sidebar.classList.remove('active');
  });


  // Sidebar contact

  toggleContact.addEventListener('click', () => {
    sidebarContact.classList.toggle('active');
    toggleContact.classList.toggle('active');
  });

  // Change screens on iphone after click the button

  button.addEventListener('click', () => {
    if (homeScreen.classList.contains('active')) {
      closedScreen.classList.add('active');
      homeScreen.classList.remove('active');
      screen.classList.remove('hide');
    }

    else if (openedScreen.classList.contains('active')) {
      homeScreen.classList.add('active');
      openedScreen.classList.remove('active');
    }

    else {
      closedScreen.classList.add('active');
      buttonBefore.style.display = 'none';
      buttonAfter.style.display = 'none';
    }
  });

  // Open home screen after dragging

  closedScreen.addEventListener('drag', (e) => {
    homeScreen.classList.add('active');
    closedScreen.classList.remove('active');
    screen.classList.add('hide');
  });

  // Open contact screen after clicking gmail icon

  gmailIcon.addEventListener('click', () => {
    openedScreen.classList.add('active');
    homeScreen.classList.remove('active');
  });

  // Turn phone off on double clicking the button

  button.addEventListener('dblclick', () => {
    closedScreen.classList.remove('active');
    homeScreen.classList.remove('active');
    openedScreen.classList.remove('active');
    buttonBefore.style.display = 'block';
    buttonAfter.style.display = 'block';
  });

  // Current date and time on the phone

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  Date.prototype.getCurrentTime = function() {
    return `${this.getHours() < 10 ? '0' : ''}${this.getHours() > 12 ? this.getHours() - 12 : this.getHours()}:${this.getMinutes() < 10 ? '0' : ''}${this.getMinutes()}`;
  };

  Date.prototype.getCurrentTimeFormat = function() {
    return `${this.getHours() > 12 ? 'PM' : 'AM'}`;
  };

  (function dateAndTime() {
    const currentDate = new Date();
  
    const todaysDate = `${days[currentDate.getDay()]}, ${months[currentDate.getMonth()]} ${currentDate.getDate()}`;
    const currentTime = currentDate.getCurrentTime();
    const currentTimeFormat = currentDate.getCurrentTimeFormat();
  
    phoneTime.innerHTML = `${currentTime}<span>${currentTimeFormat}</span><br><span>${todaysDate}</span>`;

    setTimeout(dateAndTime, 1000);
  })();


  // Float inputs on contact section

  for (let i = 0; i < input.length; i++)
  {
    input[i].addEventListener("focus", e => {
      e.target.parentNode.classList.add("focus");
    });

    input[i].addEventListener("blur", e => {
      if (e.target.value === '')
        e.target.parentNode.classList.remove("focus");
    });
  }


  // Typewriting

  const texts = ['Graphic Design', 'Illustrations', 'Logo Creator', 'Photography', 'Video Editing'];
  let count = 0;
  let index = 0;
  let currentText = '';
  let letter = '';

  (function type() {
    if (count === texts.length) {
      count = 0;
    }

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector('.typing').textContent = letter;

    if (letter.length === currentText.length) {
      count++;
      index = 0;
    }

    setTimeout(type, 250);
  })();


  // Modal

  // Get the entire container
  const portfolioContent = document.querySelector('.portfolio-content');
  let myModal;

  portfolioContent.addEventListener('click', (e) => {
    // Get modal for specific project based on which one is clicked
    if (e.target.className !== 'content') {
      myModal = e.target.parentNode.parentNode.nextElementSibling;
    }
    else {
      myModal = e.target.parentNode.nextElementSibling;
    }
    
    // Because the portfolio isnt full, check if we clicked a project which has a modal
    if(myModal !== null) {
      openModal();
      
      // Close modal on button click
      const closeBtn = myModal.querySelector('.closeModal');
      closeBtn.addEventListener('click', closeModal);
      
      // Close modal on outside click
      myModal.addEventListener('click', outsideClick);
      
      // Carousel on Modal

      if (myModal.querySelector('.slider')) {
        const nextSliderBtn = myModal.querySelector('#nextBtn');
        const prevSliderBtn = myModal.querySelector('#prevBtn');
        const indicator = myModal.querySelector('.indicators');
        const indicators = myModal.querySelectorAll('.indicators ul li');

        indicator.style.width = indicators.length * 30 + 60 + 'px';

        // Carousel button events

        nextSliderBtn.addEventListener('click', nextSlide);
        prevSliderBtn.addEventListener('click', prevSlide);
      }
    }
  });

  const openModal = () => {
    myModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  const closeModal = () => {
    myModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Close If Outside Click
  const outsideClick = (e) => {
    e.stopPropagation(); // Stop calling events of parent div (portfolioContent) since it also has a click event
    if (e.target == myModal) {
      closeModal();
    }
  }

  // Next button on carousel

  const nextSlide = () => {
    const slides = myModal.querySelectorAll('.slide');
    const current = myModal.querySelector('.current');
    const indicators = myModal.querySelectorAll('.indicators ul li');
    const activeIndicator = myModal.querySelector('.activeIndicator');

    current.classList.remove('current');
    activeIndicator.classList.remove('activeIndicator');

    // Check for next slide
    if (current.nextElementSibling.classList.contains('slide')) {
      // Add current to next sibling
      current.nextElementSibling.classList.add('current');
      activeIndicator.nextElementSibling.classList.add('activeIndicator');
    }
    else {
      // Add current to start
      slides[0].classList.add('current');
      indicators[0].classList.add('activeIndicator');
    }
  }

  // Prev button on carousel

  const prevSlide = () => {
    const slides = myModal.querySelectorAll('.slide');
    const current = myModal.querySelector('.current');
    const indicators = myModal.querySelectorAll('.indicators ul li');
    const activeIndicator = myModal.querySelector('.activeIndicator');

    current.classList.remove('current');
    activeIndicator.classList.remove('activeIndicator');

    // Check for prev slide
    if (current.previousElementSibling) {
      // Add current to prev sibling
      current.previousElementSibling.classList.add('current');
      activeIndicator.previousElementSibling.classList.add('activeIndicator');
    }
    else {
      // Add current to last
      slides[slides.length - 1].classList.add('current');
      indicators[indicators.length - 1].classList.add('activeIndicator');
    }
  }


  // Lazy load images

  const images = document.querySelectorAll('[data-src]');
  const imgOptions = {
    rootMargin: "500px 0px 500px 0px"
  }

  const preloadImages = img => {
    const src = img.getAttribute('data-src');
    if (!src) {
      return
    }
    img.src = src;
    img.style.opacity = 1;
  }
  
  const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.5 || entry.isIntersecting) {
        preloadImages(entry.target);
        imgObserver.unobserve(entry.target);
      }
    });
  }, imgOptions)

  images.forEach(image => imgObserver.observe(image));


  // Animate elements

  const elementsToAnimate = document.querySelectorAll('.animate');
  const elementsToAnimateOptions = {
    rootMargin: "-70px 0px -70px 0px"
  }
  
  const elementsToAnimateObserver = new IntersectionObserver((entries, elementsToAnimateObserver) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0 || entry.isIntersecting) {
        entry.target.style.animation = `${entry.target.dataset.animation} 1s forwards ${entry.target.dataset.delay} ease-out`;
        elementsToAnimateObserver.unobserve(entry.target);
      }
      else {
        entry.target.style.animation = 'none';
      }
    });
  },elementsToAnimateOptions);

  elementsToAnimate.forEach(text => elementsToAnimateObserver.observe(text));


  // Animate numbers in

  function CountNumbers(object) {
    const elem = object.element;
    const value = parseInt(elem.getAttribute('data-inc-value'));
    const duration = parseInt(elem.getAttribute('data-inc-duration'));
    const speed = object.speed;
    let count = 0;
    let interval = null;
    const increment = Math.ceil(value / (duration / speed));
    const regex = /\B(?=(\d{3})+(?!\d))/g;

    const run = function() {
      count += increment;
      if (count < value) {
        elem.textContent = (count).toString().replace(regex, ',');
      } else {
        clearInterval(interval);
        elem.textContent = (value).toString().replace(regex, ','); // Add , after 3 digits
      }
    }

    interval = setInterval(run, speed);
  } // CountNumbers


  // Footer facts numbers
  const footerFacts = document.querySelectorAll('.fact h2 span');
  
  // Graphic Skills progress numbers
  const graphicSkillsProgress = document.querySelectorAll('.graphic-design .skills-progress');

  // Web design Skills progress numbers
  const webdesignSkillsProgress = document.querySelectorAll('.web-design .skills-progress');

  // Video Photography Skills progress numbers
  const videophotographySkillsProgress = document.querySelectorAll('.video-photography .skills-progress');


  // Intersection Observer

  const numberOptions = {
    threshold: 1,
    rootMargin: "0px 0px -30px 0px"
  }

  const numberObserver = new IntersectionObserver((entries, numberObserver) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.5 || entry.isIntersecting) {
        const element = entry.target;
        const arrayOfObjects = [];
        arrayOfObjects.push(new CountNumbers({element, speed: 50}));
        
        numberObserver.unobserve(entry.target);
      }
    });
  }, numberOptions);

  // Observe
  graphicSkillsProgress.forEach(skill => numberObserver.observe(skill));

  webdesignSkillsProgress.forEach(skill => numberObserver.observe(skill));

  videophotographySkillsProgress.forEach(skill => numberObserver.observe(skill));

  footerFacts.forEach(fact => numberObserver.observe(fact));
}); // window.load


// Smooth scroll and change active links on menu

// var sections = $('section')
// , sidebar = $('.sidebar')

// $(window).on('scroll', function () {
//   var cur_pos = $(this).scrollTop();

//   sections.each(function() {
//     var top = $(this).offset().top - 1,
//         bottom = top + $(this).outerHeight();
        
//     if (cur_pos >= top && cur_pos <= bottom) {
//       sidebar.find('a').removeClass('active');
//       sidebar.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
//     }
//   });
// });