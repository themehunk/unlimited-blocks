import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { __ } from "@wordpress/i18n";
import { blocksDetail } from "../block-assets/blocks-detail";
const { post_image_layout } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-post-section", {
  title: post_image_layout.title,
  description: post_image_layout.description,
  icon: post_image_layout.icon,
  keywords: post_image_layout.keywords,
  category: "unlimited-blocks-category",
  getEditWrapperProps(attributes) {
    let attr_ = { "data-align": "full" };
    return attr_;
  },
  // attributes: attrSave,
  example: () => {},
  edit: Edit,
  save: () => {
    return null;
  },
});
