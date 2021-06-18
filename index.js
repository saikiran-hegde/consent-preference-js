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

const profileContainer = document.getElementsByClassName('profile-container')[0];
profileContainer.style.display = 'none';

const signIn = new OktaSignIn({
  baseUrl: 'https://zeotap.oktapreview.com',
  logo: 'https://content.zeotap.com/img/Zeotap%20Private%20Channel.png',
  clientId: '0oa1kkxu0r6xSg2j40x7',
  redirectURI: 'http://localhost:8080'
});
signIn.renderEl({
  el: '#widget-container'
}, function success(res) {
  if (res.status === 'SUCCESS') {
    console.log('Do something with this sessionToken', res.session.token);
    setValue();
    profileContainer.style.display = 'block';
  } else {
    alert('Invalid User');
  }
});