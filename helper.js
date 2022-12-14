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

function setFocusTo(selector) {
  getElement(selector).focus();
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
