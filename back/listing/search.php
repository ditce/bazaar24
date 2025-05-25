<?php
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require __DIR__ . '/../entities/Listing.php';

$query = isset($_GET['query']) ? $_GET['query'] : null;
$category = isset($_GET['category']) ? $_GET['category'] : null;
$subcategory = isset($_GET['subcategory']) ? $_GET['subcategory'] : null;
$maxPrice = isset($_GET['maxPrice']) ? $_GET['maxPrice'] : null;
$location = isset($_GET['location']) ? $_GET['location'] : null;

$filters = [];

if ($subcategory) {
    $filters['subcategory_id'] = $subcategory;
}

if ($location) {
    $filters['location'] = $location;
}

$possibleFilters = ['make', 'rooms', 'propertyType', 'minSalary', 'position'];

foreach ($possibleFilters as $filter) {
    if (isset($_GET[$filter]) && !empty($_GET[$filter])) {
        $filters[$filter] = $_GET[$filter];
    }
}

try {
    $listings = Listing::search($query, $category, $filters, $maxPrice);

    $response = array_map(function($listing) {
        return [
            'id' => $listing->id,
            'title' => $listing->title,
            'price' => $listing->price,
            'image' => $listing->image_url,
            'type' => $listing->category,
            'description' => $listing->description,
            'location' => $listing->location
        ];
    }, $listings);

    if (empty($response)) {
        http_response_code(404);
        echo json_encode(['error' => 'No listings found matching your criteria']);
        die();
    }

    error_log(json_encode($response));


    echo json_encode($response);
} catch (Exception $e) {
    error_log("Search error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred while searching']);
}

die();
?>
