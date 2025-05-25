<?php
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require __DIR__ . '/../entities/Listing.php';

$featuredListings = Listing::getFeatured();

$response = array_map(function($listing) {
    return [
        'id' => $listing->id,
        'title' => $listing->title,
        'price' => $listing->price,
        'image' => $listing->image_url,
        'type' => $listing->category
    ];
}, $featuredListings);

if (empty($response)) {
    http_response_code(404);
    echo json_encode(['error' => 'No featured listings found']);
    die();
}

echo json_encode($response);
die();
?>
