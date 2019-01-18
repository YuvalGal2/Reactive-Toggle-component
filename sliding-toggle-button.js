(function (window) {

  // global variables of the component itself.
  let toggleOffText = null;
  let toggleOnText = null;
  let stateSelected = null;
  let customPropertyName = null;
  let customPropertyValue = null;
  let customOffColor = null;
  let customOnColor = null;

  let index = null;

  //global variables for elementsRef
 
  let _selector_toggleElement = null;
  let _selector_toggleSelectorElement = null;
  let _selector_toggleOnElement = null;
  let _selector_toggleOffElement = null;
  
   getToggleOff = (toggle) =>  toggle.children[2];
   getToggleOn = (toggle) => toggle.children[1];
   getToggleSelector = (toggle) => toggle.children[0];
   getToggleOnText = (toggleOnRef) => toggleOnRef.innerText;
   getToggleOffText = (toggleOffRef) => toggleOffRef.innerText;
   getStateByToggle = (toggle) => toggle.getAttribute("state");
  

  module.exports.init = function (_toggleOffText = 'Off', _toggleOnText = 'On', _stateSelected = 0, _customPropertyName = null, _customPropertyValue = null, _index = 0, _customOffColor = '#888', _customOnColor =  '#1BB157') {
    if(_toggleOffText.length > 4 || _toggleOnText.length > 4){
      console.warn("Toggle: Please consider using Texts with no more then 4 letters for the state description \n or change the behavior of the component.");
    }
    if(_customOffColor.length < 3 || _customOnColor < 3){
      console.log("Toggle: its seems like you passing an invalid color to the init function of the component ")
    }
    // use the variable gotten from the init function in the global scope as well.
    toggleOnText = _toggleOnText
    toggleOffText = _toggleOffText;
    stateSelected = Number(_stateSelected);
    
    customOffColor = _customOffColor;
    customOnColor = _customOnColor;

    customPropertyName = _customPropertyName;
    customPropertyValue = _customPropertyValue;
    index = _index;
    // draw a div which acts as container and assign it the toggle warpper class
    let toggleWarpper = document.createElement("div");
    toggleWarpper.classList.add("toggle-warpper");
    // set the initial state of the container to the initial state that was passed
    // if got passed string by accident .. convert it to Number (anyway)
    toggleWarpper.setAttribute("state", Number(_stateSelected));

    // draw 3 more spans, 
    // the first on the the white square which use the animation.
    // the second one is the span who holds the on text of the button.
    // the third one is the span who hold the off text of the button.
    // by the way, both the on and the off are getting a class named "toggle-status"
    let selectorElement = document.createElement("span");
    selectorElement.classList.add("toggle-selector");
    let toggleOnElement = document.createElement("span");
    toggleOnElement.classList.add("toggle-on");
    toggleOnElement.classList.add("toggle-status");
    let toggleOffElement = document.createElement("span");
    toggleOffElement.classList.add("toggle-off");
    toggleOffElement.classList.add("toggle-status");

    // appending the newly created elements to the main element which is the 
    // toggle-warpper element.
    toggleWarpper.appendChild(selectorElement);
    toggleWarpper.appendChild(toggleOnElement);
    toggleWarpper.appendChild(toggleOffElement);

    // important : 
    // in order not to confuse the slider select each selector gets a data-index attr
    // and so its enables the user to run on the component in a loop. 
    // but make sure not to give same index to diffrent component when calling.
    selectorElement.setAttribute("data-index", index);

    // also important, each component can and must have, a custom property value which 
    // holds useful data about the component, this can get handy when actually needs to 
    // fetch the toggle value (if the user  clicked  the left side value of right side value)
    selectorElement.setAttribute(customPropertyName, customPropertyValue);

    // the fallowing lines just enable the component to get two diffrent status 
    // and not just 'Yes'/'No' or 'True'/'False' .. it can be used for everything.
    toggleOnElement.innerHTML = toggleOnText;
    toggleOffElement.innerHTML = toggleOffText;
    // more assignment to global variables...
    _selector_toggleElement = toggleWarpper;
    _selector_toggleSelectorElement = selectorElement;
    _selector_toggleOnElement = toggleOnElement;
    _selector_toggleOffElement = toggleOffElement;
    // the initaliztion process has been completed, now its the time to listen to clicks
    initHasFinished();
    // return the container to the view 
    return toggleWarpper;
  }

  function initHasFinished() {
    // on end of initilaztion of the component ...
    // for the first time this component is loaded there is a need to know 
    // which state to display.. maybe its coming from db and needs to be set up to true state...
    if (stateSelected === 1) {
      turnOn(_selector_toggleElement);
    }
    else {
      turnOff(_selector_toggleElement);
    }
    _selector_toggleElement.addEventListener("click", function () {
      onToggleClicked(this);
    })
  }

  const changeState = (currentState, offState, onState) => {
    switch (currentState) {
      // if got 0 (off return on, with the text of on state
      // if got 1 (on return off with the text of off state
      case 0:
        return [1, onState];
        break;
      case 1:
        return [0, offState];
        break;
    }
  };


  function turnOn(toggle) {
    if (toggle.children[0].classList.contains("is-selected")) {
      toggle.children[2].classList.remove('is-selected');
    }
    toggle.children[0].classList.add('is-selected');
    toggle.children[2].style.opacity = "0";
    toggle.children[1].style.opacity = "1";
    toggle.children[0].classList.add('toggle-selector-on');
    toggle.style.backgroundColor = customOnColor;
  }
  function turnOff(toggle) {
    toggle.children[2].classList.add('is-selected');
    toggle.children[1].classList.remove('is-selected');
    toggle.children[0].classList.remove('toggle-selector-on');
    toggle.children[1].style.opacity = "0";
    toggle.children[2].style.opacity = "1";
    toggle.style.backgroundColor = customOffColor;
  }



  // for each time the single component was clicked
  function onToggleClicked(toggle) {
    let toggleOff = getToggleOff(toggle);
    let toggleOn = getToggleOn(toggle);
 
    let _onText = getToggleOnText(toggleOn);
    let _offText = getToggleOffText(toggleOff);
    let state = getStateByToggle(toggle);
    let newState = changeState(Number(state), _offText, _onText);


    if (newState[0] != undefined) {
      if (newState[0] == 0) {
        // toggle the button off
        turnOff(toggle);
        toggle.setAttribute("state", 0);
      }
      else {
        // toggle the button on
        turnOn(toggle);
        toggle.setAttribute("state", 1);
      }
    }
    else {
      console.error("error changeing state of toggle select..");
    }
  }
  // This component was made by Yuval Gal 
  // Linkedin : https://www.linkedin.com/in/yuval-gal-88540912b
  // Feel free to improve it :)

})(window)
