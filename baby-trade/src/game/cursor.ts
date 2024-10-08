
const cursor = document.querySelector(".cursor") as HTMLDivElement;

let cursorX = 0;
let cursorY = 0;
let cursorClicked = false;

interface Cursors {
  [key: string]: string;
}

let cursors: Cursors = {
  "default": "/src/assets/cursor.png",
  "pointer": "/src/assets/cursor_pointer.png"
};

function setCursor(cursorType: string) {
  if(cursorType === "pointer") {
    cursor.style.left = "-100px";
  }
  cursor.style.backgroundImage = `url(${cursors[cursorType]})`;
}

document.addEventListener("DOMContentLoaded", () => {
  setCursor("default");
});

// cursor detection/movement

document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursor.style.top = `${cursorY}px`;
  cursor.style.left = `${cursorX}px`;
});


document.addEventListener("mousedown", () => {
  cursorClicked = true;
});

document.addEventListener("mouseup", () => {
  cursorClicked = false;
});

document.onload = () => {
  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("mouseover", () => {
      setCursor("pointer");
    });
    el.addEventListener("mouseout", () => {
      setCursor("default");
    });
  });
}

// check for new elements
setInterval(() => {
  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("mouseover", () => {
      setCursor("pointer");
    });
    el.addEventListener("mouseout", () => {
      setCursor("default");
    });
  });
}, 1000);