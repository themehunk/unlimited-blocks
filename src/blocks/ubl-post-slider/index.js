import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { blocksDetail } from "../block-assets/blocks-detail";
const { ubl_post_slider } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-post-slider", {
  title: ubl_post_slider.title,
  description: ubl_post_slider.description,
  icon: ubl_post_slider.icon,
  keywords: ubl_post_slider.keywords,
  category: "unlimited-blocks-category",
  getEditWrapperProps(attributes) {
    let { sliderSetting } = attributes;
    let sliderWidth = sliderSetting[0].dimension;
    let attr_ = { "data-align": "full" };
    if (sliderWidth.width && sliderWidth.custom_width) {
      attr_ = {
        ...attr_,
        ...{
          style: { maxWidth: sliderWidth.custom_width + "px" },
        },
      };
    }
    return attr_;
  },
  example: () => {},
  edit: Edit,
  save: () => {
    return null;
  },
});
