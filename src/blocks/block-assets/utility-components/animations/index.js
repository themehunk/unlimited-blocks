import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import {
  animations as AnimationsClass,
  AnimationDelay_,
  AnimationSpeed_,
} from "./animateclasses";
export class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: { name: null, delay: null, speed: null },
    };
  }
  componentDidMount() {
    let { value } = this.props;
    if (
      value &&
      typeof value == "object" &&
      !Array.isArray(value) &&
      "name" in value
    ) {
      let setobj = { name: value.name };
      if (value.delay) {
        setobj["delay"] = value.delay;
      }
      if (value.speed) {
        setobj["speed"] = value.speed;
      }
      this.setState({ animation: setobj });
    }
  }
  changeVal(stateKey, stateVal) {
    let stateWoutCopyAnim = this.state.animation;
    if (!stateWoutCopyAnim) {
      stateWoutCopyAnim = {};
    }
    let copyStateAnim = { ...stateWoutCopyAnim };
    copyStateAnim[stateKey] = stateVal == "none" ? null : stateVal;
    this.setState({ animation: copyStateAnim });
    // ex ->  animate__animated animate__bounce animate__delay-2s
    this.props.change(copyStateAnim);
  }
  allAnimations = () => {
    let allAnimations = AnimationsClass;
    let thisAnimation = this.state.animation.name;
    const classNandTitle = (val) => {
      return val.map((val2) => {
        return (
          <option
            value={val2.anim_class}
            selected={thisAnimation == val2.anim_class ? "selected" : null}
          >
            {val2.title}
          </option>
        );
      });
    };

    return (
      <select
        onChange={(e) => {
          this.changeVal("name", e.target.value);
        }}
      >
        <option value="none">None</option>
        {allAnimations.map((val_) => (
          <optgroup label={val_.title}>{classNandTitle(val_.value)}</optgroup>
        ))}
      </select>
    );
  };
  animationsDelay = () => {
    let allDelay = AnimationDelay_;
    let thisAnimDelay = this.state.animation.delay;
    return (
      <select
        onChange={(e) => {
          this.changeVal("delay", e.target.value);
        }}
      >
        <option value="none">Default</option>
        {allDelay.map((val_) => (
          <option
            value={val_.anim_class}
            selected={thisAnimDelay == val_.anim_class ? "selected" : null}
          >
            {val_.title}
          </option>
        ))}
      </select>
    );
  };
  animationsSpeed = () => {
    let allSpeed = AnimationSpeed_;
    let thisAnimSpeed = this.state.animation.speed;
    return (
      <select
        onChange={(e) => {
          this.changeVal("speed", e.target.value);
        }}
      >
        <option value="none">Default</option>
        {allSpeed.map((val_) => (
          <option
            value={val_.anim_class}
            selected={thisAnimSpeed == val_.anim_class ? "selected" : null}
          >
            {val_.title}
          </option>
        ))}
      </select>
    );
  };

  render() {
    let { state } = this;
    return (
      <div className="ul-animation-tool">
        <div className="ul-animation-name">
          <p className="title_">{__("Name", "unlimited-blocks")}</p>
          {this.allAnimations()}
        </div>
        {state.animation.name && (
          <>
            <div className="ul-animation-delay">
              <p className="title_">{__("Delay", "unlimited-blocks")}</p>
              {this.animationsDelay()}
            </div>
            <div className="ul-animation-speed">
              <p className="title_">{__("Speed", "unlimited-blocks")}</p>
              {this.animationsSpeed()}
            </div>
          </>
        )}
      </div>
    );
  }
}

// export Animations;
export let setAnimationClass = (cssObj, existClass = false) => {
  let returnString = "";
  if (
    cssObj &&
    typeof cssObj == "object" &&
    !Array.isArray(cssObj) &&
    "name" in cssObj
  ) {
    let returnClass = ["animate__animated"];
    returnClass.push(cssObj.name);
    // delay
    if (cssObj.delay) {
      returnClass.push(cssObj.delay);
    }
    // speed
    if (cssObj.speed) {
      returnClass.push(cssObj.speed);
    }
    // delay
    if (existClass) {
      returnClass.push(existClass);
    }
    returnString = returnClass.join(" ");
  } else if (existClass) {
    returnString = existClass;
  }
  return returnString;
};
{
  /* <Animation
              value={attributes.additionalClassNames}
              change={(animate) => {
                setAttributes({ additionalClassNames: animate });
              }}
            /> */
}
