const icomId = document.getElementById('icomId'),
  hhId = document.getElementById('hhId'),
  ucId = document.getElementById('ucId');

const data = {
  icomId: 1231241,
  hhId: 123456,
  ucId: 112234
};

function setValue() {
  icomId.innerText = data.icomId;
  hhId.innerText = data.hhId;
  ucId.innerText = data.ucId;

  // Set toggle switch
  document.getElementById('global-toggle-switch').checked = true;
  document.getElementById('obtm-toggle-switch').checked = true;
}

setValue();

function checkboxValueChange(event) {
  console.log(`${event.currentTarget.id} - ${event.currentTarget.checked}`);
}

function showHide() {
  const collapseDiv = document.getElementById('collapse-icon-div'),
    consentDiv = document.getElementById('consent-preference');
  if (consentDiv.style.display === 'none' || consentDiv.style.display === '') {
    collapseDiv.style.transform = "rotate(90deg) translate(12px, 14px)";
    consentDiv.style.display = 'grid';
  } else {
    collapseDiv.style.transform = "rotate(0deg)";
    consentDiv.style.display = 'none';
  }
}