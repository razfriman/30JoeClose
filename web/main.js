import "./style.css";

function haltEvent(event) {
  event.preventDefault && event.preventDefault();
  event.stopPropagation && event.stopPropagation();
  event.cancelBubble = true;
  event.returnValue = false;
  return false;
}

// prevent right-click menus from appearing
document.addEventListener("contextmenu", haltEvent);
// more attempts to prevent right-click menus from appearing -- avoid; they block touchscreen/iPad controls
// document.addEventListener("touchmove", haltEvent );
// document.addEventListener("touchcancel", haltEvent );

// add events for both touch and mouse controls
function addButtonEventListeners(buttonElementID, startFunction, endFunction) {
  let element = document.getElementById(buttonElementID);
  element.addEventListener("touchstart", startFunction);
  element.addEventListener("mousedown", startFunction);
  element.addEventListener("touchend", endFunction);
  element.addEventListener("mouseup", endFunction);
}

function associateMovementControls(buttonElementID, component, keyName) {
  addButtonEventListeners(
    buttonElementID,
    function (event) {
      component.registerKeyDown(keyName);
      return haltEvent(event);
    },
    function (event) {
      component.registerKeyUp(keyName);
      return haltEvent(event);
    }
  );
}

// need to run javascript code after a-scene entities and components are loaded
AFRAME.registerComponent("screen-controls", {
  init: function () {
    let component =
      document.getElementById("camera").components["extended-wasd-controls"];

    associateMovementControls(
      "buttonMoveForward",
      component,
      component.data.moveForwardKey
    );
    associateMovementControls(
      "buttonMoveBackward",
      component,
      component.data.moveBackwardKey
    );
    associateMovementControls(
      "buttonMoveLeft",
      component,
      component.data.moveLeftKey
    );
    associateMovementControls(
      "buttonMoveRight",
      component,
      component.data.moveRightKey
    );
    associateMovementControls(
      "buttonMoveUp",
      component,
      component.data.moveUpKey
    );
    associateMovementControls(
      "buttonMoveDown",
      component,
      component.data.moveDownKey
    );
  },

  tick: function (time, deltaTime) {},
});
