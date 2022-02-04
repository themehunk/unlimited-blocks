<?php
if (!defined('ABSPATH')) exit;
unlimited_blocks_register_block_fn('ubl-product',  [
    "render_callback" => "unlimited_blocks_product_one",
    'attributes' => [
        // save client id
        'wrapper_id' => ["type" => 'string', "default" => false],
        'align' => ['type' => "string", 'default' => false],
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

        'sliderSettings' => [
            'type' => "object",
            "default" => [
                "numberOfColumn" => 3,
                "numberOfrow" => 2,
                "autoplay" => "",
                "loop" => "",
                "sliderControl" => 'dots',
                "margin" => 10 // box spacing
            ]
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
                'boxShadowColor' => '#4b58ff40',
                'boxShadowColorHover' => '#4b58ff40',
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
