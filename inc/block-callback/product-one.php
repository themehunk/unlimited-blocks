<?php
if (!defined('ABSPATH')) exit;
unlimited_blocks_register_block_fn('ubl-product',  [
    "render_callback" => "unlimited_blocks_product_one",
    'attributes' => [
        // save client id
        'client_id' => ["type" => 'string', "default" => false],
        // layout 
        "product_cate" => [
            "type" => "array",
            "default" => []
        ],
        'numberOfPosts' => [
            'type' => "number",
            "default" => 6
        ],
        'product_show_by' => [
            "type" => "string",
            "default" => 'recent'
        ],
        "numberOfColumn" => [
            "type" => "number",
            "default" => 3
        ],
        "numberOfrow" => [
            "type" => "number",
            "default" => 3
        ],
        "autoplay" => [
            "type" => "string",
            "default" => 'off'
        ],
        "infiniteLoop" => [
            "type" => "string",
            "default" => 'off'
        ],
        "sliderControl" => [
            "type" => "string",
            "default" => 'dots'
        ],
        // style 
        "boxStyle" => [
            "type" => "object",
            "default" => [
                "bgColor" => "#b1b1b1",
                "borderWidthLink" => true,
                "borderStyle" => "solid",
                "borderWidth" => 0,
                "borderColor" => "#f8c045",
                "borderRadiusLink" => true,
                "borderRadius" => 0,
            ]
        ],
        "title" => [
            "type" => "object",
            "default" => [
                'color' => "",
                'font-size' => ""
            ]
        ],
    ]
]);
