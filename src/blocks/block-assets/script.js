import "./style.scss";
let stateCheck = setInterval(() => {
  if (document.readyState === "complete") {
    clearInterval(stateCheck);
    // header style functionality
    putStyleInHeader();
    ublBlocksComponentStyler();
    ublWrapperInit();
    //slide slider
    ublBlocksSlideSlider();
    // fade slider
    ublFadeSliderInit();
    // ready state
  }
}, 100);
//   append and remover styler
// for column width initillization
function putStyleInHeader() {
  // add style in head
  let addStyleHead = document.getElementById("ubl-front-end-styler");
  if (!addStyleHead) {
    let element = document.createElement("style");
    element.type = "text/css";
    element.setAttribute("id", "ubl-front-end-styler");
    document.getElementsByTagName("head")[0].appendChild(element);
  }
}
function ublBlocksComponentStyler() {
  let getAllContentStyler = document.querySelectorAll("[ubl-blocks-styler]");
  for (let stylerIndex in getAllContentStyler) {
    if (getAllContentStyler[stylerIndex].nodeName) {
      let stylerHtmlElement = getAllContentStyler[stylerIndex];
      let getAttrPropStyle =
        stylerHtmlElement.getAttribute("ubl-blocks-styler");
      if (getAttrPropStyle) {
        getAttrPropStyle = JSON.parse(getAttrPropStyle);
        if (
          getAttrPropStyle &&
          getAttrPropStyle instanceof Object &&
          "id" in getAttrPropStyle
        ) {
          let stylerId = getAttrPropStyle.id;
          let styleApplied = "";

          /**
           * responsive width apply
           * get responsive width
           * step - get org width
           * step - get container parent width
           * step - compare both width then apply width
           * step - if getCurrentElementparentInnerWidth > getAttrPropStyle.responsiveWidth.orgWidth
           * step - then apply getAttrPropStyle.responsiveWidth.orgWidth as minwidth
           * step - otherwise apply getCurrentElementparentInnerWidth as max width
           */
          // let getWindowWidthDevice = window.innerWidth;
          // if (
          //   getWindowWidthDevice < 770 &&
          //   "responsiveWidth" in getAttrPropStyle &&
          //   "orgWidth" in getAttrPropStyle.responsiveWidth &&
          //   getAttrPropStyle.responsiveWidth.orgWidth > 0
          // ) {
          //   let getCurrentElementparentInnerWidth =
          //     stylerHtmlElement.parentElement.offsetWidth;
          //   let applyMinMaxWidth = {};
          //   if (
          //     getCurrentElementparentInnerWidth >
          //     getAttrPropStyle.responsiveWidth.orgWidth
          //   ) {
          //     applyMinMaxWidth["min-width"] =
          //       getAttrPropStyle.responsiveWidth.orgWidth;
          //   } else {
          //     applyMinMaxWidth["min-width"] = getCurrentElementparentInnerWidth;
          //   }
          /**
           * if style blank then add obj
           * else destructure style
           */
          // if (getAttrPropStyle.style == "") {
          //   console.log("apppppp", applyMinMaxWidth);
          //   getAttrPropStyle.style = applyMinMaxWidth;
          // } else if (getAttrPropStyle.style instanceof Object) {
          //   getAttrPropStyle.style = {
          //     ...getAttrPropStyle.style,
          //     ...applyMinMaxWidth,
          //   };
          // }
          // console.log("new style", getAttrPropStyle.style);
          // console.log("stylerId->", stylerId);
          // console.log("getAllContentStyler->", stylerHtmlElement);
          // console.log("getAttrPropStyle->", getAttrPropStyle);
          // console.log("respo width", getAttrPropStyle.responsiveWidth);
          // console.log("respo width");
          // }

          if (
            "style" in getAttrPropStyle &&
            getAttrPropStyle.style != "" &&
            getAttrPropStyle.style instanceof Object
          ) {
            // get properties and style value
            for (let styleProperty in getAttrPropStyle.style) {
              let checkStyle = getAttrPropStyle.style[styleProperty];
              if (checkStyle != 0) {
                checkStyle = String(checkStyle);
                let checkProperty = "opacity" == styleProperty ? false : true;
                if (
                  checkStyle.indexOf("px") < 0 &&
                  checkStyle.indexOf("%") < 0 &&
                  parseInt(checkStyle) &&
                  checkProperty
                ) {
                  checkStyle = checkStyle + "px";
                }
                styleApplied += styleProperty + ":" + checkStyle + ";";
              }
            }
          }
          if (styleApplied != "") {
            let appendStyleInHeader = "." + stylerId + "{" + styleApplied + "}";
            let addStyleHead = document.getElementById("ubl-front-end-styler");
            if (addStyleHead) {
              addStyleHead.textContent += appendStyleInHeader;
            }
          }
        }
      }
      // end up if
      // getAttrPropStyle.removeAttribute('ubl-blocks-styler);
    }
  }
}
// column and wrapper style init
function ublWrapperInit() {
  let getAllColumnWrapper = document.querySelectorAll(
    "[data-ubl-column-width]"
  );
  if (getAllColumnWrapper.length > 0) {
    for (let wrapperIndex in getAllColumnWrapper) {
      if (getAllColumnWrapper[wrapperIndex].nodeName == "DIV") {
        let getCurrentWrapper = getAllColumnWrapper[wrapperIndex];
        // put styler wrapper and column styles initilize
        // let getublStyler = getCurrentWrapper.getAttribute(
        //   "ubl-blocks-styler"
        // );
        // let keepWrapperId = false;
        // if (getublStyler) {
        //   getublStyler = JSON.parse(getublStyler);
        //   if (getublStyler instanceof Object) {
        //     // keep id in
        //     if ("id" in getublStyler) keepWrapperId = getublStyler.id;
        //   }
        // }
        // put styler wrapper and column styles initilize
        let getDataColumnWidth = getCurrentWrapper.getAttribute(
          "data-ubl-column-width"
        );
        if (getDataColumnWidth) {
          getDataColumnWidth = JSON.parse(getDataColumnWidth);

          // getCurrentWrapper
          // console.log("getDataColumnWidth", getDataColumnWidth);
          // console.log(
          //   "getDataColumnWidth length",
          //   Object.keys(getDataColumnWidth.columns).length
          // );

          /**
           * get start column start
           */
          let getWindowWidthDevice = window.innerWidth;
          // console.log("getWindowWidthDevice", getWindowWidthDevice);
          if (getWindowWidthDevice < 800) {
            let reWriteColumn = {};
            let getColumnLength = Object.keys(
              getDataColumnWidth.columns
            ).length;
            let ApplyWidthAccRes = "";
            if (getWindowWidthDevice < 480) {
              // console.log("getWindowWidthDevice", 480);
              ApplyWidthAccRes = 100;
            } else if (getWindowWidthDevice < 800) {
              // console.log("getWindowWidthDevice", 800);
              if (getColumnLength == 6 || getColumnLength == 5) {
                ApplyWidthAccRes = 33.333;
              } else if (
                getColumnLength == 4 ||
                getColumnLength == 3 ||
                getColumnLength == 2
              ) {
                ApplyWidthAccRes = 50;
              }
            }
            // console.log("reWriteColumn", reWriteColumn);
            if (ApplyWidthAccRes && ApplyWidthAccRes > 0) {
              for (
                let createREsWidth = 0;
                createREsWidth < getColumnLength;
                createREsWidth++
              ) {
                reWriteColumn[createREsWidth] = ApplyWidthAccRes;
              }
              getDataColumnWidth.columns = reWriteColumn;
            }
          }
          // console.log()
          let FindAllColumns = getCurrentWrapper.querySelector(
            ".ubl-blocks-column-wrapper-2 > .ubl-blocks-column-wrapper-2-content"
          ).children;
          if (
            "columns" in getDataColumnWidth &&
            getDataColumnWidth.columns instanceof Object &&
            Object.keys(getDataColumnWidth.columns).length &&
            FindAllColumns.length > 0
          ) {
            for (let columnIndex in getDataColumnWidth.columns) {
              let columnWidthFRomWrapper =
                getDataColumnWidth.columns[columnIndex];
              let getColumn = FindAllColumns[columnIndex];
              let getColumnStyle = getColumn.getAttribute("ubl-blocks-styler");
              if (getColumnStyle) {
                getColumnStyle = JSON.parse(getColumnStyle);

                // column id
                if (
                  getColumnStyle &&
                  getColumnStyle instanceof Object &&
                  "id" in getColumnStyle
                ) {
                  let columnId = getColumnStyle.id;
                  let columnStyleInColumn =
                    "width:" + columnWidthFRomWrapper + "%;";
                  // if (
                  //   "style" in getColumnStyle &&
                  //   getColumnStyle.style != "" &&
                  //   getColumnStyle.style instanceof Object
                  // ) {
                  //   for (let styleProperty in getColumnStyle.style) {
                  //     let checkStyle = getColumnStyle.style[styleProperty];
                  //     columnStyleInColumn +=
                  //       styleProperty + ":" + checkStyle + ";";
                  //   }
                  // }
                  let appendStyleInHeader =
                    "." + columnId + "{" + columnStyleInColumn + "}";
                  let addStyleHead = document.getElementById(
                    "ubl-front-end-styler"
                  );
                  if (addStyleHead) {
                    getCurrentWrapper.classList.add("active");
                    addStyleHead.textContent += appendStyleInHeader;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  //   console.log("getAllColumnWrapper", getAllColumnWrapper);
}
// ubl fade slider init
function ublFadeSliderInit() {
  // for slide fade effect
  let getAllSlide = document.querySelectorAll(
    ".ubl-slider-ul-slides.fadeEffect"
  );
  for (let slider in getAllSlide) {
    if (getAllSlide[slider].nodeName == "UL") {
      const slides = getAllSlide[slider].children;
      const containerClosest = getAllSlide[slider].closest(
        ".ubl-slider-container"
      );
      // overwriting width and height
      let sliderINIT_ = getAllSlide[slider].getAttribute("slidersetting");
      sliderINIT_ = JSON.parse(sliderINIT_);
      let containerWrapper = getAllSlide[slider].closest(
        ".ubl-block-slide-wrapper"
      );
      let getPArentWidthSlide_ =
        containerWrapper.parentNode.getBoundingClientRect().width;
      slides[0].classList.add("selected_");

      if (
        "width" in sliderINIT_ &&
        sliderINIT_.width &&
        getPArentWidthSlide_ > sliderINIT_.width
      ) {
        // overwriting width
        containerWrapper.style.width = sliderINIT_.width + "px";
      }
      if ("height" in sliderINIT_ && sliderINIT_.height) {
        // overwriting height
        getAllSlide[slider].style.height = sliderINIT_.height + "px";
      }

      // overwriting width and height

      let sliderDelay = containerClosest.getAttribute("sliderDelay");

      const prev = containerClosest.querySelector(
        ".ubl-slider-bullet-next-prev.prev"
      );
      const next = containerClosest.querySelector(
        ".ubl-slider-bullet-next-prev.next"
      );
      let indicator = containerClosest.querySelector(
        ".ubl-slider-bullet-trigger"
      );
      let indicatorActive, indiCatorStyle;
      if (indicator) {
        indicatorActive = indicator.getAttribute("active-color");
        indiCatorStyle = indicator.getAttribute("childStyle");
        indicator = indicator.children;
        if (indicator[0].querySelector("span")) {
          indicator[0].querySelector("span").style.backgroundColor =
            indicatorActive;
        }
      }
      containerWrapper.style.opacity = 1;
      let index = 0;
      if (prev && next) {
        prev.addEventListener("click", function () {
          prevSlide();
          resetTimer();
        });
        next.addEventListener("click", function () {
          nextSlide();
          resetTimer();
        });
      }

      for (let x in indicator) {
        if (indicator[x].nodeName == "LI") {
          indicator[x].addEventListener("click", function () {
            index = x;
            changesSlide();
            resetTimer();
          });
        }
      }
      function nextSlide() {
        if (index == slides.length - 1) {
          index = 0;
        } else {
          index++;
        }
        changesSlide();
      }
      function prevSlide() {
        if (index == 0) {
          index = slides.length - 1;
        } else {
          index--;
        }
        changesSlide();
      }
      function changesSlide() {
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove("selected_");
          if (indicator) {
            indicator[i].classList.remove("selected_");
            if (indicator[i].querySelector("span")) {
              indicator[i]
                .querySelector("span")
                .setAttribute("style", indiCatorStyle);
            }
          }
        }
        slides[index].classList.add("selected_");
        if (indicator) {
          indicator[index].classList.add("selected_");
          if (indicator[index].querySelector("span")) {
            indicator[index].querySelector("span").style.backgroundColor =
              indicatorActive;
          }
        }
      }
      sliderDelay = parseInt(sliderDelay);
      if (sliderDelay > 0) {
        sliderDelay = sliderDelay * 1000;
      }
      function resetTimer() {
        if (sliderDelay > 0) {
          clearInterval(timer);
          timer = setInterval(autoPlay, sliderDelay);
        }
      }
      function autoPlay() {
        nextSlide();
      }
      let timer;
      if (sliderDelay > 0) {
        timer = setInterval(autoPlay, sliderDelay);
      }
    }
  }
}
// ubl slider slider
function ublBlocksSlideSlider() {
  let getAllslideSlide = document.querySelectorAll(
    ".ubl-slider-ul-slides.slideEffect"
  );
  for (let sliderSlide in getAllslideSlide) {
    if (getAllslideSlide[sliderSlide].nodeName == "UL") {
      let slider = getAllslideSlide[sliderSlide];
      if (slider.children.length && slider.children.length > 1) {
        let firstElement_ = slider.firstElementChild.cloneNode(true);
        firstElement_.classList.add("first-element");
        let lastElement_ = slider.lastElementChild.cloneNode(true);
        lastElement_.classList.add("last-element");
        slider.append(firstElement_);
        slider.prepend(lastElement_);
        slider.children[1].classList.add("selected_");
        // return;

        let sliderINIT = slider.getAttribute("slidersetting");
        sliderINIT = JSON.parse(sliderINIT);
        let containerClosest = slider.closest(".ubl-block-slide-wrapper");
        let getPArentWidthSlide =
          containerClosest.parentNode.getBoundingClientRect().width;
        // overWirting Width and height
        if (
          "width" in sliderINIT &&
          sliderINIT.width &&
          getPArentWidthSlide > sliderINIT.width
        ) {
          // overwriting width
          getPArentWidthSlide = sliderINIT.width;
          containerClosest.style.width = getPArentWidthSlide + "px";
        }
        if ("height" in sliderINIT && sliderINIT.height) {
          // overwriting height
          slider.style.height = sliderINIT.height + "px";
        }
        // overWirting Width and height
        let countChildern = slider.children.length;
        slider.style.width = countChildern * getPArentWidthSlide + "px";
        slider.style.marginLeft = -getPArentWidthSlide + "px";
        containerClosest.style.opacity = 1;
        let tranSitionDuration = 1;
        let transitionDuClone = tranSitionDuration;
        let sliderDelay = containerClosest
          .querySelector(".ubl-slider-container")
          .getAttribute("sliderDelay");
        const prev = containerClosest.querySelector(
          ".ubl-slider-bullet-next-prev.prev"
        );
        const next = containerClosest.querySelector(
          ".ubl-slider-bullet-next-prev.next"
        );

        let indicator = containerClosest.querySelector(
          ".ubl-slider-bullet-trigger"
        );
        let indicatorActive, indiCatorStyle;
        if (indicator) {
          indicatorActive = indicator.getAttribute("active-color");
          indiCatorStyle = indicator.getAttribute("childStyle");
          indicator = indicator.children;
          if (indicator[0].querySelector("span")) {
            indicator[0].querySelector("span").style.backgroundColor =
              indicatorActive;
          }
        }
        let slideIndex = 1;
        if (prev && next) {
          prev.addEventListener("click", function () {
            prevSlideSl();
            resetTimerSl();
          });
          next.addEventListener("click", function () {
            nextSlideSl();
            resetTimerSl();
          });
        }
        for (let x in indicator) {
          if (indicator[x].nodeName == "LI") {
            indicator[x].addEventListener("click", function () {
              slideIndex = parseInt(x) + 1;
              changesSlideSl();
              resetTimerSl();
            });
          }
        }
        function nextSlideSl() {
          if (slideIndex == countChildern - 2) {
            // next opt perform
            slideIndex++;
            setTimeout(() => {
              slideIndex = 1;
              transitionDuClone = 0;
              changesSlideSl();
              transitionDuClone = tranSitionDuration;
            }, transitionDuClone * 1000);
            // next opt perform
          } else if (slideIndex < countChildern - 2) {
            slideIndex++;
          }
          changesSlideSl();
        }
        function prevSlideSl() {
          if (slideIndex == 1) {
            // prev opt perform
            slideIndex--;
            setTimeout(() => {
              slideIndex = countChildern - 2;
              transitionDuClone = 0;
              changesSlideSl();
              transitionDuClone = tranSitionDuration;
            }, transitionDuClone * 1000);
            // prev opt perform
          } else if (slideIndex > 1) {
            slideIndex--;
          }
          changesSlideSl();
        }

        function changesSlideSl() {
          let moveSlide =
            slideIndex > 0 ? -(slideIndex * getPArentWidthSlide) : 0;
          slider.style.marginLeft = moveSlide + "px";
          slider.style.transitionDuration = transitionDuClone + "s";
          for (let i = 0; i < countChildern; i++) {
            slider.children[i].classList.remove("selected_");
            if (indicator && indicator[i]) {
              indicator[i].classList.remove("selected_");
              if (indicator[i].querySelector("span")) {
                indicator[i]
                  .querySelector("span")
                  .setAttribute("style", indiCatorStyle);
              }
            }
          }
          slider.children[slideIndex].classList.add("selected_");
          if (indicator) {
            let indicatorIndex =
              countChildern - 1 == slideIndex
                ? 0
                : slideIndex == 0
                ? indicator.length - 1
                : slideIndex - 1;
            indicator[indicatorIndex].classList.add("selected_");
            if (indicator[indicatorIndex].querySelector("span")) {
              indicator[indicatorIndex].querySelector(
                "span"
              ).style.backgroundColor = indicatorActive;
            }
          }
        }
        sliderDelay = parseInt(sliderDelay);
        if (sliderDelay > 0) {
          sliderDelay = sliderDelay * 1000;
        }
        function resetTimerSl() {
          if (sliderDelay > 0) {
            clearInterval(timer);
            timer = setInterval(autoPlaySl, sliderDelay);
          }
        }
        function autoPlaySl() {
          nextSlideSl();
        }
        let timer;
        if (sliderDelay > 0) {
          timer = setInterval(autoPlaySl, sliderDelay);
        }
      } else {
        slider.closest(".ubl-block-slide-wrapper").style.opacity = 1;
      }
    }
  }
}
