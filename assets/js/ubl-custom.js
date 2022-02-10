(function ($) {
  const ULB = {
    init: function () {
      // ULB.bind();
      ULB.reactREady();
      // console.log("kdoijd", document.readyState);
    },
    reactREady: function () {
      let stateCheck = setInterval(() => {
        if (document.readyState === "complete") {
          clearInterval(stateCheck);
          ULB.addOwlSlider();
        }
      }, 100);
    },
    bind: function () {},
    addOwlSlider: function () {
      let getSlider = $(".elemento-owl-slider-common-secript");
      if (getSlider.length) {
        for (let getIndex in getSlider) {
          //looping nodes
          let SingleNode = getSlider[getIndex];
          if (SingleNode.nodeName) {
            ULB.sliderrr(SingleNode);
          }
          //looping nodes
        }
      }
    },
    sliderrr: function (slider_) {
      let slider = $(slider_);
      if (slider.length && slider.length > 0) {
        let dataSetting = slider.attr("data-setting");
        if (dataSetting) {
          dataSetting = JSON.parse(dataSetting);
          if (dataSetting) {
            let owlCarouselArg = {
              slideTransition: "linear",
              navSpeed: 1000,
            };
            owlCarouselArg["responsive"] = {
              300: {
                items: dataSetting.items_mobile,
              },
              600: {
                items: dataSetting.items_tablet,
              },
              900: {
                items: dataSetting.items,
              },
            };
            // number of column
            if ("items" in dataSetting) {
              owlCarouselArg["items"] = dataSetting.items;
            }
            // margin
            if ("slide_spacing" in dataSetting) {
              owlCarouselArg["margin"] = dataSetting.slide_spacing;
            }
            //autoplay
            if ("autoplay" in dataSetting) {
              owlCarouselArg["autoplay"] = true;
              owlCarouselArg["autoplaySpeed"] =
                parseInt(dataSetting.autoPlaySpeed) * 1000;
            }
            //dots and navigation speed
            if ("slider_controll" in dataSetting) {
              // for dots
              owlCarouselArg["dots"] =
                dataSetting.slider_controll == "ar_do" ||
                dataSetting.slider_controll == "dot"
                  ? true
                  : false;
              // for arrows
              owlCarouselArg["nav"] =
                dataSetting.slider_controll == "ar_do" ||
                dataSetting.slider_controll == "arr"
                  ? true
                  : false;
            }
            // slider loop
            owlCarouselArg["loop"] =
              "slider_loop" in dataSetting && dataSetting.slider_loop == "1"
                ? true
                : false;
            // slider direction
            owlCarouselArg["rtl"] =
              "autoPlayDirection" in dataSetting &&
              dataSetting.autoPlayDirection == "l"
                ? true
                : false;

            //////// lll_lll_yyy_uuu_iii

            let OWlCarouselSlider = slider.find(".elemento-owl-slider");
            var intOWL = OWlCarouselSlider.owlCarousel(owlCarouselArg);
            intOWL.trigger("refresh.owl.carousel");
          }
        }
      }
    },
  };
  ULB.init();
})(jQuery);
