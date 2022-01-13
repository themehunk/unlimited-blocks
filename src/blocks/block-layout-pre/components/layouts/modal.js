/**
 * Layout modal window with tab panel.
 */
/**
 * WordPress dependencies.
 */
import Layoutlist from "./layout-list";
import { __ } from "@wordpress/i18n";
import { Fragment, useState } from "@wordpress/element";
import { Button, Modal } from "@wordpress/components";
import { useDispatch } from "@wordpress/data";
function LayoutModal(props) {
  //   const [currentTab, setCurrentTab] = useState("gb-layout-tab-sections");
  const [modalOpen, setModalOpen] = useState(true);
  //   preventing to close first time
  const [checkFirst, setcheckFirst] = useState(false);
  const { removeBlock } = useDispatch("core/block-editor");
  return (
    <>
      <Fragment key={"layout-modal-fragment-" + props.clientId}>
        {/* Launch the layout modal window */}
        <Button
          key={"layout-modal-library-button-" + props.clientId}
          isPrimary
          className="gb-layout-modal-button"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          {__("Unlimited Blocks Library", "unlimited-blocks")}
        </Button>
        {modalOpen ? (
          <Modal
            key={"layout-modal-modal-component-" + props.clientId}
            className="ubl-blocks-layout-modal"
            title={__("Unlimited Blocks Templates", "unlimited-blocks")}
            shouldCloseOnClickOutside={true}
            onRequestClose={() => {
              if (checkFirst) {
                setModalOpen(false);
                removeBlock(props.clientId);
              } else {
                setcheckFirst(true);
              }
            }}
          >
            <Layoutlist clientId={props.clientId} />
          </Modal>
        ) : null}
      </Fragment>
    </>
  );
}
export default LayoutModal;
