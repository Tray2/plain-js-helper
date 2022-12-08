function getElement(selector) {
  return document.querySelector(selector);
}

function getAllElements(selector) {
  return document.querySelectorAll(selector);
}

function getValue(selector) {
  return getElement(selector).value;
}

function setValue(selector, value) {
  getElement(selector).value = value;
}

function getInnerHTML(selector) {
  return getElement(selector).InnerHTML;
}

function setInnerHTML(selector, html) {
  getElement(selector).InnerHTML = html;
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
  return ! getElement(selector).classList.contains('is-hidden');
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
