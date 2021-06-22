const icomId = document.getElementById('icomId'),
  hhId = document.getElementById('hhId'),
  ucId = document.getElementById('ucId');

const urlData = {
  'search': {
      'icoms_account_uid': ['1111111138']
  }
}

function setValue(icomIdVal, hhIdVal, ucIdVal) {
  icomId.innerText = icomIdVal;
  hhId.innerText = hhIdVal;
  ucId.innerText = ucIdVal;

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

function fetchProfileData(accessToken) {
  fetch('http://idgraph-qa-eu.zeotap.net/graph-manager/v1/orgs/1746/region/EU/users/_search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(urlData)
      })
      .then(response => response.json())
      .then(response => {
        data = response[0];
        setValue(data.ids.icoms_account_uid[0].icoms_account_uid, data.ucid, data.ids.household_id[0].household_id);
        profileContainer.style.display = 'block';
      });
}

const authClient = new OktaAuth({
  issuer: 'https://login-staging.zeotap.com/oauth2/default',
  clientId: '0oa1kkxu0r6xSg2j40x7',
  redirectUri: 'http://localhost:8080'
});

if (authClient.isLoginRedirect()) {
  authClient.token.parseFromUrl()
    .then(data => {
      authClient.tokenManager.add('accessToken', data.tokens.accessToken);
      fetchProfileData(data.tokens.accessToken.accessToken);
    });
} else {
  authClient.tokenManager.get('accessToken')
    .then(accessToken => {
      if (accessToken) {
        fetchProfileData(accessToken.accessToken)
      } else {
        authClient.token.getWithRedirect({
          responseType: 'token',
          loginHint: 'saikiran.hegde@zeotap.com'
        });
      }
    })
}