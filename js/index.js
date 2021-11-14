const invoiceTotal = document.getElementById("invoice-total");
const peopleTotal = document.getElementById("people-total");
const customPercent = document.getElementById("custom");
const tipBtns = document.querySelectorAll(".tip");
const btnReset = document.getElementById("reset");

const tipTotalAmount = document.getElementById("total-amount");
const tipTotalPerson = document.getElementById("total-person");

const calculateTip = (percentage) => {
  let totalForPerson = 0;
  let totalTip = 0;

  if (!invoiceTotal.value) {
    alert("Value is empty");
    return;
  }

  if (!peopleTotal.value) {
    alert("Number People is empty");
    return;
  }

  if (!!invoiceTotal.value && !!peopleTotal.value) {
    totalTip = ((+percentage / 100) * invoiceTotal.value) / peopleTotal.value;

    totalForPerson = invoiceTotal.value / peopleTotal.value + totalTip;
  }

  tipTotalAmount.innerText = `$ ${totalTip.toFixed(2)}`;
  tipTotalPerson.innerText = `$ ${totalForPerson.toFixed(2)}`;
};

const handleClick = (btn) => {
  calculateTip(btn.dataset.percent);
};

const tipCustom = () => {
  calculateTip(customPercent.value);
};

const reset = () => {
  invoiceTotal.value = "0";
  peopleTotal.value = "1";
  tipTotalAmount.innerText = "$ 0";
  tipTotalPerson.innerText = "$ 0";
};

const validPeople = () => {
 
  const nameHintText = document.getElementById("name-hint-text");

  if (+peopleTotal.value === 0){

    if (!nameHintText) {
      peopleTotal.classList.add("error");
      peopleTotal.insertAdjacentHTML(
        "afterend",
        '<div id="name-hint-text" class="hint">El campo no es válido</div>'
      );
    }
  } else {
    peopleTotal.classList.remove("error");

    if (nameHintText) {
      nameHintText.remove();
    }
  }
};

tipBtns.forEach((btn) => {
  btn.addEventListener("click", handleClick.bind(null, btn));
});
btnReset.addEventListener("click", reset);
["change", "keyup"].forEach((e) =>
  customPercent.addEventListener(e, tipCustom)
);
["change", "keyup"].forEach((e) =>
  peopleTotal.addEventListener(e, validPeople)
);

