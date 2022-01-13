<?php
if (!defined('ABSPATH')) exit;
// ubl post slider callback function
if (!function_exists('unlimited_blocks_render_post_slider')) {
    function unlimited_blocks_render_post_slider($attr)
    {
        $attr = unlimited_blocks_array_sanitize($attr);
        $args = [
            'post_type' => 'post',
            "meta_key" => '_thumbnail_id'
        ];
        if (isset($attr['numberOfPosts']) && intval($attr['numberOfPosts'])) {
            $numberOfpost = $attr['numberOfPosts'];
            $args['posts_per_page'] = $numberOfpost;
            if (isset($attr["postCategories"]) && is_array($attr["postCategories"]) && !empty($attr["postCategories"])) {
                $args['category_name'] = join(',', $attr["postCategories"]);
            }
            $query = new WP_Query($args);
            $postHtml = '';
            if ($query->have_posts()) {
                $postAuthor = isset($attr['author'][0]['enable']) && $attr['author'][0]['enable']  ? true : false;
                $postDate = isset($attr['date'][0]['enable']) && $attr['date'][0]['enable']  ? true : false;
                $postDateModify = isset($attr['date'][0]['last_modified']) && $attr['date'][0]['last_modified']  ? true : false;
                $postExcerpt = isset($attr['excerpt'][0]['enable']) && $attr['excerpt'][0]['enable']  ? true : false;
                $postExcerptColor = $postExcerpt && $attr['excerpt'][0]['color'] ? $attr['excerpt'][0]['color'] : "";
                $metaStyleColor = isset($attr['meta_style'][0]['color']) && $attr['meta_style'][0]['color']  ? $attr['meta_style'][0]['color'] : "";
                $metaStyleFontSize = isset($attr['meta_style'][0]['fontSize']) && $attr['meta_style'][0]['fontSize']  ? $attr['meta_style'][0]['fontSize'] : "";
                $metashowCate = isset($attr['showCate'][0]['enable']) && $attr['showCate'][0]['enable']  ? true : false;
                $metashowshowTag = isset($attr['showTag'][0]['enable']) && $attr['showTag'][0]['enable']  ? true : false;
                // height and width       
                $sliderPara = isset($attr['sliderSetting'][0]) && is_array($attr['sliderSetting'][0])  ? $attr['sliderSetting'][0] : false;
                $slidersetting = [];
                if (isset($sliderPara["dimension"]['width']) && $sliderPara["dimension"]['width']) {
                    $slidersetting["width"] = $sliderPara["dimension"]['custom_width'];
                }
                if (isset($sliderPara["dimension"]['height']) && $sliderPara["dimension"]['height']) {
                    $slidersetting["height"] = $sliderPara["dimension"]['custom_height'];
                }
                // slider delay
                // autoTrigger
                $sliderDelay = isset($sliderPara['autoTrigger']["enable"]) && is_numeric($sliderPara['autoTrigger']["enable"]) && $sliderPara['autoTrigger']["delay"] > 0 ? $sliderPara['autoTrigger']["delay"] : 0;
                // effect 
                $sliderEffect = isset($sliderPara["sliderEffect"]) ? sanitize_text_field($sliderPara["sliderEffect"]) : "fadeEffect";
                $slidersetting = wp_json_encode($slidersetting);
                $postHtml .= '<div class="ubl-block-slide-wrapper" id="ubl-block-slide-wrapper">';

                // post title
                if (isset($attr['title'][0]['enable']) && $attr['title'][0]['enable'] && isset($attr['title'][0]['value']) && $attr['title'][0]['value'] != '') {
                    $titleHeadingStyle = isset($attr['title'][0]['backgroundColor']) && $attr['title'][0]['backgroundColor'] ? "background-color:" . $attr['title'][0]['backgroundColor'] . ";" : '';
                    $titleHeadingStyle .= isset($attr['title'][0]['color']) && $attr['title'][0]['color'] ? "color:" . $attr['title'][0]['color'] . ";" : '';
                    $titleHeadingStyle .= isset($attr['title'][0]['fontSize']) && intval($attr['title'][0]['fontSize']) ? "font-size:" . $attr['title'][0]['fontSize'] . "px;" : '';
                    $titleHeadingStyle .= isset($attr['title'][0]['fontWeight']) && intval($attr['title'][0]['fontWeight']) ? "font-weight:" . $attr['title'][0]['fontWeight'] . ";" : '';
                    // title block
                    $headingBlockStyle = isset($attr['title'][0]['align']) && $attr['title'][0]['align'] ? "justify-content:" . $attr['title'][0]['align'] . ";" : '';
                    $headingBlockStyle .= isset($attr['title'][0]['backgroundColor']) && $attr['title'][0]['backgroundColor'] ? "border-color:" . $attr['title'][0]['backgroundColor'] . ";" : '';
                    $postHtml .= '<div style="' . $headingBlockStyle . '" class="ubl-block-post-title" id="ubl-block-post-title">';
                    $postHtml .= '<h4 style="' . $titleHeadingStyle . '">';
                    $postHtml .= __($attr['title'][0]['value'], "unlimited-blocks");
                    $postHtml .= '</h4>';
                    $postHtml .= "</div>";
                }

                $postHtml .= "<div class='ubl-slider-container' sliderDelay='" . $sliderDelay . "'>";
                // next previous
                if (isset($sliderPara["leftRightTrigger"]['enable']) && $sliderPara["leftRightTrigger"]['enable']) {
                    $LRfontSize = isset($sliderPara["leftRightTrigger"]['fontSize']) ? intval($sliderPara["leftRightTrigger"]['fontSize']) : "";
                    $LRcolor = isset($sliderPara["leftRightTrigger"]['color']) ? $sliderPara["leftRightTrigger"]['color'] : '';
                    $LRbGColor = isset($sliderPara["leftRightTrigger"]['backgroundColor']) ? $sliderPara["leftRightTrigger"]['backgroundColor'] : '';
                    $LRstyle = 'font-size:' . $LRfontSize . 'px;' . 'color:' . $LRcolor . ';background-color:' . $LRbGColor . ';';
                    $postHtml .= "<div class='ubl-slider-bullet-next-prev next'>";
                    $postHtml .= '<span style="' . $LRstyle . '"><i class="fas fa-arrow-right"></i></span>';
                    $postHtml .= "</div>";
                    $postHtml .= "<div class='ubl-slider-bullet-next-prev prev'>";
                    $postHtml .= '<span style="' . $LRstyle . '"><i class="fas fa-arrow-left"></i></span>';
                    $postHtml .= "</div>";
                }
                // next previous
                // slider bullet
                $postHtml .= "<ul class='ubl-slider-ul-slides " . $sliderEffect . "' slidersetting='" . $slidersetting . "'>";
                while ($query->have_posts()) {
                    $query->the_post();
                    if (get_the_post_thumbnail_url()) {
                        $postHtml .= "<li class='slides'>";
                        $postHtml .= "<div class='ubl-slider-wrapper' id='ubl-slider-wrapper'>";
                        $postHtml .= "<div class='ubl-slider-container'>";
                        $postHtml .= "<div class='ubl-slider-content-wrapper'>";
                        // three divs
                        $postHtml .= '<div class="ubl-slider-image-container" style="background-image: url(' . esc_url(get_the_post_thumbnail_url()) . ');"></div>';
                        $overLayColor = '';
                        if (isset($sliderPara["overlayColor"]['type'])) {
                            if ($sliderPara["overlayColor"]['type'] == "color") {
                                $overLayColor .= "background-color:" . $sliderPara["overlayColor"]['color'] . ";";
                            } else if ($sliderPara["overlayColor"]['type'] == "gradient") {
                                $overLayColor .= "background-image:" . $sliderPara["overlayColor"]['gradient'] . ";";
                            }
                            $overLayColor .= "opacity:" . $sliderPara["overlayColor"]['opacity'] / 10 . ";";
                        }


                        $postHtml .= "<div class='ubl-slider-text' style='" . $overLayColor . "'>";
                        $postHtml .= "<div class='slider-post-content'>";
                        $postHtml .= "<div class='post-wrapper content-align-" . $sliderPara["contentAlign"] . "'>";
                        $postHtml .= "<div class='post-content'>";
                        if (isset($attr['heading'][0]['tag']) && $attr['heading'][0]['tag'] && isset($attr['heading'][0]['color'])) {
                            $postHtml .= "<" . $attr['heading'][0]['tag'] . " style='color:" . $attr['heading'][0]['color'] . "' class='post-heading'>";
                            $postHtml .= "<a href='" . esc_url(get_the_permalink()) . "'>" . get_the_title() . "</a>";
                            $postHtml .= "</" . $attr['heading'][0]['tag'] . ">";
                        }
                        // category
                        if ($metashowCate) {
                            $postHtml .= '<p class="post-category">';
                            $category_ = get_the_category();
                            $category_ = wp_json_encode($category_);
                            $category_ = json_decode($category_, true);
                            if (!empty($category_)) {
                                $catestyle = isset($attr['showCate'][0]['fontSize']) && $attr['showCate'][0]['fontSize'] ? 'font-size:' . $attr['showCate'][0]['fontSize'] . 'px;' : '';
                                if (isset($attr['showCate'][0]['customColor']) && $attr['showCate'][0]['customColor']) {
                                    $catestyle .= isset($attr['showCate'][0]['backgroundColor']) && $attr['showCate'][0]['backgroundColor'] ? 'background-color:' . $attr['showCate'][0]['backgroundColor'] . ';' : '';
                                    $catestyle .= isset($attr['showCate'][0]['color']) && $attr['showCate'][0]['color'] ? 'color:' . $attr['showCate'][0]['color'] . ';' : '';
                                }
                                // 
                                if (isset($args['category__in']) && is_array($args['category__in']) && !empty($args['category__in'])) {
                                    $category__in = $args['category__in'];
                                    foreach ($category__in as $newArraycate) {
                                        foreach ($category_ as $cateKKey => $cateValue_) {
                                            if ($newArraycate == $cateValue_['term_id']) {
                                                unset($category_[$cateKKey]);
                                                array_unshift($category_, ['name' => $cateValue_['name'], 'term_id' => $cateValue_['term_id']]);
                                            }
                                        }
                                    }
                                }
                                $countCate = 0;
                                foreach ($category_ as $cateValue) {
                                    if (isset($cate_[0]['count']) && intval($cate_[0]['count']) && $cate_[0]['count'] == $countCate) break;
                                    $postHtml .= '<span style="' . $catestyle . '">';
                                    $postHtml .= "<a href='" . esc_url(get_category_link($cateValue['term_id'])) . "'>" . $cateValue['name'] . "</a>";
                                    $postHtml .= '</span>';
                                    $countCate++;
                                }
                            }
                            $postHtml .= '</p>';
                        }
                        // category
                        $postHtml .= '<div class="post-meta-all">';
                        if ($postAuthor) {
                            $postHtml .= "<p style='color:" . $metaStyleColor . ";font-size:" . $metaStyleFontSize . "px;' class='post-author'>";
                            $postHtml .= "<a target='_blank' href='" . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . "'>";
                            $postHtml .=  get_the_author();
                            $postHtml .= "</a></p>";
                        }

                        if ($postDate) {
                            $postHtml .= $postAuthor ? '<span style="font-size:' . $metaStyleFontSize . 'px;color:' . $metaStyleColor . ';" class="slash">/</span>' : '';
                            $dateYear =   get_the_date('Y');
                            $dateMonth =   get_the_date('m');
                            $dateDay =   get_the_date('j');
                            $postHtml .= "<p style='color:" . $metaStyleColor . ";font-size:" . $metaStyleFontSize . "px;' class='post-date'>";
                            $postHtml .= "<a target='_blank' href='" . esc_url(get_day_link($dateYear, $dateMonth, $dateDay)) . "'>";
                            $postHtml .=  get_the_date();
                            $postHtml .= "</a></p>";
                        }
                        if ($postDateModify) {
                            $postHtml .= $postAuthor || $postDate ? '<span style="font-size:' . $metaStyleFontSize . 'px;color:' . $metaStyleColor . ';" class="slash">/</span>' : '';
                            $dateYear =   get_the_modified_date('Y');
                            $dateMonth =   get_the_modified_date('m');
                            $dateDay =   get_the_modified_date('j');
                            $postHtml .= "<p style='color:" . $metaStyleColor . ";font-size:" . $metaStyleFontSize . "px;' class='post-date-last-modified'>";
                            $postHtml .= __('Modified', "unlimited-blocks") . ":<a target='_blank' href='" . esc_url(get_day_link($dateYear, $dateMonth, $dateDay)) . "'>";
                            $postHtml .=  get_the_modified_date();
                            $postHtml .= "</a></p>";
                        }
                        $postHtml .= '</div>';

                        if ($postExcerpt) {
                            $postExcerpt = get_the_excerpt();
                            // exerpt length
                            $exLength = isset($attr['excerpt'][0]['words']) && $attr['excerpt'][0]['words']  ? $attr['excerpt'][0]['words'] : false;
                            if ($exLength) {
                                $postExcerpt = explode(" ", $postExcerpt);
                                $postExcerpt = array_slice($postExcerpt, 0, $exLength);
                                $postExcerpt = implode(" ", $postExcerpt);
                            }
                            $excerptFs = isset($attr['excerpt'][0]['fontSize']) && intval($attr['excerpt'][0]['fontSize']) ? intval($attr['excerpt'][0]['fontSize']) : false;
                            $postHtml .= "<p style='color:" . $postExcerptColor . ";font-size:" . $excerptFs . "px;' class='post-excerpt'>";
                            $postHtml .= $postExcerpt;
                            $postHtml .= "</p>";
                        }
                        // tags
                        if ($metashowshowTag) {
                            $tags = get_the_tags(get_the_ID());
                            $postHtml .= '<p class="post-tags">';
                            if (!empty($tags)) {
                                $Tagstyle = isset($tags_[0]['fontSize']) && intval($tags_[0]['fontSize']) ? 'font-size:' . intval($tags_[0]['fontSize']) . 'px;' : '';
                                $Tagstyle .= isset($tags_[0]['backgroundColor']) && $tags_[0]['backgroundColor'] ? 'background-color:' . $tags_[0]['backgroundColor'] . ';' : '';
                                $Tagstyle .= isset($tags_[0]['color']) && $tags_[0]['color'] ? 'color:' . $tags_[0]['color'] . ';' : '';
                                $tagCount = 0;
                                foreach ($tags as $tagValue) {
                                    if (isset($attr['showTag'][0]['count']) && is_numeric($attr['showTag'][0]['count']) && $attr['showTag'][0]['count'] == $tagCount) break;
                                    $postHtml .= '<span style="' . $Tagstyle . '">';
                                    $postHtml .= "<a href='" . esc_url(get_category_link($tagValue->term_id)) . "'>" . $tagValue->name . "</a>";
                                    $postHtml .= '</span>';
                                    $tagCount++;
                                }
                            }
                            $postHtml .= '</p>';
                        }

                        $postHtml .= "</div>";
                        $postHtml .= "</div>";
                        $postHtml .= "</div>";
                        $postHtml .= "</div>";
                        // three divs
                        $postHtml .= "</div>";
                        $postHtml .= "</div>";
                        $postHtml .= "</div>";
                        $postHtml .= "</li>";
                    }
                }
                $postHtml .= "</ul>";
                // linear bullet 
                if (isset($sliderPara["linearTrigger"]['enable']) && $sliderPara["linearTrigger"]['enable']) {
                    $LfontSize = isset($sliderPara["linearTrigger"]['fontSize']) && intval($sliderPara["linearTrigger"]['fontSize']) ? intval($sliderPara["linearTrigger"]['fontSize']) : '';
                    $Lcolor = isset($sliderPara["linearTrigger"]['color']) && $sliderPara["linearTrigger"]['color'] ? $sliderPara["linearTrigger"]['color'] : '';
                    $LactiveColor = isset($sliderPara["linearTrigger"]['activeColor']) && $sliderPara["linearTrigger"]['activeColor'] ? $sliderPara["linearTrigger"]['activeColor'] : '';
                    $positionTrigger = isset($sliderPara["linearTrigger"]['place']) && $sliderPara["linearTrigger"]['place'] ? $sliderPara["linearTrigger"]['place'] : '';
                    $bulletOrThumbnail = isset($sliderPara["linearTrigger"]['trigger']) && $sliderPara["linearTrigger"]['trigger'] == "thumbnail" ? "thumbnail-image" : '';
                    $postHtml .= '<ul class="ubl-slider-bullet-trigger ' . $bulletOrThumbnail . ' trigger_' . $positionTrigger . '" active-color="' . $LactiveColor . '" childstyle="height: ' . $LfontSize . 'px;width:' . $LfontSize . 'px;background-color: ' . $Lcolor . ';">';
                    while ($query->have_posts()) {
                        $query->the_post();
                        if (get_the_post_thumbnail_url()) {
                            if ($sliderPara["linearTrigger"]['trigger'] == "bullet") {
                                $postHtml .= '<li><span style="height: ' . $LfontSize . 'px;width:' . $LfontSize . 'px;background-color: ' . $Lcolor . ';"></span></li>';
                            } else {
                                $postHtml .= '<li><div><img src="' . esc_url(get_the_post_thumbnail_url()) . '"></div></li>';
                            }
                        }
                    }
                    $postHtml .= '</ul>';
                }
                // slider bullet
                $postHtml .= "</div>";
                $postHtml .= "</div>";
                // echo "</pre>";
                wp_reset_postdata();
                return $postHtml;
            } else {
                return "<div>" . __("No post found.", "unlimited-blocks") . "</div>";
            }
        }
        // block code *******************
    }
}