let ContentStyler = (name_, selector = false, setyl_ = false) => {
  if (selector && setyl_) {
    let textStyle = `${selector}{${setyl_};}`;
    let addStyleHead = document.getElementById(name_);
    if (!addStyleHead) {
      let element = document.createElement("style");
      element.type = "text/css";
      element.textContent = textStyle;
      element.setAttribute("id", name_);
      document.getElementsByTagName("head")[0].appendChild(element);
    } else if (addStyleHead.tagName == "STYLE") {
      addStyleHead.textContent = textStyle;
    }
  }
};
export default ContentStyler;
