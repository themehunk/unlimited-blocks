import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./edit";
const attrSave = {};
import { blocksDetail } from "../block-assets/blocks-detail";
const { post_image_layout_six_post } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-post-section-six-post", {
  title: post_image_layout_six_post.title,
  description: post_image_layout_six_post.description,
  icon: post_image_layout_six_post.icon,
  keywords: post_image_layout_six_post.keywords,
  category: "unlimited-blocks-category",
  keywords: ["post"],
  // attributes: attrSave,
  getEditWrapperProps(attributes) {
    let attr_ = { "data-align": attributes.align };
    return attr_;
  },
  example: {
    attributes: {
      preview: true,
    },
  },
  // attributes: attrSave,
  supports: {
    align: ["none", "wide", "full"],
  },
  edit: Edit,
  save: () => {
    return null;
  },
});
