import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { Button, Popover, MenuGroup, MenuItem } from "@wordpress/components";

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
      allAnimation: AnimationsClass,
      showPopOver: false,
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
  allAnimations = () => {
    let allAnimations = this.state.allAnimation;
    let thisAnimation = this.state.animation.name;
    const chooseAnimation = (animClass) => {
      this.changeVal("name", animClass);
      this.setState({ showPopOver: false });
    };
    const classNandTitle = (val) => {
      return val.map((val2) => {
        let isActive = val2.anim_class == thisAnimation ? true : false;
        return (
          <MenuItem
            onClick={() => {
              chooseAnimation(val2.anim_class);
            }}
            icon={isActive ? "yes" : false}
          >
            {val2.title}
          </MenuItem>
        );
      });
    };
    return (
      <MenuGroup>
        <MenuItem
          onClick={() => {
            chooseAnimation("none");
          }}
        >
          {__("None", "unlimited-blocks")}
        </MenuItem>
        {allAnimations.map((val_) => {
          return (
            <>
              <strong className="animationHeading">{val_.title}</strong>
              {classNandTitle(val_.value)}
            </>
          );
        })}
      </MenuGroup>
    );
  };
  animationInPopup = () => {
    return (
      <Popover
        position="top middle"
        onFocusOutside={(outs) => {
          if (this.state.showPopOver) {
            this.setState({ showPopOver: false });
          }
        }}
        className={"ul-animation-popup"}
      >
        <div className="search-wrap_">
          <strong>{__("Animations", "unlimited-blocks")}</strong>
          <input type="text" />
        </div>
        {this.allAnimations()}
      </Popover>
    );
  };
  render() {
    let { state } = this;
    return (
      <div className="ul-animation-tool">
        <div>
          <p className="anim_title_">{__("Animation", "unlimited-blocks")}</p>
          <Button
            variant="secondary"
            className="ul-animation-tool-toggle-btn"
            onClick={() => {
              if (!this.state.showPopOver) {
                this.setState({ showPopOver: true });
              } else {
                this.setState({ showPopOver: false });
              }
            }}
          >
            {state.animation.name
              ? state.animation.name
              : __("Choose Animation", "unlimited-blocks")}
          </Button>
          {this.state.showPopOver && this.animationInPopup()}
        </div>
        {state.animation.name && (
          <>
            <div className="ul-animation-delay">
              <p className="anim_title_">{__("Delay", "unlimited-blocks")}</p>
              {this.animationsDelay()}
            </div>
            <div className="ul-animation-speed">
              <p className="anim_title_">{__("Speed", "unlimited-blocks")}</p>
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
