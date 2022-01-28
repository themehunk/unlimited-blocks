import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { MediaUpload, ColorPalette } from "@wordpress/block-editor";
import { GradientPicker, RangeControl } from "@wordpress/components";
import { UBLGraDientColors, UblColorPlates } from "./../../post-functions";
class BackgroundType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundType: "",
      backgroundImage: "",
      backgroundImageSize: "",
      backgroundColorType: "color",
      backgroundColor: "",
      backgroundImageGradient: "",
      backgroundOpacity: "",
    };
  }
  componentDidMount() {
    // console.log("props -> ", this.props);
    if (this.props.value) {
      let {
        backgroundType,
        backgroundImage,
        backgroundImageSize,
        backgroundColorType,
        backgroundColor,
        backgroundImageGradient,
        backgroundOpacity,
      } = this.props.value;

      let setStateObj = {};
      let checkB = false;
      if (backgroundType) {
        setStateObj["backgroundType"] = backgroundType;
        checkB = true;
      }
      if (backgroundImage) {
        setStateObj["backgroundImage"] = backgroundImage;
        checkB = true;
      }
      if (backgroundImageSize) {
        setStateObj["backgroundImageSize"] = backgroundImageSize;
        checkB = true;
      }
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
      backgroundType: this.state.backgroundType,
      backgroundImage: this.state.backgroundImage,
      backgroundImageSize: this.state.backgroundImageSize,
      backgroundColorType: this.state.backgroundColorType,
      backgroundColor: this.state.backgroundColor,
      backgroundImageGradient: this.state.backgroundImageGradient,
      backgroundOpacity: this.state.backgroundOpacity,
      ...obj_,
    };

    this.props.changeme(state_);
  }

  navType() {
    return (
      <div className="ubl-background-type">
        <span className="top-title">
          {__("Background Type", "unlimited-blocks")}
        </span>
        <div className="types_">
          <div
            data-title={__("None", "unlimited-blocks")}
            className={`${!this.state.backgroundType ? "selected" : ""}`}
          >
            <span
              className={`buttons_ dashicons dashicons-dismiss`}
              onClick={() => {
                this.updateState("backgroundType", "");
              }}
            ></span>
          </div>
          <div
            data-title={__("Color", "unlimited-blocks")}
            className={`${
              this.state.backgroundType == "color" ? "selected" : ""
            }`}
          >
            <span
              className={`buttons_ dashicons dashicons-admin-customizer`}
              onClick={() => {
                this.updateState("backgroundType", "color");
              }}
            ></span>
          </div>
          <div
            data-title={__("Image", "unlimited-blocks")}
            className={`${
              this.state.backgroundType == "image" ? "selected" : ""
            }`}
          >
            <span
              className={`buttons_ dashicons dashicons-format-image `}
              onClick={() => {
                this.updateState("backgroundType", "image");
              }}
            ></span>
          </div>
        </div>
      </div>
    );
  }
  bgImage() {
    return (
      <>
        <p>
          <strong>{__("Background image", "unlimited-blocks")}</strong>
        </p>
        <MediaUpload
          allowedType="image"
          onSelect={(newImage) => {
            console.log("newImage", newImage);
            this.updateState("backgroundImage", newImage.sizes.full.url);
          }}
          value={this.state.backgroundImage}
          render={({ open }) => (
            <div
              onClick={open}
              className={`ubl-block-image-uploader ${
                "" == this.state.backgroundImage && "blank"
              }`}
            >
              <div>
                <i className="fas fa-plus"></i>
              </div>
              <img src={this.state.backgroundImage} />
            </div>
          )}
        />
        {this.state.backgroundImage != "" && (
          <div className="flex-section">
            <p>{__("Background Size", "unlimited-blocks")}</p>
            <select
              value={this.state.backgroundImageSize}
              onChange={(e) => {
                this.updateState("backgroundImageSize", e.target.value);
              }}
            >
              <option value="auto">{__("Auto", "unlimited-blocks")}</option>
              <option value="cover">{__("Cover", "unlimited-blocks")}</option>
              <option value="contain">
                {__("Contain", "unlimited-blocks")}
              </option>
            </select>
          </div>
        )}
      </>
    );
  }
  colorGradient() {
    return (
      <>
        <p>
          <strong>
            {this.state.backgroundType == "image" &&
            this.state.backgroundImage != ""
              ? __("Overlay Color", "unlimited-blocks")
              : __("Background Color", "unlimited-blocks")}
          </strong>
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
              // console.log("new gradient->", newGradient);

              this.updateState("backgroundImageGradient", newGradient);
            }}
          />
        )}
        {this.state.backgroundType == "image" && (
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
        )}
      </>
    );
  }
  render() {
    return (
      <>
        {this.navType()}
        {this.state.backgroundType == "image" && this.bgImage()}
        {(this.state.backgroundType == "image" ||
          this.state.backgroundType == "color") &&
          this.colorGradient()}
      </>
    );
  }
}
export default BackgroundType;
{
  /* <BackgroundType changeme={(object_)=>{

}}/> */
}
