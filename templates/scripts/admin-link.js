function createDivs() {
  // // Number of divs to create
  // const numDivs = 5;

  // // Get a reference to the element where you want to append the divs
  const container = document.body;

  const div = document.createElement('div');
  const div2 = document.createElement('div');
  const anchor = document.createElement('a');
  const button = document.createElement('button');
  button.innerText = 'ADMIN';
  anchor.setAttribute('href', './admin.html')
  anchor.appendChild(button);
  div2.appendChild(anchor);
  div.appendChild(div2);
  container.appendChild(div);
  // const div3 = document.createElement('div');

  console.log('testing');
}

// Add an event listener for the window's load event
window.addEventListener('load', createDivs);
