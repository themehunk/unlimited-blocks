import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { __ } from "@wordpress/i18n";
import { blocksDetail } from "../block-assets/blocks-detail";
const { post_image_layout_three_post } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-post-section-three-post", {
  title: post_image_layout_three_post.title,
  description: post_image_layout_three_post.description,
  icon: post_image_layout_three_post.icon,
  keywords: post_image_layout_three_post.keywords,
  category: "unlimited-blocks-category",
  getEditWrapperProps(attributes) {
    let attr_ = { "data-align": attributes.align };
    return attr_;
  },
  // attributes: attrSave,
  supports: {
    align: ["none", "wide", "full"],
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
