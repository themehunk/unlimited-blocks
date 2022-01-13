/**
 * Edit component.
 */

/**
 * Import dependencies.
 */
import LayoutModal from "./layouts/modal";
// import { LayoutsContext } from "./layouts-provider";

/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
import { Component, Fragment } from "@wordpress/element";
import { Placeholder } from "@wordpress/components";

export default class Edit extends Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    const { attributes, setAttributes, clientId } = this.props;
    /* Placeholder with layout modal */
    return [
      <Fragment key={clientId}>
        <Placeholder
          key="placeholder"
          label={__("Layout Selector", "unlimited-blocks")}
          instructions={__(
            "Launch the layout library to browse pre-designed sections.",
            "unlimited-blocks"
          )}
          className={"gb-layout-selector-placeholder"}
          icon="layout"
        >
          <LayoutModal clientId={clientId} />
        </Placeholder>
      </Fragment>,
    ];
  }
}
