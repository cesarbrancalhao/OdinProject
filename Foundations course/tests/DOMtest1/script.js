
const content = document.querySelector('.content');

const imred = document.createElement('p');

    imred.textContent = "Hey, I'm red!";
    content.appendChild(imred);

const imblue = document.createElement('h3');

    imred.textContent = "I'm a blue h3!";
    content.appendChild(imblue);


const imdiv = document.createElement('div');

    imdiv.style.cssText = "background-color: pink; border: 1px solid black;";
    imdiv.setAttribute('id', 'imdiv');

    const h1div = document.createElement('h1');

        h1div.textContent = "I'm a div!";
        imdiv.appendChild(h1div);

    const pdiv = document.createElement('p');

        pdiv.textContent = "ME TOO!";
        imdiv.appendChild(pdiv);

    content.appendChild(imdiv);

