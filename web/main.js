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

AFRAME.registerComponent("screen-controls", {
  init: function () {
    this.component =
      document.getElementById("camera").components["extended-wasd-controls"];
    this.joystick1 = new Joystick("stick1", 64, 8);
    this.joystick2 = new Joystick("stick2", 64, 8);
  },

  tick: function (time, deltaTime) {
    this.component.movePercent.x = this.joystick1.value.x;
    this.component.movePercent.z = -this.joystick1.value.y;
    this.component.rotatePercent.x = -this.joystick2.value.y;
    this.component.rotatePercent.y = -this.joystick2.value.x;
  },
});
