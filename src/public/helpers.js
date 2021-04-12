const printTextOnTerminal = (terminal, text) => {
  const rowString = document.createElement("div");
  rowString.textContent += text;
  terminal.appendChild(rowString);
};
