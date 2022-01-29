import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
class Dimension extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimension: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      isLink: false,
    };
  }
  componentDidMount() {
    this.setDefaultValue();
  }
  componentDidUpdate(prevprops) {
    if (
      prevprops.value != this.props.value ||
      prevprops.isLink != this.props.isLink
    ) {
      this.setDefaultValue();
    }
  }
  setDefaultValue() {
    let defaultValue = this.props.value;
    let isLink = this.props.isLink;
    // console.log("dimension -> default value ", defaultValue);
    if (typeof defaultValue == "object" && !Array.isArray(defaultValue)) {
      let oldDimension = { ...this.state.dimension, ...defaultValue };
      if (isLink) {
        // with link
        let compareValue = 0;
        for (let key_ in oldDimension) {
          let int_ = parseInt(oldDimension[key_]);
          if (int_ && int_ > compareValue) {
            compareValue = int_;
          }
        }
        oldDimension.top = compareValue;
        oldDimension.right = compareValue;
        oldDimension.bottom = compareValue;
        oldDimension.left = compareValue;
        this.setState({ dimension: oldDimension, isLink: isLink });
        // console.log("dimension set 1 -> default value ", defaultValue);
      } else {
        // console.log("dimension set 2 -> default value ", defaultValue);
        this.setState({ dimension: oldDimension, isLink: isLink });
      }
    }
  }

  setInlink(checkLinked) {
    let setLinkDimension = { ...this.state.dimension };
    let isLinkObject = {};
    if (checkLinked) {
      let compareValue = 0;
      for (let key_ in setLinkDimension) {
        let int_ = parseInt(setLinkDimension[key_]);
        if (int_ && int_ > compareValue) {
          compareValue = int_;
        }
      }
      setLinkDimension.top = compareValue;
      setLinkDimension.right = compareValue;
      setLinkDimension.bottom = compareValue;
      setLinkDimension.left = compareValue;
      // add is link on change
      this.setState({ dimension: setLinkDimension, isLink: true });
      isLinkObject = { isLink: true };
    } else {
      this.setState({ isLink: false });
      isLinkObject = { isLink: false };
    }
    let changeSetlinkMe = { ...setLinkDimension, ...isLinkObject };
    this.props.changeme(changeSetlinkMe);
  }

  changeVal(val, cordinate) {
    // const { state, setState } = this;
    val = parseInt(val);
    // console.log("props", this.props);
    let copyDimension = { ...this.state.dimension };
    let { isLink } = this.state;
    if (isLink) {
      copyDimension.top = val;
      copyDimension.right = val;
      copyDimension.bottom = val;
      copyDimension.left = val;
    } else {
      copyDimension[cordinate] = val;
    }
    this.setState({ dimension: copyDimension });
    this.props.changeme(copyDimension);
  }
  render() {
    // console.log("dimension ->  props inrender ", this.props);
    // console.log("dimension -> props STATE inren ", this.state);
    let { top, right, bottom, left } = this.state.dimension;
    let { isLink } = this.state;
    isLink = isLink ? "linked" : "";
    return (
      <div className="ul-dimension-tool">
        <div className="tools_">
          <div className="ul-dimension-top">
            <input
              type="number"
              value={top}
              onChange={(e) => {
                let { value } = e.target;
                this.changeVal(value, "top");
              }}
            />
          </div>
          <div className="ul-dimension-right">
            <input
              type="number"
              value={right}
              onChange={(e) => {
                let { value } = e.target;
                this.changeVal(value, "right");
              }}
            />
          </div>
          <div className="ul-dimension-bottom">
            <input
              type="number"
              value={bottom}
              onChange={(e) => {
                let { value } = e.target;
                this.changeVal(value, "bottom");
              }}
            />
          </div>
          <div className="ul-dimension-left">
            <input
              type="number"
              value={left}
              onChange={(e) => {
                let { value } = e.target;
                this.changeVal(value, "left");
              }}
            />
          </div>
          <div
            className={`link_dimension ${isLink}`}
            onClick={() => {
              let setisLink = !isLink;
              this.setInlink(setisLink);
            }}
          >
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}
export default Dimension;

{
  /* <Dimension
              value={{
                top: styles.paddingTop,
                right: styles.paddingRight,
                bottom: styles.paddingBottom,
                left: styles.paddingLeft,
              }}
              isLink={styles.paddingLink}
              changeme={(val_) => {
                let saveObj = {
                  paddingTop: val_.top,
                  paddingRight: val_.right,
                  paddingBottom: val_.bottom,
                  paddingLeft: val_.left,
                };
                if ("isLink" in val_) {
                  saveObj.paddingLink = val_.isLink;
                }
                this.updateStyle(true, true, saveObj);
              }}
            /> */
}
