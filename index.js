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

const authClient = new OktaAuth({
  url: 'https://login-staging.zeotap.com/',
  issuer: 'https://login-staging.zeotap.com/oauth2/default',
  clientId: '0oa1kkxu0r6xSg2j40x7',
  redirectUri: 'http://localhost:8080'
});

if (authClient.isLoginRedirect()) {
  authClient.token.parseFromUrl()
    .then(data => {
      const { idToken } = data.tokens;
      authClient.tokenManager.add('idToken', idToken);
      console.log(idToken);
      setValue();
      profileContainer.style.display = 'block';
    });
} else {
  authClient.tokenManager.get('idToken')
    .then(idToken => {
      if (idToken) {
        console.log(idToken);
        setValue();
        profileContainer.style.display = 'block';
      } else {
        // With redirecting user to Okta Page
        // authClient.token.getWithRedirect({
        //   responseType: 'id_token'
        // });

        // With user credentials
        const username = prompt('Username');
        const password = prompt('Password');

        authClient.signInWithCredentials({username, password})
        .then(transaction => {
          authClient.token.getWithRedirect({
            sessionToken: transaction.sessionToken,
            responseType: 'id_token'
          });
        })
      }
    })
}