import "./style.scss";
let stateCheck = setInterval(() => {
  if (document.readyState === "complete") {
    clearInterval(stateCheck);

    let getProgressBar = document.querySelectorAll(
      ".ubl-linear-progress-bar.front_"
    );
    if (getProgressBar.length) {
      for (let x in getProgressBar) {
        if (getProgressBar[x].nodeName == "DIV") {
          let getPercent = getProgressBar[x].getAttribute("percent");
          let getDelay = getProgressBar[x].getAttribute("delay");
          let iniTialPercent = 0;
          let putTextPErcent = getProgressBar[x].querySelectorAll(
            ".percent_"
          )[0];
          let putStylePErcent = getProgressBar[x].querySelectorAll(
            ".line-inner_"
          )[0];
          let setValue = setInterval(() => {
            putTextPErcent.innerText = iniTialPercent + "%";
            putStylePErcent.style.width = iniTialPercent + "%";
            if (getPercent <= iniTialPercent) clearInterval(setValue);
            iniTialPercent++;
          }, getDelay);
        }
      }
    }
  }
}, 100);
