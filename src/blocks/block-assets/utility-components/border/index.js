import React, { Component } from "react";
import { __ } from "@wordpress/i18n";
import { ColorPalette } from "@wordpress/block-editor";
import { RangeControl, SelectControl } from "@wordpress/components";
import Dimension from "../dimension";
class Border extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUnit: "px",
      borderStyle: "",
      borderWidth: "",
      borderWidthLink: true,
      borderColor: "",
      borderRadius: "",
      borderRadiusLink: true,
    };
  }
  componentDidMount() {
    // console.log("props -> ", this.props);
    if (this.props.value) {
      let {
        allUnit,
        borderStyle,
        borderWidth,
        borderColor,
        borderRadius,
        borderWidthLink,
        borderRadiusLink,
      } = this.props.value;

      let setStateObj = {};
      let checkB = false;
      if (borderStyle) {
        setStateObj["borderStyle"] = borderStyle;
        checkB = true;
      }
      if (borderWidth) {
        setStateObj["borderWidth"] = borderWidth;
        checkB = true;
      }
      if (borderWidthLink != "undefined") {
        setStateObj["borderWidthLink"] = borderWidthLink;
        checkB = true;
      }
      if (borderColor) {
        setStateObj["borderColor"] = borderColor;
        checkB = true;
      }
      if (borderRadius) {
        setStateObj["borderRadius"] = borderRadius;
        checkB = true;
      }
      if (borderRadiusLink != "undefined") {
        setStateObj["borderRadiusLink"] = borderRadiusLink;
        checkB = true;
      }

      // console.log("setStateObj", setStateObj);

      if (checkB) {
        this.setState(setStateObj);
      }
    }
  }
  updateState(stateKey, stateVal) {
    let obj_ = {};
    obj_[stateKey] = stateVal;
    this.setState(obj_);
    let state_ = {
      borderStyle: this.state.borderStyle,
      borderWidth: this.state.borderWidth,
      borderWidthLink: this.state.borderWidthLink,
      borderColor: this.state.borderColor,
      borderRadius: this.state.borderRadius,
      borderRadiusLink: this.state.borderRadiusLink,
      ...obj_,
    };

    // console.log("change me ", state_);

    this.props.changeme(state_);
  }
  render() {
    // console.log("state->", this.state);

    let defaultWidth = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    let borderWidth = this.state.borderWidth + "";
    if (borderWidth && borderWidth.indexOf("px") > 0) {
      let checkDimensionWidth = this.state.borderWidth.split(" ");
      if (checkDimensionWidth.length > 1) {
        let copyAr = Object.keys({ ...defaultWidth });
        checkDimensionWidth.map((val_, key_) => {
          defaultWidth[copyAr[key_]] = parseInt(val_);
        });
      } else {
        let width = parseInt(borderWidth);
        defaultWidth = {
          top: width,
          right: width,
          bottom: width,
          left: width,
        };
      }
    } else if (borderWidth) {
      let width = parseInt(borderWidth);
      defaultWidth = {
        top: width,
        right: width,
        bottom: width,
        left: width,
      };
    }

    let defaultRadius = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    let borderRadius = this.state.borderRadius + "";
    if (borderRadius && borderRadius.indexOf("px") > 0) {
      let checkDimensionWidth = this.state.borderRadius.split(" ");
      if (checkDimensionWidth.length > 1) {
        let copyAr = Object.keys({ ...defaultRadius });
        checkDimensionWidth.map((val_, key_) => {
          defaultRadius[copyAr[key_]] = parseInt(val_);
        });
      } else {
        let width = parseInt(borderRadius);
        defaultRadius = {
          top: width,
          right: width,
          bottom: width,
          left: width,
        };
      }
    } else if (borderRadius) {
      let width = parseInt(borderRadius);
      defaultRadius = {
        top: width,
        right: width,
        bottom: width,
        left: width,
      };
    }
    // console.log("defaultWidth->", defaultWidth);
    // console.log("defaultRadius->", defaultRadius);

    return (
      <div className="icon-border-setting">
        <label className="label_">
          {__("Border Style", "unlimited-blocks")}
        </label>
        <div className="ubl-multiple-select">
          <SelectControl
            // label={__("Border Style", "unlimited-blocks")}
            value={this.state.borderStyle}
            onChange={(choosen) => {
              this.updateState("borderStyle", choosen);
            }}
            options={[
              {
                value: "solid",
                label: __("Solid", "unlimited-blocks"),
              },
              {
                value: "dotted",
                label: __("Dotted", "unlimited-blocks"),
              },
              {
                value: "dashed",
                label: __("Dashed", "unlimited-blocks"),
              },
            ]}
          />
        </div>
        <label className="label_">
          {__("Border Width", "unlimited-blocks")}
        </label>
        <Dimension
          value={defaultWidth}
          isLink={this.state.borderWidthLink}
          changeme={(val_) => {
            let copyVal = { ...val_ };
            if ("isLink" in copyVal) {
              this.updateState("borderWidthLink", copyVal.isLink);
              delete copyVal["isLink"];
            }
            let Obj = Object.values(copyVal);
            if (Obj.length) {
              let Width = "";
              if (this.state.borderWidthLink) {
                Width = Obj[0];
              } else {
                Width += Obj.join("px ");
              }
              Width = Width + this.state.allUnit;
              this.updateState("borderWidth", Width);
            }
          }}
        />
        <label className="label_">{__("Color", "unlimited-blocks")}</label>

        <ColorPalette
          value={this.state.borderColor}
          onChange={(color) => this.updateState("borderColor", color)}
        />
        <label className="label_">
          {__("Border Radius", "unlimited-blocks")}
        </label>
        <Dimension
          value={defaultRadius}
          isLink={this.state.borderRadiusLink}
          changeme={(val_) => {
            let copyVal = { ...val_ };
            if ("isLink" in copyVal) {
              this.updateState("borderRadiusLink", copyVal.isLink);
              delete copyVal["isLink"];
            }
            let Obj = Object.values(copyVal);
            if (Obj.length) {
              let Radius = "";
              if (this.state.borderRadiusLink) {
                Radius = Obj[0];
              } else {
                Radius += Obj.join("px ");
              }
              Radius = Radius + this.state.allUnit;
              this.updateState("borderRadius", Radius);
            }
          }}
        />
      </div>
    );
  }
}

export default Border;
{
  /* <Border
    allUnit= "px"
      borderStyle= ""
      borderWidth= ""
      borderWidthLink= {true}
      borderColor= ""
      borderRadius= ""
      borderRadiusLink= {true}
      changeme={(e)=>{
          
      }}
 /> */
}
