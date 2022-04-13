import "./editor.scss";
import $ from "jQuery";
$(document).on(
  {
    mouseenter: function () {
      let element = $(this);
      element.addClass("hovered");
      let container = element.closest(".ul-blocks-simple-product");
      container.find(".owl-stage-outer").addClass("stage-hovered");
    },
    mouseleave: function () {
      let element_ = $(this);
      let container_ = element_.closest(".ul-blocks-simple-product");

      element_.removeClass("hovered");
      container_.find(".owl-stage-outer").removeClass("stage-hovered");
    },
  },
  ".ul-blocks-simple-product .elemento-product-outer-wrap"
);
