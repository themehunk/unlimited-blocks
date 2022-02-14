// const switcher = (props) => {
//   return (
//     <div class="ubl-switcher-bg-clr-gradient clor_color">
//       <span class="bg-span"></span>
//       <span class="selected">Border</span>
//       <span class="">Box Shadow</span>
//     </div>
//   );
// };
// export default switcher;
const Switcher = (props) => {
  const { navItem, clickme, value, wrapperClass } = props;
  if (navItem) {
    let default_class = "ul-switch-nav";
    if (wrapperClass) {
      default_class = default_class.concat(" ", wrapperClass);
    }

    let getIndexValue = navItem.findIndex((val) => val.name == value);

    // console.log("items->", navItem);
    // console.log("get->" + value, getIndexValue);
    let styleBack = null;
    if (getIndexValue > 0) {
      styleBack = { left: "calc(50% - 2px)" };
    }
    return (
      <div className={default_class}>
        <div className="bg-switch" style={styleBack}></div>
        {navItem.map((nav_val, key_) => {
          return (
            <div
              key={key_}
              onClick={() => {
                if (nav_val.name != value) {
                  clickme(nav_val.name);
                }
              }}
              className={value == nav_val.name ? "active" : null}
            >
              {nav_val.icon && (
                <span className="icon_">
                  {<span className={nav_val.icon}></span>}
                </span>
              )}
              <span className="title_">
                {nav_val.title}
                {/* {__(nav_val.title, "unlimited-blocks")} */}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Switcher;
// component
{
  /* <Switcher
              value={this.state.openPanel}
              navItem={[
                {
                  name: "layout",
                  title: "Layout",
                  icon: "dashicons dashicons-editor-table",
                },
                {
                  name: "style",
                  title: "Style",
                  icon: "dashicons dashicons-admin-customizer",
                },
              ]}
              clickme={(value_) => {
                this.setState({ openPanel: value_ });
              }}
            /> */
}
// component
