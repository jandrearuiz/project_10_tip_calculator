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

  removeActiveClass();

  if (!invoiceTotal.value || +invoiceTotal.value === 0) {
    alert("Value is empty o 0 ");
    return;
  }

  if (!peopleTotal.value || +peopleTotal.value === 0) {
    alert("Number People is empty o 0");
    return;
  }

  if (!!invoiceTotal.value && !!peopleTotal.value) {
    totalTip = ((+percentage / 100) * invoiceTotal.value) / peopleTotal.value;

    totalForPerson = invoiceTotal.value / peopleTotal.value + totalTip;
  }

  tipTotalAmount.innerText = `$ ${totalTip.toFixed(2)}`;
  tipTotalPerson.innerText = `$ ${totalForPerson.toFixed(2)}`;
};

const removeActiveClass = () => {
  for (let element of tipBtns) {
    if (element.className.includes("active")) {
      element.classList.remove("active");
    }
  }
};

const handleClick = (btn) => {
  calculateTip(btn.dataset.percent);

  if (!invoiceTotal.value || +invoiceTotal.value === 0) {
    return;
  }

  if (!peopleTotal.value || +peopleTotal.value === 0) {
    return;
  }

  btn.classList.toggle("active");
};

const tipCustom = () => {
  calculateTip(customPercent.value);
};

const reset = () => {
  removeActiveClass();
  invoiceTotal.value = 0;
  peopleTotal.value = 0;
  customPercent.value = null;
  tipTotalAmount.innerText = "$ 0";
  tipTotalPerson.innerText = "$ 0";
  [invoiceTotal, peopleTotal].forEach((e) => {
    const element = document.getElementById(`${e.id}-hint-text`);

    if (element) {
      element.remove();
    }

    e.classList.remove("error");
  });
};

const validTotal = (element) => {
  const hintText = document.getElementById(`${element.id}-hint-text`);

  if (+element.value === 0) {
    if (!hintText) {
      element.classList.add("error");
      element.insertAdjacentHTML(
        "afterend",
        `<div id="${element.id}-hint-text" class="hint-text">El campo no es v??lido</div>`
      );
    }
  } else {
    element.classList.remove("error");

    if (hintText) {
      hintText.remove();
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
["change", "keyup"].forEach((e) => {
  peopleTotal.addEventListener(e, validTotal.bind(null, peopleTotal));
  invoiceTotal.addEventListener(e, validTotal.bind(null, invoiceTotal));
});
