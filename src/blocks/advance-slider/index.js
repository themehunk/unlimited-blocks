import "./editor.scss";
// -----------------------------------------++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// -----------------------------------------++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { __ } from "@wordpress/i18n";
import { blocksDetail } from "../block-assets/blocks-detail";
const { ubl_block_advance_slider } = blocksDetail;
registerBlockType("unlimited-blocks/owl-slider", {
  title: ubl_block_advance_slider.title,
  description: ubl_block_advance_slider.description,
  icon: ubl_block_advance_slider.icon,
  keywords: ubl_block_advance_slider.keywords,
  category: "unlimited-blocks-category",
  supports: {
    align: ["none", "wide", "full"],
  },
  attributes: {
    preview: {
      type: "boolean",
      default: false,
    },
    align: {
      type: "string",
      default: "full",
    },
    wrapper_id: {
      type: "string",
      default: "",
    },
    sliderSetting: {
      type: "object",
      default: {
        // slider settings
        dimension: {
          width: false,
          custom_width: 100,
          height: false,
          custom_height: 300,
        },
        sliderEffect: "slideEffect",
        triggerActive: "both",
        linearTrigger: {
          fontSize: 12,
          color: "rgba(231,192,192,1)",
          activeColor: "rgba(68,222,68,1)",
        },
        leftRightTrigger: {
          fontSize: 15,
          color: "rgba(231,192,192,1)",
        },
        autoTrigger: false,
        autoTriggerDelay: 4,
        // slider settings
      },
    },
    wrapper: {
      type: "object",
      default: { alignment: "center", spacing: 15, textAlign: "center" },
    },
    title: {
      type: "object",
      default: { fontSize: 38, color: "#ffffff" },
    },
    text: {
      type: "object",
      default: { fontSize: 17, color: "#d2d2d2" },
    },
    buttoneOne: {
      type: "object",
      default: {
        fontSize: "",
        color: "",
        height: "",
        width: "",
        bg: {
          backgroundColorType: "color",
          backgroundColor: "#ffbf00",
          backgroundImageGradient:
            "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
        },
        border: {},
      },
    },
    buttoneTwo: {
      type: "object",
      default: {
        fontSize: "",
        color: "",
        height: "",
        width: "",
        bg: {
          backgroundColorType: "color",
          backgroundColor: "#ffbf00",
          backgroundImageGradient:
            "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          // backgroundOpacity: 0.6,
        },
        // border: false,
        // borderColor: "",
        // borderWidth: "",
        // borderRadius: "",
        border: {},
      },
    },
    slides: {
      type: "array",
      default: [
        {
          container: {
            bg: {
              backgroundType: "color",
              backgroundImage: "",
              backgroundImageSize: "cover",
              backgroundColorType: "color",
              backgroundColor: "#20202e",
              backgroundImageGradient:
                "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
              backgroundOpacity: 0.6,
            },
          },
          title: {
            text: __("This Is Title text", "unlimited-blocks"),
          },
          text: {
            text: __("Add Description", "unlimited-blocks"),
          },
          buttoneOne: {
            enable: true,
            text: __("Button One", "unlimited-blocks"),
            link: "https://example.com/",
            target: false,
          },
          buttoneTwo: {
            enable: true,
            text: __("Button Two", "unlimited-blocks"),
            link: "https://example.com/",
            target: false,
          },
        },
        {
          container: {
            bg: {
              backgroundType: "color",
              backgroundImage: "",
              backgroundImageSize: "cover",
              backgroundColorType: "color",
              backgroundColor: "#20202e",
              backgroundImageGradient:
                "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
              backgroundOpacity: 0.6,
            },
          },
          title: {
            text: __("This Is Title text", "unlimited-blocks"),
          },
          text: {
            text: __("Add Description", "unlimited-blocks"),
            // color: "red",
          },
          buttoneOne: {
            enable: true,
            text: __("Button One", "unlimited-blocks"),
            link: "https://example.com/",
            target: false,
          },
          buttoneTwo: {
            enable: true,
            text: __("Button Two", "unlimited-blocks"),
            link: "https://example.com/",
            target: false,
          },
        },
        {
          container: {
            bg: {
              backgroundType: "color",
              backgroundImage: "",
              backgroundImageSize: "cover",
              backgroundColorType: "color",
              backgroundColor: "#20202e",
              backgroundImageGradient:
                "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
              backgroundOpacity: 0.6,
            },
          },
          wrapper: {
            bgcolor: "",
            border: "",
            alignment: "center",
            spacing: 2,
          },
          title: {
            text: __("This Is Title text", "unlimited-blocks"),
          },
          text: {
            text: __("Add Description", "unlimited-blocks"),
          },
          buttoneOne: {
            enable: true,
            text: __("Button One", "unlimited-blocks"),
            link: "https://example.com/",
            target: false,
          },
          buttoneTwo: {
            enable: true,
            text: __("Button Two", "unlimited-blocks"),
            link: "https://example.com/",
            target: false,
          },
        },
        // slider slides
      ],
    },
  },
  getEditWrapperProps(attributes) {
    // let { sliderSetting } = attributes;
    // let sliderWidth = sliderSetting[0].dimension;
    // let attr_ = { "data-align": "full" };
    // if (sliderWidth.width && sliderWidth.custom_width) {
    //   attr_ = {
    //     ...attr_,
    //     ...{
    //       style: { maxWidth: sliderWidth.custom_width + "px" },
    //     },
    //   };
    // }
    // return attr_;
  },
  example: {
    attributes: {
      preview: true,
    },
  },
  edit: Edit,
  save: () => {
    return null;
  },
});
