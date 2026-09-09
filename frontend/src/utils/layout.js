export const toggleDocumentAttribute = (attribute, value, remove, tag = 'html') => {
  if (typeof document !== 'undefined' && document.body) {
    const element = document.getElementsByTagName(tag.toString())[0];
    if (element) {
      const hasAttribute = element.getAttribute(attribute);
      if (remove && hasAttribute) element.removeAttribute(attribute);
      else element.setAttribute(attribute, value);
    }
    // Also synchronize data-bs-theme to document.body so children inside body don't get trapped
    if (attribute === 'data-bs-theme') {
      if (remove) {
        document.body.removeAttribute('data-bs-theme');
      } else {
        document.body.setAttribute('data-bs-theme', value);
      }
    }
  }
};