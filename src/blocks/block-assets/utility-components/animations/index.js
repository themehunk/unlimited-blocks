import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
class Animations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: null,
    };
  }
  componentDidMount() {
    // let defaultValue = this.props.value;
    // let isLink = this.props.isLink;
    // // console.log("default value ", defaultValue);
    // if (typeof defaultValue == "object" && !Array.isArray(defaultValue)) {
    //   let oldDimension = { ...this.state.dimension, ...defaultValue };
    //   if (isLink) {
    //     // with link
    //     let compareValue = 0;
    //     for (let key_ in oldDimension) {
    //       let int_ = parseInt(oldDimension[key_]);
    //       if (int_ && int_ > compareValue) {
    //         compareValue = int_;
    //       }
    //     }
    //     oldDimension.top = compareValue;
    //     oldDimension.right = compareValue;
    //     oldDimension.bottom = compareValue;
    //     oldDimension.left = compareValue;
    //     this.setState({ dimension: oldDimension, isLink: true });
    //   } else {
    //     this.setState({ dimension: oldDimension });
    //   }
    // }
  }

  changeVal(val) {
    // // const { state, setState } = this;
    // val = parseInt(val);
    // // console.log("props", this.props);
    // let copyDimension = { ...this.state.dimension };
    // let { isLink } = this.state;
    // if (isLink) {
    //   copyDimension.top = val;
    //   copyDimension.right = val;
    //   copyDimension.bottom = val;
    //   copyDimension.left = val;
    // } else {
    //   copyDimension[cordinate] = val;
    // }
    // this.setState({ dimension: copyDimension });
    // this.props.changeme(copyDimension);
  }
  render() {
    // console.log("props inrender", this.props);
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
export default Animations;

{
  /* <Animations
              value={{ top: 10, right: 10, bottom: 10, left: 10 }}
              changeAnimation={(val_) => {
                console.log("val_ from out", val_);
              }}
            /> */
}
