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
      animationTitle: false,
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
      let setObje = { animation: setobj };
      let getTitle = this.getDefaultTitle(value.name);
      if (getTitle) {
        setObje["animationTitle"] = getTitle;
      }
      this.setState(setObje);
    }
  }

  getDefaultTitle = (value_) => {
    let getAnimation = [...AnimationsClass];
    const checkPointOne_ = (mainArray) => {
      let stageTwo = false;
      for (let stageTwoFil of mainArray) {
        if (stageTwoFil.anim_class == value_) {
          stageTwo = stageTwoFil.title;
          break;
        }
      }
      return stageTwo;
    };
    let title = false;
    for (let stageOne of getAnimation) {
      let stageTwo = checkPointOne_(stageOne.value);
      if (stageTwo) {
        title = stageTwo;
        break;
      }
    }
    return title;
  };

  changeVal(stateKey, stateVal) {
    let stateWoutCopyAnim = this.state.animation;
    if (!stateWoutCopyAnim) {
      stateWoutCopyAnim = {};
    }
    let copyStateAnim = { ...stateWoutCopyAnim };
    copyStateAnim[stateKey] = stateVal == "none" ? null : stateVal;
    this.setState({ animation: copyStateAnim });
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
        <option value="none">{__("Default", "unlimited-blocks")}</option>
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
        <option value="none">{__("Default", "unlimited-blocks")}</option>
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
    const chooseAnimation = (animClass, title_) => {
      this.changeVal("name", animClass);
      this.setState({ showPopOver: false, animationTitle: title_ });
    };
    const classNandTitle = (val) => {
      return val.map((val2) => {
        let isActive = val2.anim_class == thisAnimation ? true : false;
        return (
          <MenuItem
            onClick={() => {
              chooseAnimation(val2.anim_class, val2.title);
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
        {allAnimations ? (
          <>
            <MenuItem
              onClick={() => {
                chooseAnimation("none", false);
              }}
            >
              {__("None", "unlimited-blocks")}
            </MenuItem>
            {allAnimations.map((val_) => {
              return (
                <>
                  {val_.title && (
                    <strong className="animationHeading">{val_.title}</strong>
                  )}
                  {classNandTitle(val_.value)}
                </>
              );
            })}
          </>
        ) : (
          <div className="no_animation_found">
            <span>{__("No Animation Found", "unlinited-blocks")}</span>
          </div>
        )}
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
          <strong className="search-wrap_heading">
            {__("Animations", "unlimited-blocks")}
          </strong>
          <input
            type="text"
            onKeyUp={(e) => {
              this.searchAnimation(e.target.value);
            }}
          />
        </div>
        {this.allAnimations()}
      </Popover>
    );
  };
  searchAnimation = (val) => {
    if (val != "") {
      let lowerValue = val.toLowerCase();
      let getAnimation = [...AnimationsClass];
      const checkPointOne = (mainArray) => {
        let stageTwo = [];
        for (let stageTwoFil of mainArray) {
          if (stageTwoFil.title) {
            let chunkArrayTitle = stageTwoFil.title.toLowerCase();
            let getIndex = chunkArrayTitle.indexOf(lowerValue);
            if (getIndex >= 0) {
              stageTwo.push(stageTwoFil);
            }
          }
        }
        if (stageTwo.length) {
          return stageTwo;
        }
      };
      let newAnimation = [];
      for (let stageOne of getAnimation) {
        let stageTwo = checkPointOne(stageOne.value);
        if (stageTwo) newAnimation.push({ value: stageTwo });
      }

      if (newAnimation.length) {
        this.setState({ allAnimation: newAnimation });
      } else {
        // set animations not available
        this.setState({ allAnimation: false });
      }
    } else {
      // set original animations
      this.setState({ allAnimation: AnimationsClass });
    }
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
            {state.animationTitle
              ? state.animationTitle
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
            /> 
    added classes
    // ex ->  animate__animated animate__bounce animate__delay-2s
            
            */
}

// const { hasChildBlocks, rootClientId } = useSelect(
//   (select) => {
//     const { getBlockOrder, getBlockRootClientId } = select(blockEditorStore);

//     return {
//       hasChildBlocks: getBlockOrder(clientId).length > 0,
//       rootClientId: getBlockRootClientId(clientId),
//     };
//   },
//   [clientId]
// );
