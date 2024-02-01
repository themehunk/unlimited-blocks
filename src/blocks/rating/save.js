/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
 import { __ } from '@wordpress/i18n';

 /**
  * React hook that is used to mark the block wrapper element.
  * It provides all the necessary props like the class name.
  *
  * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
  */
  import { useBlockProps,RichText } from '@wordpress/block-editor';
  import { Icon, starFilled,starHalf,starEmpty } from '@wordpress/icons';

 /**
  * The save function defines the way in which the different attributes should
  * be combined into the final markup, which is then serialized by the block
  * editor into `post_content`.
  *
  * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
  *
  * @return {WPElement} Element to render.
  */
 export default function save({ attributes}) {
    const blockProps = useBlockProps.save();

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

  const ratingSaveHandle = (rating,ratingScale)=>{
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



     return (<div { ...blockProps } >
                <div className="th-star-rating" style={{display:'flex'}}>

                { 'left'===rPostion && ( <>
                    <div>{ratingSaveHandle(rating,ratingScale)}</div>
                    <div>
                        <RichText.Content
                        tagName="span" 
                        value={icon_text}
                        style={{color:title_color,fontSize:title_size}}
                        />     
                        </div>
                                
                    </>)}

                    { 'right'===rPostion && ( <>
                    <div>
                        <RichText.Content
                        tagName="span" 
                        value={icon_text}
                        style={{color:title_color,fontSize:title_size}}
                        />     
                        </div>
                        <div>{ratingSaveHandle(rating,ratingScale)}</div>
   
                    </>)}


                   
                </div>
        </div>
     );
 }
 