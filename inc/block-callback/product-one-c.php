<?php
if (!defined('ABSPATH')) exit;
// ubl post callback function
if (!function_exists('unlimited_blocks_product_one')) {
    function unlimited_blocks_product_one($attr)
    {
        echo "<pre>";
        print_r($attr);
        echo "</pre>";
        $postClass = new Th_Simple_Product();
        $products_ = $postClass->simple_product_slider();
        return "<h1>product ff aadded. </h1>";
    }
}
