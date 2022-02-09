<?php
if (!defined('ABSPATH')) exit;
// ubl post callback function
if (!function_exists('unlimited_blocks_product_one')) {
    function unlimited_blocks_product_one($attr)
    {
        // echo "<pre>";
        // print_r($attr);
        // echo "</pre>";
        $postClass = new Th_Simple_Product();
        $cate = [];
        $options = [];
        if (isset($attr['numberOfPosts'])) {
            $options['number_of_product'] = $attr['numberOfPosts'];
        }
        if (isset($attr['product_show_by'])) {
            $options['product_show_by'] = $attr['product_show_by'];
        }
        if (isset($attr['sliderSettings']['numberOfColumn'])) {
            $options['number_of_column_slide'] = $attr['sliderSettings']['numberOfColumn'];
        }
        $options['number_of_column_slide_mobile'] = 1;
        $options['number_of_column_slide_tablet'] = 2;
        if (isset($attr['loop']) && $attr['loop'] == '1') {
            $options['slider_loop'] = 1;
        }
        $options['add_to_cart_text'] = __("Add To Cart", 'unlimited-blocks');
        $options['add_to_cart_icon_on'] = 'on';
        $options['autoPlaySpeed'] = 3;
        $sliderSetting['slider_controll'] = $options['sliderSettings']['slider_controll'];
        if (isset($attr['product_cate']) && !empty($attr['product_cate'])) {
            $cate = $attr['product_cate'];
        }
        // options 
        // options 
        $products_ = $postClass->simple_product_slider($cate, $options);

        if ($products_) {
            return '<div ubl-block-style="" class="ul-blocks-simple-product ' . $attr['wrapper_id'] . '" ubl-block-styler="">' . $products_ . '</div>';
        }

        return $products_;
        // return "<h1>product ff aadded. </h1>";
    }
}
