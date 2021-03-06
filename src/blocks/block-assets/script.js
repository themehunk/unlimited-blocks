import "./style.scss";
// import
let stateCheck = setInterval(() => {
  if (document.readyState === "complete") {
    clearInterval(stateCheck);

    // header style functionality
    putStyleInHeader();
    // all blocks style add in header
    putAllBlockStyle();
    // all blocks style add in header

    ublBlocksComponentStyler();
    ublWrapperInit();
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
function putAllBlockStyle() {
  // console.log("get all style");
  let getStylesContainer = document.querySelectorAll("[ubl-block-style]");
  let addStyleHead = document.getElementById("ubl-front-end-styler");

  if (getStylesContainer.length) {
    // check avail or not
    for (let getIndex in getStylesContainer) {
      //looping nodes
      let SingleNode = getStylesContainer[getIndex];
      if (SingleNode.nodeName) {
        singleStyle(SingleNode);
        // remove attr --------------------------------------
        SingleNode.removeAttribute("ubl-block-style");
        // remove attr --------------------------------------
      }
      //looping nodes
    }
    function singleStyle(SingleNode) {
      let getStyle = SingleNode.getAttribute("ubl-block-style");
      let getStyleStingyFy = checkVAlidJson(getStyle);
      if (getStyleStingyFy) {
        // console.log("getStyleStingyFy->", getStyleStingyFy);
        let Css = "";
        getStyleStingyFy.map((val_) => {
          if (val_.selector && val_.css) {
            Css += `${val_.selector}{${val_.css}}`;
          }
        });
        if (Css) {
          addStyleHead.textContent += Css;
        }
      }
    }
    // check avail or not
  }
}

function checkVAlidJson(json_) {
  try {
    JSON.parse(json_);
  } catch (e) {
    return false;
  }
  return JSON.parse(json_);
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
