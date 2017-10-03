'use_strict';

var skills = 
[
    {
        name: "HTML5/CSS3",
        image: 'html-css.png',
        level: 5,
    },
    {
        name: "PHP",
        image: 'php.png',
        level: 4,
    },
    {
        name: "JavaScript",
        image: 'js.png',
        level: 5,
    },
    {
        name: "Angular 2",
        image: 'angular.svg',
        level: 4,
    },
    {
        name: "Java",
        image: 'java.svg',
        level: 5,
    },
    {
        name: "MySQL",
        image: 'mysql.png',
        level: 5,
    },
    {
        name: "C language",
        image: 'C.png',
        level: 3,
    },
    {
        name: "Node.js",
        image: 'nodejs.png',
        level: 3,
    },
    {
        name: "MongoDB",
        image: 'mongodb.svg',
        level: 4,
    },
    {
        name: "Python",
        image: 'python.svg',
        level: 2,
    },
    {
        name: "Git",
        image: 'git.png',
        level: 5,
    },
];


function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
}

function scrollTo(to, duration) {

    if (duration <= 0) return;
    var element = document.scrollingElement;

    if(element.scrollTop > to) {
        var difference = to - element.scrollTop;
    } else {
        var difference = to + element.scrollTop;
    }
    var perTick = difference / duration * 10;
    
    setTimeout(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop == to) return;
      scrollTo(to, duration - 10);
    }, 10);
}  

function addFormErrors(formId) {
    var isValid = true;
    document.querySelectorAll("#"+formId+" [required").forEach(e => {
        if(e.value.trim().length == 0) {
            e.classList.add("error");
            isValid = false;
        }
    });
    return isValid;
}
  

window.onload = function() {

    document.onscroll = ev => {
        document.querySelectorAll('#skills table td:last-of-type').forEach(e => {
            if(isElementInViewport(e)) {
                e.classList.remove('b-0');
            }
        });
    }

    // SKILLS DISPLAY (EASIER MANAGEMENT WITH JS, and prevents code copying/pasting
    skills.forEach(s => {
        // CREATION OF SKILL CONTAINER HTML ELEMENT
        var skillContainer = document.createElement('tr');
        skillContainer.classList.add('text-center', 'flex-column');
        var name = document.createElement('td');
        name.innerText = s.name;
        var tdImage = document.createElement('td');
        var image = document.createElement('img');
        image.src = 'img/'+s.image;
        image.classList.add('responsive-img');
        tdImage.appendChild(image);
        var level = document.createElement('td');
        level.classList.add('b-0', 'level', 'l-'+s.level);
        skillContainer.appendChild(name);
        skillContainer.appendChild(tdImage);
        skillContainer.appendChild(level);

        // APPENDING THAT ELEMENT ON THE TABLE
        document.getElementById('skillTable').appendChild(skillContainer);
    });
    
    document
    .querySelector('footer .scroll-down a')
        .addEventListener('click', e => {
            e.preventDefault();            
            scrollTo(0, 600);
        });

    document
    .querySelector('#first .scroll-down a')
        .addEventListener('click', e => {
            e.preventDefault();
            var height = document.getElementById('skills').clientHeight+document.querySelector('header').clientHeight;
            scrollTo(height, 700);
        });

    document
    .querySelector('#contactForm')
        .addEventListener('submit', e => {
            e.preventDefault();
            if(addFormErrors("contactForm")) {
                if(confirm("Are you sure your mail address is "+mail.value)) {
                    document.getElementById('validator').classList.add('visible');
                }
            }
        });

    document
    .querySelectorAll('.toggle').forEach(e => {
        e.addEventListener('click', event => {
            var container = e.parentNode.parentNode.querySelector('.expandable');
            if(container === null) {
                container = e.parentNode.parentNode.parentNode.parentNode.querySelector('.expandable');
            }

            if(container.className.indexOf('closed') < 0) {
                container.classList.add('closed');
                e.innerHTML = 'expand_more';        
            } else {
                container.classList.remove('closed');
                e.innerHTML = 'expand_less';
            }
        });
    });

    document
    .querySelectorAll("aside").forEach(el => {
        el.addEventListener('click', event => {
            el.parentElement.querySelector('form').classList.remove('h-0');
        });
    });




    document.getElementById('experienceForm').addEventListener('submit', ev => {
        ev.preventDefault();

        if(addFormErrors("experienceForm")) {
            
            var role = document.querySelector('#experienceForm #role').value;
            var year = document.querySelector('#experienceForm #year').value;
            var company = document.querySelector('#experienceForm #company').value;
            var location = document.querySelector('#experienceForm #location').value;
            var description = document.querySelector('#experienceForm #description').value;
            
            var experienceComponent = document.createElement('li');
            experienceComponent.classList.add('w-50', 'xs-100');
            experienceComponent.setAttribute('data-year', year);

            var title = document.createElement('h4');
            title.innerText = role+' at ';
            
            var companyEl = document.createElement('i');
            companyEl.innerText = company+', ';
            title.appendChild(companyEl);

            var locationEl = document.createElement('small');
            locationEl.innerText = 'in ' + location;
            title.appendChild(locationEl);

            
            var desc = document.createElement('p');
            desc.innerText = description;

            experienceComponent.appendChild(title);
            experienceComponent.appendChild(desc);

            document.querySelector('#works section ol')
                .insertBefore(experienceComponent, document.querySelector('#works section ol').firstChild);

        
            document.getElementById('experienceForm').classList.add('h-0');
            
            document.querySelectorAll('#experienceForm input, #experienceForm textarea').forEach(e => {
                e.value = "";
            })
            
        }
    });

    // document.getElementsByTagName('body')[0].classList.remove('loading');
};