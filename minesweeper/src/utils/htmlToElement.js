export default (string) => {
  const template = document.createElement('template');
  template.innerHTML = string;
  return template.content.firstChild;
}