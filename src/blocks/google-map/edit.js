/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
 import { __ } from '@wordpress/i18n';
 import { Panel, PanelBody, PanelRow,TextControl,Button,FocusableIframe,ToggleControl,RangeControl,ToolbarGroup } from '@wordpress/components';
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
        alignment,
        disabled
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
                    label="Width"
                    value={ width }
                    onChange={ ( value ) => setAttributes( { width: value }  ) }
                    min={ 20 }
                    max={ 100 }
                    />

                <RangeControl
                    label="Height"
                    value={ height }
                    onChange={ ( value ) => setAttributes( { height: value }  ) }
                    min={ 50 }
                    max={ 800 }
                    />

                <RangeControl
                    label="Zoom"
                    value={ zoom }
                    onChange={ ( value ) => setAttributes( { zoom: value }  ) }
                    min={ 3 }
                    max={ 20 }
                    />

                <ToggleControl
                    label="Address Text Show/Hide"
                    checked={ disabled }
                    onChange={ (value) => setAttributes( { disabled: value }) }
                    />

             </PanelBody>
             </Panel>
        </InspectorControls>
        <div  style={{textAlign:alignment, height: `${height}px`,  width: '100%'}}>
        <FocusableIframe 
            zoom={zoom}
         style={{textAlign:alignment, height: `${height}px`,  width: `${width}%`}}
        src={`https://maps.google.com/maps?q=${thmap}&t=m&z=${ zoom }&output=embed&iwloc=near`}
        onFocus={ () => '' }
    />
    
    {disabled &&<RichText 
                tagName="div"
                value={ attributes.thmap }
                
                onChange={ ( val ) =>
                            setAttributes( { thmap: val } )
                        }
                    style={{textAlign:alignment, padding:'10px'}}
                    />}

</div>

        </div>


        <BlockControls key="controls">
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
 