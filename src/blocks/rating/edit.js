/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
 import { useState   } from '@wordpress/element';
 import { __ } from '@wordpress/i18n';
 import { Panel,TabPanel, PanelBody,TextControl,
    RangeControl,SelectControl,ColorPalette,FontSizePicker
    ,CardHeader,    __experimentalText as Text, __experimentalHeading as Heading,ToolbarGroup,ToolbarButton,
    __experimentalView as View,
    __experimentalHStack as HStack } from '@wordpress/components';
 /**
  * React hook that is used to mark the block wrapper element.
  * It provides all the necessary props like the class name.
  *
  * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
  */
 import { useBlockProps,RichText,InspectorControls,BlockControls } from '@wordpress/block-editor';
//  import { useState } from '@wordpress/element';
 /**
  * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
  * Those files can contain any CSS code that gets applied to the editor.
  *
  * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
  */
 import './editor.scss';
 import { Icon, starFilled,starHalf,starEmpty,pullLeft,pullRight } from '@wordpress/icons';

 /**
  * The edit function describes the structure of your block in the context of the
  * editor. This represents what the editor will render when the block is used.
  *
  * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
  *
  * @return {WPElement} Element to render.
  */
 export default function Edit({ attributes, setAttributes,isSelected  } ) {
    const blockProps = useBlockProps();
    const [ tabs, setTabs ] = useState( 'tab1' );
    const {
        ratingScale,
        rating,
        icon_color,
        icon_size,
        icon_text,
        title_color,
        title_size,
        rPostion
      } = attributes;

      const colors = [
        { name: 'red', color: '#f00' },
        { name: 'blck', color: '#000' },
        { name: 'blue', color: '#00f' },
    ]; 

    const fontSizes = [
        {
            name: __( 'Small' ),
            slug: 'small',
            size: 20,
        },
        {
            name: 'Normal',
            slug: 'normal',
            size: 24,
            },
        {
            name: 'Medium',
            slug: 'medium',
            size: 32,
        },
        {
            name: __( 'Big' ),
            slug: 'big',
            size: 36,
        },
        {
            name: 'Huge',
            slug: 'huge',
            size: 42,
            },
    ];

      const ratingHandle = (rating)=>{
        let ratingList=[];
        let x =  rating.toString().split('.')
        let halfr = (String(x[1]) === "undefined") ? parseInt(x[0]):parseInt(x[0]);        
        for (let i = 0; i < ratingScale; i++) {
                if(i>=rating){
                    ratingList.push(<Icon key={i} icon={ starEmpty } style={{fill:icon_color}} size={icon_size}/>);

                }else{
                    ratingList.push(<Icon key={i} icon={ (halfr>i)?starFilled:starHalf } style={{fill:icon_color}} size={icon_size}/>);
                }

                }
            return ratingList;
            }


            const onSelect = ( tabName ) => {

                setTabs(tabName);
                console.log( 'Selecting tab', tabName );
            };

     return (
         <div { ...blockProps }>
            { isSelected && (
            <InspectorControls key="setting">
             <Panel header="Rating">
                    <TabPanel
                    className="rating-tab-panel"
                    activeClass="active-tab"
                    onSelect={ onSelect }
                    tabs={ [
                        {
                            name: 'tab1',
                            title: 'Settings',
                            className: 'tab-one dashicons-before',
                        },
                        {
                            name: 'tab2',
                            title: 'Style',
                            className: 'tab-two dashicons-before',
                        },
                    ] }
                >
                { ( tab ) => <CardHeader><Heading size={ 4 }></Heading></CardHeader>  }
            </TabPanel>

            { 'tab1'===tabs && (  <div><PanelBody title="Star"  initialOpen={ true }>
            <TextControl
            label="Title"
            value={ icon_text }
            onChange={ ( value ) => setAttributes( {icon_text:value} ) }
        />  
            <SelectControl
                label="Rating Scale"
                value={ ratingScale }
                options={ [
                    { label: '0-5', value: 5 },
                    { label: '0-10', value: 10 },
                ] }
                onChange={ ( newrating ) => setAttributes( {ratingScale:newrating} ) }
            />
            
                <RangeControl
                initialPosition={rating}
                label="Rating"
                step="0.5"
                max={ratingScale}
                min={1}
                onChange={ ( rating ) => setAttributes( {rating:rating} ) }
                />
        </PanelBody>
            </div>
         )}
            {/* Style Tab */}
            { 'tab2'===tabs && ( <div>
                <PanelBody title="Star"  initialOpen={ true }>
                        <fieldset>
                        <legend className="blocks-base-control__label">
                                { __( 'Icon Color', 'gutenpride' ) }
                            </legend>
                        <ColorPalette
                          label={ __( 'Icon Color' ) }
                            colors={ colors }
                            value={ icon_color }
                            onChange={ ( color ) => setAttributes( { icon_color: color }  ) }
                        />
                        </fieldset>
                        <FontSizePicker
                            fontSizes={ fontSizes }
                            value={ icon_size }
                            fallbackFontSize={ icon_size  }
                            onChange={ ( newFontSize ) => {
                                setAttributes( {icon_size:newFontSize} );
                            } }
                        />
                </PanelBody>
                <PanelBody title="Title"  initialOpen={ false }>
                <fieldset>
                        <legend className="blocks-base-control__label">
                                { __( 'Title Color', 'gutenpride' ) }
                            </legend>
                        <ColorPalette
                          label={ __( 'Title Color' ) }
                            colors={ colors }
                            value={ title_color }
                            onChange={ ( color ) => setAttributes( { title_color: color }  ) }
                        />
                        </fieldset>
                        <FontSizePicker
                            fontSizes={ fontSizes }
                            value={ title_size }
                            fallbackFontSize={ title_size  }
                            onChange={ ( newFontSize ) => {
                                setAttributes( {title_size:newFontSize} );
                            } }
                        />

            </PanelBody>
                
                </div>)} 
             </Panel>
             </InspectorControls>
         )}
                <div className='th-star-rating'>
          
                


                <HStack
                    spacing="1"
                >
                  { 'right'===rPostion && ( <><View>
                <div>
                            <RichText 
                                tagName="span"
                                value={ icon_text }
                                allowedFormats={ [ 'core/bold', 'core/italic' ] }
                                onChange={ ( val ) =>
                                            setAttributes( { icon_text: val } )
                                        }
                                style={{color:title_color,fontSize:title_size}}
                                    /></div>
                </View>
                <View>
                <div className='thb-rating'>{ratingHandle(rating)}</div>
                </View></>)}

                { 'left'===rPostion && ( <>
                
                    <View>
                <div className='thb-rating'>{ratingHandle(rating)}</div>
                </View>
                
                <View>
                <div>
                            <RichText 
                                tagName="span"
                                value={ icon_text }
                                allowedFormats={ [ 'core/bold', 'core/italic' ] }
                                onChange={ ( val ) =>
                                            setAttributes( { icon_text: val } )
                                        }
                                style={{color:title_color,fontSize:title_size}}
                                    /></div>
                </View>
                </>)}

        </HStack>
                <BlockControls>
                        <ToolbarGroup>
                        <ToolbarButton
                        className={'left'===rPostion && ('is-pressed')}
                    icon={ pullLeft }
                    label="Icon Left"
                    onClick={ () =>{
                                setAttributes( {rPostion:'left'} );
                            } }
                />
                          <ToolbarButton
                    className={'right'===rPostion && ('is-pressed')}
                    icon={ pullRight }
                    label="Icon Right"
                    onClick={ () =>{
                                setAttributes( { rPostion:'right'} );
                            } }
                />
                        </ToolbarGroup>
                     </BlockControls> 
               </div>
         </div>
     );
 }
