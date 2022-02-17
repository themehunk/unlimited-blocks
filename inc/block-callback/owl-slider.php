<?php
if (!defined('ABSPATH')) exit;
unlimited_blocks_register_block_fn('owl-slider',  [
    "render_callback" => "unlimited_blocks_owl_slider",
    'attributes' => []
]);
