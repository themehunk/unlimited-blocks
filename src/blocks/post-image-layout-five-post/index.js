import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { blocksDetail } from "../block-assets/blocks-detail";
const { post_image_layout_five_post } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-post-section-five-post", {
  title: post_image_layout_five_post.title,
  description: post_image_layout_five_post.description,
  icon: post_image_layout_five_post.icon,
  keywords: post_image_layout_five_post.keywords,
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
