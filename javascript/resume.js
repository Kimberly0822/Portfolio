function toggleDisplay(elem) {
    if (getComputedStyle(elem).visibility === "hidden") {
      elem.style.visibility = "visible";
    } else {
      elem.style.visibility = "hidden";
    }
  }

  function toggleContents(e) {
    const subject = e.currentTarget;
    const contents = subject.nextElementSibling;
    toggleDisplay(contents);
    const chevron = subject.querySelector('.chevron');
    chevron.classList.toggle('fa-chevron-down');
    chevron.classList.toggle('fa-chevron-up');
  }

  window.addEventListener('load', function(e) {
    const subjects = document.querySelectorAll('.subject');
    for (subject of subjects) {
      subject.addEventListener('click', toggleContents);
    }
  });