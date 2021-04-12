const displayName = "You";

const input = document.getElementById("messenger__user-input");
const row = document.getElementById("messenger__row");
const userName = document.getElementById("messenger__cwd");
const main = document.getElementById("messenger__terminal");

const socket = io();

class Messenger {
  constructor(socket) {
    this.socket = socket;
    this.event = "";

    socket.on("bot-event", (arg) => {
      printTextOnTerminal(main, arg.message);
      main.appendChild(row);
      this.event = arg.userResponseEvent;
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
    console.log(this.event);
    if (key === "Enter") {
      printTextOnTerminal(main, userName.textContent + " " + input.value);
      main.removeChild(row);

      socket.emit(this.event, input.value);
    }
  };
}
new Messenger(socket);
