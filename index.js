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
}

setValue();