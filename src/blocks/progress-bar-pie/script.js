import "./style.scss";
// common slider functionality
let stateCheck = setInterval(() => {
  if (document.readyState === "complete") {
    clearInterval(stateCheck);
    let circle_ = document.querySelectorAll(".ubl-block-pie-circle.front_");
    if (circle_.length > 0) {
      for (let x in circle_) {
        if (circle_[x].nodeName == "DIV") {
          let circleTxt = circle_[x].querySelectorAll("span.percent_")[0];
          let circle_ele = circle_[x].querySelectorAll("svg")[0];
          let circle_ele_apply = circle_[x].querySelectorAll(
            ".percent-apply"
          )[0];
          let getCircleData = circle_ele.getAttribute("data");
          getCircleData = JSON.parse(getCircleData);
          let {
            radius,
            text,
            strokeWidth,
            strokeBgColor,
            strokeColor,
            fillBgColor,
            lineCap,
            animationDelay,
          } = getCircleData;
          // let dasharray_
          circle_ele_apply.style.strokeWidth = strokeWidth;
          circle_ele_apply.style.stroke = strokeColor;

          let startAng = 0;
          let setIntFn = () => {
            circleTxt.innerText = startAng + "%";
            circle_ele_apply.style.strokeDasharray = `${
              startAng * ((Math.PI * (radius * 2)) / 100)
            } ${Math.PI * (radius * 2)}`;
            if (startAng >= text) clearInterval(startInt);
            startAng++;

          };
          let startInt = setInterval(setIntFn, animationDelay);
          circle_ele.removeAttribute("data");
        }
      }
    }
  }
}, 100);
