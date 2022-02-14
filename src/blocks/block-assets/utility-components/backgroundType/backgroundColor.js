import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { ColorPalette } from "@wordpress/block-editor";
import { GradientPicker } from "@wordpress/components";
import { UBLGraDientColors } from "./../../post-functions";
class BackgroundColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   backgroundType: "",
      //   backgroundImage: "",
      //   backgroundImageSize: "",
      backgroundColorType: "color",
      backgroundColor: "",
      backgroundImageGradient: "",
      backgroundOpacity: "",
      title: "Background Color",
    };
  }
  componentDidMount() {
    // console.log("props BackgroundColor -> ", this.props);
    if (this.props.value) {
      let {
        // backgroundType,
        backgroundColorType,
        backgroundColor,
        backgroundImageGradient,
        backgroundOpacity,
        title,
      } = this.props.value;

      let setStateObj = {};
      let checkB = false;
      //   if (backgroundType) {
      //     setStateObj["backgroundType"] = backgroundType;
      //     checkB = true;
      //   }
      if (backgroundColorType) {
        setStateObj["backgroundColorType"] = backgroundColorType;
        checkB = true;
      }
      if (backgroundColor) {
        setStateObj["backgroundColor"] = backgroundColor;
        checkB = true;
      }
      if (backgroundImageGradient) {
        setStateObj["backgroundImageGradient"] = backgroundImageGradient;
        checkB = true;
      }
      if (backgroundOpacity) {
        setStateObj["backgroundOpacity"] = backgroundOpacity;
        checkB = true;
      }
      if (title && title == "") {
        setStateObj["title"] = title;
      }
      if (checkB) {
        this.setState(setStateObj);
      }
    }
  }
  //   set state of bg type
  updateState(stateKey, stateVal) {
    let obj_ = {};
    obj_[stateKey] = stateVal;
    this.setState(obj_);
    let state_ = {
      //   backgroundType: this.state.backgroundType,
      backgroundColorType: this.state.backgroundColorType,
      backgroundColor: this.state.backgroundColor,
      backgroundImageGradient: this.state.backgroundImageGradient,
      backgroundOpacity: this.state.backgroundOpacity,
      ...obj_,
    };
    this.props.changeme(state_);
  }

  colorGradient() {
    return (
      <>
        <p>
          <strong>{__(this.state.title, "unlimited-blocks")}</strong>
        </p>
        <div
          class={`ubl-switcher-bg-clr-gradient clor_${this.state.backgroundColorType}`}
        >
          <span className="bg-span"></span>
          <span
            onClick={() => this.updateState("backgroundColorType", "color")}
            className={
              this.state.backgroundColorType == "color" ? "selected" : ""
            }
          >
            {__("Solid", "unlimited-blocks")}
          </span>
          <span
            onClick={() => this.updateState("backgroundColorType", "gradient")}
            className={
              this.state.backgroundColorType == "gradient" ? "selected" : ""
            }
          >
            {__("Gradient", "unlimited-blocks")}
          </span>
        </div>

        {"color" == this.state.backgroundColorType ? (
          <>
            <ColorPalette
              value={this.state.backgroundColor}
              // colors={UblColorPlates}
              onChange={(color) => {
                this.updateState("backgroundColor", color);
              }}
            />
          </>
        ) : (
          <GradientPicker
            disableCustomGradients={false}
            value={this.state.backgroundImageGradient}
            gradients={UBLGraDientColors}
            onChange={(newGradient) => {
              this.updateState("backgroundImageGradient", newGradient);
            }}
          />
        )}
        {/* {this.state.backgroundType == "image" && (
          <RangeControl
            label={__("Opacity", "unlimited-blocks")}
            value={this.state.backgroundOpacity}
            min={0}
            max={1}
            step={0.1}
            onChange={(e) => {
              this.updateState("backgroundOpacity", e);
            }}
          />
        )} */}
      </>
    );
  }
  render() {
    return <>{this.colorGradient()}</>;
  }
}
export default BackgroundColor;
{
  /* <BackgroundType changeme={(object_)=>{

}}/> */
}
