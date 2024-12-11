let resultField = document.getElementById('result');
let historyList = document.getElementById('history-list');

function appendSymbol(symbol) {
  if (resultField.value === '0' && symbol !== '.') {
    resultField.value = '';
  }
  resultField.value += symbol;
}

function clearAll() {
  resultField.value = '';
}

function deleteLast() {
  resultField.value = resultField.value.slice(0, -1);
}

function calculate() {
  try {
    let calculation = resultField.value.replace(/÷/g, '/').replace(/×/g, '*');
    let result = eval(calculation);

    if (!isFinite(result)) {
      resultField.value = 'Error';
      return;
    }

    addToHistory(resultField.value + ' = ' + result);
    resultField.value = result;
  } catch {
    resultField.value = 'Error';
  }
}

function addToHistory(entry) {
  let li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li);
}