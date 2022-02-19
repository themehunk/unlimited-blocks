<?php
if (!defined('ABSPATH')) exit;
// ubl post callback function
if (!function_exists('unlimited_blocks_owl_slider')) {
    function unlimited_blocks_owl_slider($attr)
    {
        // echo "<pre>";
        // print_r($ar);
        // echo "-wrapper-";
        // print_r($attr['wrapper']);
        // echo "</pre>";
        // return;
        // return;
        $html = "";
        $wrapperAlignment = $attr['wrapper']['alignment'];
        $contentSpacing = $attr['wrapper']['spacing'];

        $titleStyle = "font-size:{$attr['title']['fontSize']}px;color:{$attr['title']['color']};";
        $descriptionStyle = "font-size:{$attr['text']['fontSize']}px;color:{$attr['text']['color']};";
        $html .= "<div class='ubl-owl-slider-block'>";
        // slider wrapper 
        $sliderSetting = [];




        if ($attr['sliderSetting']['sliderEffect'] !== 'slide') {
            $sliderSetting['fade'] = true;
        }
        if ($attr['sliderSetting']['triggerActive'] == 'both' || $attr['sliderSetting']['triggerActive'] == 'arrows') {
            $sliderSetting['arrows'] = true;
        }
        if ($attr['sliderSetting']['triggerActive'] == 'both' || $attr['sliderSetting']['triggerActive'] == 'dots') {
            $sliderSetting['dots'] = true;
        }
        if ($attr['sliderSetting']['autoTrigger'] == 'true') {
            $sliderSetting['autoplay'] = true;
            $sliderSetting['autoplaySpeed'] = intval($attr['sliderSetting']['autoTriggerDelay']) * 1000;
        }
        // arrows (left right) true/false
        // autoplay true/false
        // autoplaySpeed 2000 
        // dots true/false
        // fade true/false in false slide active
        // infinite true/false infinite loop

        $sliderSetting = json_encode($sliderSetting);
        $html .= "<div data-slider='{$sliderSetting}' class='ubl-slick-slider-init ubl-slick-slider-block'>";
        // ubl-slick-slider-block
        foreach ($attr['slides'] as $slide_key => $value) {
            $overlayColor = false;
            $containerBg = $value['container']['bg'];
            if ($containerBg['backgroundType'] != "none") {
                $overlayColor = '';
                if ($containerBg['backgroundImage']) {
                    $overlayColor .= "opacity:{$containerBg['backgroundOpacity']};";
                }
                if ($containerBg['backgroundColorType']  == "color") {
                    $overlayColor .= "background-color:{$containerBg['backgroundColor']};";
                } else if ($containerBg['backgroundColorType']   == "gradient") {
                    $overlayColor .= "background-image:{$containerBg['backgroundImageGradient']};";
                }
            }

            $html .= '<div class="ubl-slider-wrapper">';
            // slides 
            // background image 
            $html .= '<div class="ubl-slider-container">
            <div class="ubl-slider-content-wrapper">';
            // ubl-slider-content-wrapper
            // ---------start----------
            if ($overlayColor && $containerBg['backgroundImage']) {
                $html .= "<div class='ubl-slider-image-container' style='background-size:{$containerBg['backgroundImageSize']};background-image:url({$containerBg['backgroundImage']});'>";
                $html .= '</div>';
            }
            // ---------end----------
            // overlay color 
            $html .= "<div class='ubl-slider-overlay-color' style='{$overlayColor}'></div>";
            // overlay color 
            $html .= "<div class='ubl-slider-text {$wrapperAlignment}'>";
            $html .= "<div style='grid-gap:{$contentSpacing}px;'>";
            // ubl-slider-text 
            $html .= "<h1 style='{$titleStyle}'>{$value['title']['text']}</h1>";
            $html .= "<h2 style='{$descriptionStyle}'>{$value['text']['text']}</h2>";
            $html .= '<div class="button-container">';
            // button 
            if ($value['buttoneOne']['enable']) {
                $html .= "<a href='{$value['buttoneOne']['link']}'>{$value['buttoneOne']['text']}</a>";
            }
            if ($value['buttoneTwo']['enable']) {
                $html .= "<a href='{$value['buttoneTwo']['link']}'>{$value['buttoneTwo']['text']}</a>";
            }
            // button 
            $html .= '</div>';
            // ubl-slider-text 
            $html .= '</div>';
            $html .= '</div>';
            // ubl-slider-content-wrapper
            $html .= "</div>";
            $html .= "</div>";
            // ---------------------------------
            // slides 
            $html .= '</div>';
            // echo 'slide' . $slide_key;
        }
        // ubl-slick-slider-block
        $html .= "</div>";
        // slider wrapper 
        $html .= "</div>";
        return $html;
    }
}
