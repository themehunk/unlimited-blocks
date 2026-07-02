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
                "numberOfrow" => 1,
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
                "bgColor" => "#ffffff",
                "borderWidthLink" => true,
                "borderStyle" => "solid",
                "borderWidth" => 0,
                "borderColor" => "#eeeeee",
                "borderRadiusLink" => true,
                "borderRadius" => 12,
                'boxShadowColor' => '#00000000',
                'boxShadowColorHover' => '#00000000',
            ]
        ],
        "addToCart" => [
            "type" => "object",
            "default" => [
                "enable" => true,
                "Color" => "#20c9ae",
                "bgColor" => "#20c9ae00",
                "ColorHover" => "#ffffff",
                "bgColorHover" => "#20c9ae",
                "borderWidth" => "1px",
                "borderWidthLink" => true,
                "borderStyle" => "solid",
                "borderColor" => "#20c9ae",
                "borderRadius" => "8px",
                "borderRadiusLink" => true,
                "paddingV" => '26',
                "paddingH" => '120',
            ]
        ],
        "productTitle" => [
            "type" => "object",
            "default" => [
                'color' => "#3b3b3b",
                'colorHover' => "#20c9ae",
                'fontSize' => 14
            ]
        ],
        "ratingStyle" => [
            "type" => "object",
            "default" => [
                'color' => "#fa8e1e",
                'bgColor' => "#d3ced2",
                'fontSize' => "14"
            ]
        ],
        "priceStyle" => [
            "type" => "object",
            "default" => [
                'color' => "#20c9ae",
                'discountColor' => "#9a9a9a",
                'fontSize' => 14
            ]
        ],
        "saleStyle" => [
            "type" => "object",
            "default" => [
                'color' => "#fff",
                'bgColor' => "#e6462e",
                'fontSize' => 12
            ]
        ],
        "buttonsStyle" => [
            "type" => "object",
            "default" => [
                'color' => "#555555",
                'colorHover' => "#20c9ae",
                'fontSize' => 14
            ]
        ],
    ]
]);
