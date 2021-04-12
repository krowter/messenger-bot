const displayName = "You";

const input = document.getElementById("messenger__user-input");
const row = document.getElementById("messenger__row");
const userName = document.getElementById("messenger__cwd");
const main = document.getElementById("messenger__terminal");


class Messenger {
  constructor() {
    this.event = "";

    //setup the terminal
    input.focus();
    userName.textContent = displayName;

    document.addEventListener("keydown", this.keydownEventHandler);

    //click anywhere to return keyboard focus
    document.addEventListener("click", () => {
      input.focus();
    });
  }

  keydownEventHandler = ({ key }) => {
    if (key === "Enter") {
      printTextOnTerminal(main, userName.textContent + " " + input.value);
      main.removeChild(row);
    }
  };
}
new Messenger();
