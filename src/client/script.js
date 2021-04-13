const displayName = "You";

const input = document.getElementById("messenger__user-input");
const row = document.getElementById("messenger__row");
const userName = document.getElementById("messenger__cwd");
const main = document.getElementById("messenger__terminal");
const loadingIndicator = document.getElementById("messenger__loading");

const socket = io();

class Messenger {
  constructor(socket) {
    this.socket = socket;
    this.nextEvent = "";

    socket.on("bot-event", (arg) => {
      main.removeChild(loadingIndicator);
      this.nextEvent = arg.nextEvent;

      this.printTextOnTerminal(main, arg.message, arg.botName);
      main.appendChild(row);
      input.value = "";
      input.focus();
    });

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
      this.printTextOnTerminal(main, input.value, userName.textContent);
      main.removeChild(row);

      socket.emit(this.nextEvent, input.value);
      main.appendChild(loadingIndicator);
    }
  };

  printTextOnTerminal = (terminal, text, user) => {
    const rowString = document.createElement("div");
    rowString.textContent += user + " : " + text;
    terminal.appendChild(rowString);
  };
}

new Messenger(socket);
