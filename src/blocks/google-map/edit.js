/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
 import { __ } from '@wordpress/i18n';
 import { Panel, PanelBody, PanelRow,TextControl,Button,FocusableIframe,ResizableBox,RangeControl,ToolbarGroup  } from '@wordpress/components';
 /**
  * React hook that is used to mark the block wrapper element.
  * It provides all the necessary props like the class name.
  *
  * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
  */
 import { useBlockProps,RichText,InspectorControls,BlockControls,AlignmentToolbar  } from '@wordpress/block-editor';
//  import { useState } from '@wordpress/element';
 /**
  * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
  * Those files can contain any CSS code that gets applied to the editor.
  *
  * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
  */
 import './editor.scss';
 
 /**
  * The edit function describes the structure of your block in the context of the
  * editor. This represents what the editor will render when the block is used.
  *
  * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
  *
  * @return {WPElement} Element to render.
  */
 export default function Edit({ attributes, setAttributes,toggleSelection } ) {
    const blockProps = useBlockProps();

    const {
        thmap,
        height,
        width,
        zoom,
        alignment
      } = attributes;

      const enable = {
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
    };

    const fsize = {
        height,
        width,
    };


     return (<>
         <div  { ...blockProps }>
         
        <InspectorControls key="setting">
             <Panel header="Map">

             <PanelBody title="Map"  initialOpen={ true }>
                    <TextControl
                    label="Location"
                    value={ thmap }
                    onChange={ ( value ) => setAttributes(  { thmap: value } ) }
                />

                <RangeControl
                    label="Zoom"
                    value={ zoom }
                    onChange={ ( value ) => setAttributes( { zoom: value }  ) }
                    min={ 3 }
                    max={ 20 }
                    />

             </PanelBody>
             </Panel>
        </InspectorControls>
        <ResizableBox
            size={fsize}
            minHeight="200"
            minWidth="200"
            enable={enable}
            onResizeStop={ ( event, direction, elt, delta ) => {
                setAttributes( {
                    height: parseInt( height + delta.height, 10 ),
                    width: parseInt( width + delta.width, 10 ),
                } );
                toggleSelection( true );
            } }
            onResizeStart={ () => {
                toggleSelection( false );
            } }
        >
        <FocusableIframe
        { ...attributes }
        src={`https://maps.google.com/maps?q=${thmap}&t=m&z=${ zoom }&output=embed&iwloc=near`}
        onFocus={ () => console.log( 'Map' ) }
    />

      
        <RichText 
                tagName="div"
                value={ attributes.thmap }
                allowedFormats={ [ 'core/bold', 'core/italic' ] }
                onChange={ ( val ) =>
                            setAttributes( { thmap: val } )
                        }
                    style={{textAlign:alignment}}
                    />
  </ResizableBox>
        </div>
                <BlockControls>
                        <ToolbarGroup>
                            <AlignmentToolbar
                                value={ alignment }
                                onChange={ ( val ) =>
                            setAttributes( { alignment: val } )
                        }
                            />
                        </ToolbarGroup>
                     </BlockControls>  
         </>
     );
 }
 