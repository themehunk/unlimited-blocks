import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { __ } from "@wordpress/i18n";
const attrSave = {};
import { blocksDetail } from "../block-assets/blocks-detail";
const { post_image_layout_two_post } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-post-section-two-post", {
  title: post_image_layout_two_post.title,
  description: post_image_layout_two_post.description,
  icon: post_image_layout_two_post.icon,
  keywords: post_image_layout_two_post.keywords,
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
