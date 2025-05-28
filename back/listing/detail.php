<?php
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require __DIR__ . '/../entities/Listing.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Listing ID is required']);
    die();
}

$listingId = $_GET['id'];
$listing = Listing::findById($listingId);

if (!$listing) {
    http_response_code(404);
    echo json_encode(['error' => 'Listing not found']);
    die();
}

$response = [
    'id' => $listing->id ?? 0,
    'title' => $listing->title ?? '',
    'price' => $listing->price ?? 0,
    'image' => $listing->image_url ?? '',
    'type' => $listing->category ?? '',
    'description' => $listing->description ?? '',
    'location' => $listing->location ?? '',
    'features' => json_decode($listing->features ?? '[]', true) ?: [],
    'seller' => json_decode($listing->seller_info ?? '[]', true) ?: []
];

echo json_encode($response);
die();
?>
