import React, { Component } from "react";
import { __ } from "@wordpress/i18n";
import { ColorPalette } from "@wordpress/block-editor";
import {
  ToggleControl,
  ColorPicker,
  Button,
  RangeControl,
  Popover,
} from "@wordpress/components";

class Boxshadow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopOver: false,
    };
  }
  updateProp(propsKey, propVal) {
    let obj_ = {};
    obj_[propsKey] = propVal;
    this.props.changeme(obj_);
  }

  toggleBtn = () => {
    return (
      <div className="shadow-border-title">
        <span>
          <strong>{__("Border Shadow", "unlimited-blocks")}</strong>
        </span>
        <div className="ButtonPopup">
          <Button
            variant="secondary"
            className="shadow-enable-btn"
            onClick={() => {
              if (!this.state.showPopOver) {
                this.setState({ showPopOver: true });
              } else {
                this.setState({ showPopOver: false });
              }
            }}
          >
            <span class="dashicon dashicons dashicons-admin-settings"></span>
          </Button>
          {this.state.showPopOver && this.popupOver()}
        </div>
      </div>
    );
  };

  popupOver() {
    let { shadowOffsetX, shadowOffsetY, shadowBlur, shadowSpread } = this.props;
    return (
      <Popover
        position="right top"
        onFocusOutside={(outs) => {
          if (this.state.showPopOver) {
            this.setState({ showPopOver: false });
          }
        }}
        className={"ul-box-shadow-popup"}
      >
        <div className="container_">
          {/* x direction  */}
          <div className="range-and-title">
            <p className="title-inline">
              <strong>{__("Horizontal", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              value={shadowOffsetX}
              min={0}
              max={20}
              onChange={(e) => {
                this.updateProp("shadowOffsetX", e);
              }}
            />
          </div>
          {/* ---------------------------------------------------------------------- */}
          <div className="range-and-title">
            <p className="title-inline">
              <strong>{__("Verticle", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              value={shadowOffsetY}
              min={0}
              max={20}
              onChange={(e) => {
                this.updateProp("shadowOffsetY", e);
              }}
            />
          </div>
          <div className="range-and-title">
            <p className="title-inline">
              <strong>{__("Blur", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              value={shadowBlur}
              min={0}
              max={20}
              onChange={(e) => {
                this.updateProp("shadowBlur", e);
              }}
            />
          </div>
          <div className="range-and-title">
            <p className="title-inline">
              <strong>{__("Spread", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              value={shadowSpread}
              min={0}
              max={20}
              onChange={(e) => {
                this.updateProp("shadowSpread", e);
              }}
            />
          </div>
          {/* ---------------------------------------------------------------------- */}
        </div>
      </Popover>
    );
  }

  render() {
    let { shadowEnable, shadowColor } = this.props;

    // console.log("shadow props", this.props);

    return (
      <div className="box-shadow-wrapper">
        <ToggleControl
          label={
            shadowEnable
              ? __("Enable", "unlimited-blocks")
              : __("Disable", "unlimited-blocks")
          }
          checked={shadowEnable}
          onChange={(e) => {
            this.updateProp("shadowEnable", e);
          }}
        />

        {shadowEnable && (
          <div className="settings_">
            {this.toggleBtn()}
            <ColorPalette
              value={shadowColor}
              onChange={(color) => this.updateProp("shadowColor", color)}
            />
            {/* <ColorPicker
              color={shadowColor}
              onChangeComplete={(colorBg) => {
                let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                this.updateProp("shadowColor", color);
              }}
            /> */}
          </div>
        )}
      </div>
    );
  }
}

export default Boxshadow;
