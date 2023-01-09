import "./style.css";

function haltEvent(event) {
  event.preventDefault && event.preventDefault();
  event.stopPropagation && event.stopPropagation();
  event.cancelBubble = true;
  event.returnValue = false;
  return false;
}
document.addEventListener("contextmenu", haltEvent);
document.addEventListener("touchmove", haltEvent);
document.addEventListener("touchcancel", haltEvent);

if (/Android|iPhone/i.test(navigator.userAgent)) {
  for (const e of document.getElementsByClassName("desktop")) {
    e.remove();
  }
} else {
  for (const e of document.getElementsByClassName("mobile")) {
    e.remove();
  }
}
