import {
  RichText,
  InspectorControls,
  ColorPalette,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  ColorPicker,
  __experimentalGradientPicker as GradientPicker,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import cloneDeep from "clone-deep";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("this test props", this.props);

    const { attributes, setAttributes } = this.props;
    let { title } = attributes;
    let title_ = title.slide1.value;
    // bg containe
    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("Title Setting", "unlimited-blocks")}
            initialOpen={false}
          >
            <p>
              <strong>{__("Color", "unlimited-blocks")}</strong>
            </p>
          </PanelBody>
        </InspectorControls>
        <div className="thk-progress-bar-wrapper">
          <div className="ubl-linear-progress-bar">
            <div className="txt-section">
              <RichText
                allowedFormats={[]}
                value={title_}
                tagName="p"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  fontSize: "30px",
                }}
                onChange={(e) => {
                  // let title__ = { ...title };
                  // let title__ = JSON.parse(JSON.stringify(title));
                  let title__ = cloneDeep(title);
                  console.log(
                    "titles jsons ss ->",
                    JSON.parse(JSON.stringify(title))
                  );
                  console.log("titles->", title);
                  title__["slide1"]["value"] = e;
                  // let title_ = [{ value: e }, { value: e }];
                  this.props.setAttributes({ title: title__ });
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Test;
