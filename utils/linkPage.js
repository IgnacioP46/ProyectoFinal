export const linkPage = (selector, pageFunction) => {
  const link = document.querySelector(selector);
  if (link) {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      pageFunction();
    });
  }
};
