<?php

/**
 * for porduct ------------------------------------- woocommerce ------------------------
 */

if (!function_exists('unlimited_blocks_product_api_result')) {
    function unlimited_blocks_product_api_result(\WP_REST_Request $request)
    {
        $request_params  = $request->get_params();
        // return $request_params  = $request->get_params();
        // first time initillize
        $firstTimeInit = isset($request_params['initialize']) && intval($request_params['initialize']) ? true : false;
        // number of post 
        $numberOfPost = isset($request_params['numberOfPosts']) && intval($request_params['numberOfPosts']) ? intval($request_params['numberOfPosts']) : false;
        //post category
        // $postCategories = isset($request_params['postCategories']) && $request_params['postCategories'] != '' ? sanitize_text_field($request_params['postCategories']) : false;
        //featured image
        // $featured_image = isset($request_params['featured_image']) && intval($request_params['featured_image']) ? intval($request_params['featured_image']) : false;
        if ($numberOfPost) {
            $sendArgument = ['posts_per_page' => $numberOfPost];
            // category filter by slug
            // if ($postCategories) {
            //     $sendArgument['category_name'] = $postCategories;
            // }
            // // category filter by slug
            // if ($featured_image) {
            //     $sendArgument['meta_key'] = '_thumbnail_id';
            // }
            // // =======++++++++data retrived++++++++========
            if ($firstTimeInit) {
                return unlimited_blocks_Product_Api_firstTimeIntilize($sendArgument);
            } else {
                return unlimited_blocks_Product_Filter($sendArgument);
            }
        }
    }
}
// first time init function 
if (!function_exists('unlimited_blocks_Product_Api_firstTimeIntilize')) {
    function unlimited_blocks_Product_Api_firstTimeIntilize($sendArgument)
    {
        $returnPostData = array(
            'posts' => [],
            "totalPost" => '',
            "category" => ''
        );
        // for category 
        $allCategory = get_terms(
            array(
                'taxonomy' =>  'product_cat',
                'fields'   => 'all',
                'hide_empty' => true,
            )
        );
        $returnPostData['category'] = $allCategory && !empty($allCategory) ? $allCategory : '';
        //    for post and total post 
        $args = array(
            'post_type'           => 'product',
            'post_status'         => 'publish',
        );
        $args = array_merge($args, $sendArgument);
        $query = new WP_Query($args);
        if ($query->have_posts()) {
            $returnPostData['totalPost'] = $query->found_posts;
            while ($query->have_posts()) {

                $query->the_post();
                $productId = get_the_ID();
                $product = wc_get_product($productId);
                $regularPrice = $product->get_regular_price();
                $currentPrice = $product->get_price();
                $currentPricehtml = $product->get_price_html();
                $rating = $product->get_average_rating();
                $count_rating = $product->get_rating_count();
                $ratingHtml = $count_rating > 0 ? wc_get_rating_html($rating, $count_rating) : false;
                $checkSale = $regularPrice > $currentPrice ? true : false;
                // sale price 
                $ps_sale = '';
                if ($checkSale) {
                    $salePrice = $regularPrice - $currentPrice;
                    // $saleText = __('Sale', 'elemento-addons');
                    $currency_ = get_woocommerce_currency_symbol();
                    $ps_sale = '<div class="elemento-addons-sale">
                                <span class="elemento-addons-sale-tag">-' . $currency_ . $salePrice . '</span>
                            </div>';
                }
                $singlePost = [];
                $singlePost['product_title'] = $product->get_name();
                $singlePost['product_image'] = $product->get_image();
                $singlePost['sale'] = $ps_sale;
                $singlePost['rating'] = $ratingHtml;
                $singlePost['price'] = $currentPricehtml;
                $returnPostData['posts'][] = $singlePost;
            }
        } else {
            $returnPostData['posts'] = '';
            $returnPostData['totalPost'] = '';
        }
        return $returnPostData;
    }
}
// post filter time init function
if (!function_exists('unlimited_blocks_Product_Filter')) {
    function unlimited_blocks_Product_Filter($sendArgument)
    {
        // $args = array('post_type' => 'post');
        // $args = array_merge($args, $sendArgument);
        // $query = new WP_Query($args);
        // $returnPostData = [
        //     'posts' => [],
        //     "totalPost" => '',
        // ];
        // if ($query->have_posts()) {
        //     $returnPostData['totalPost'] = $query->found_posts;
        //     while ($query->have_posts()) {
        //         $query->the_post();
        //         $singlePost = [];
        //         $singlePost['author'] = get_the_author();
        //         $singlePost['postTitle'] = get_the_title();
        //         if (get_the_permalink()) {
        //             $singlePost['feature_image'] = get_the_post_thumbnail_url();
        //         }
        //         $singlePost['post_categories'] = get_the_category();
        //         $singlePost['post_date'] = get_the_date();
        //         $singlePost['post_modified_date'] = get_the_modified_date();
        //         $singlePost['post_excerpt'] = get_the_excerpt();
        //         $singlePost['post_tag'] = get_the_tags(get_the_ID());
        //         $returnPostData['posts'][] = $singlePost;
        //     }
        // } else {
        //     $returnPostData['posts'] = '';
        // }
        // return $returnPostData;
    }
}
/**
 * for porduct ------------------------------------- woocommerce end ------------------------
 */
