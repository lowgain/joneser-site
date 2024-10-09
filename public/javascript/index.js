document.getElementById('theme-switch').onclick = () => {
  const stylesheet = document.getElementById('page-theme')
  document.getElementById('theme-switch').checked
    ? stylesheet.setAttribute('href', '../public/styles/dark.css')
    : stylesheet.setAttribute('href', '../public/styles/light.css')
}
