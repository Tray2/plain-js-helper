function getElement(selector) {
  let el = document.querySelector(selector);
  if (el === null) throw `No matching element found: ${selector}`;
  return el;
}

function getAllElements(selector) {
  let els = document.querySelectorAll(selector);
  if (els.length === 0) throw `No matching elements found: ${selector}`;
  return els;
}

function getValue(selector) {
  let value = getElement(selector).value;
  if (value === undefined) throw `This element doesn't have a value property: ${selector}`;
  return value;
}

function setValue(selector, value) {
  let el = getElement(selector)
  if (el.value === undefined) throw `This element doesn't have a value property: ${selector}`;
  el.value = value;
}

function getInnerHTML(selector) {
  let el = getElement(selector);
  if (el.nodeName === 'INPUT') throw `This element doesn't have an innerHTML propery: ${selector}`;
  return el.innerHTML;
}

function setInnerHTML(selector, html) {
  let el = getElement(selector)
  if (el.nodeName === 'INPUT') throw `This element doesn't have an innerHTML propery: ${selector}`;
  el.innerHTML = html;
}

function getImgSrc(selector) {
  let el = getElement(selector);
  if(el.nodeName !== 'IMG') throw `This element doesn't have a source attribute: ${selector}`
  return el.src;
}

function setImgSrc(selector, path) {
  let el = getElement(selector);
  if(el.nodeName !== 'IMG') throw `This element doesn't have a source attribute: ${selector}`
  el.src = path;
}

function show(selector) {
  getElement(selector).classList.remove('is-hidden');
}

function hide(selector) {
  getElement(selector).classList.add('is-hidden');
}

function showLoading() {
  show('#loading');
}

function hideLoading() {
  hide('#loading');
}

function isHidden(selector) {
  return getElement(selector).classList.contains('is-hidden');
}

function isVisible(selector) {
  return ! isHidden(selector);
}

function hasClass(selector, cssClass) {
  return getElement(selector).classList.contains(cssClass);
}

function showAlert(message) {
  showMessageModal('alert', message);
}

function showWarning(message) {
  showMessageModal('warning', message);
}

function showInfo(message) {
  showMessageModal('info', message);
}

function showMessageModal(modalType, message) {
  setInnerHTML(`#${modalType}-message-text`, message);
  show(`${modalType}-modal`);
}

function setFocusTo(selector) {
  getElement(selector).focus();
}

function newElement(elementType) {
  return document.createElement(elementType);
}

function createInput(attributes) {
  let input = newElement('input');
  if (attributes.name === undefined) throw 'Name attribute is mandatory';
  if (attributes.type === undefined) throw 'Type attribute is mandatory';
  Object.keys(attributes).forEach(attribute => {
    if (attribute === 'required') {
      input.required = true;
    } else if (attribute === 'readonly') {
      input.readOnly = true;
    } else if (attribute === 'disabled') {
      input.disabled = true;
    } else {
      input[attribute] = attributes[attribute];
    }
  });
  return input;
}

function addInputFieldAfter(selector, attributes) {
  let element = createInput(attributes);
  getElement(selector).after(element);
}

function addInputFieldBefore(selector, attributes) {
  let element = createInput(attributes);
  getElement(selector).before(element);
}


function cloneInput(selector) {
  let element = getElement(selector);
  if (element.nodeName !== 'INPUT') throw `Element is not an input: ${selector}`;
  let clone = element.cloneNode();
  if (element.id !== undefined) {
    clone.id = element.id + Date.now();
  }
  clone.value = '';
  element.after(clone);
}

function cloneElement(selector) {
  let element = getElement(selector);
  let clone = element.cloneNode();
  if (element.id !== undefined) {
    clone.id = element.id + Date.now();
  }
  element.after(clone);
}

async function postRequest(url, parameters = {}, loading = true) {
  try {
      if (loading) {
          showLoading();
      }
      let responsePromise = await fetch(url, { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(parameters)
      });
      if(! responsePromise.ok) {
          if (loading) {
              hideLoading();
          }
          throw new Error(responsePromise.status );
      }
      if (loading) {
          hideLoading();
      }
      return await responsePromise.json();
  } catch (error) {
      return error;
  }
}

async function getRequest(url, parameters = {}, loading = true) {
  try {
      if (loading) {
          showLoading();
      }
      let responsePromise = await fetch(url, { method: 'GET', headers: parameters});
      if(! responsePromise.ok) {
          if(loading) {
              hideLoading();
          }
          throw new Error(responsePromise.status );
      }
      if (loading) {
          hideLoading();
      }
      return await responsePromise.json();
  } catch (error) {
      return error;
  }
}
