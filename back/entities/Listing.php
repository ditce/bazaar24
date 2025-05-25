<?php
require_once __DIR__ . '/BaseModel.php';

class Listing extends Model {
    protected $table = 'listings';

    public static function getFeatured($limit = 4) {
        $pdo = Database::connect();
        if (!$pdo) {
            error_log("Database connection failed in getFeatured");
            return [];
        }

        $sql = 'SELECT * FROM listings WHERE is_featured = TRUE ORDER BY created_at DESC LIMIT :limit';
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();

        $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map(fn($listing) => new static($listing), $listings);
    }

    public static function search($query = null, $category = null, $filters = [], $maxPrice = null) {
        $pdo = Database::connect();
        if (!$pdo) {
            error_log("Database connection failed in search");
            throw new Exception("Database connection failed");
        }

        try {
            error_log("Search params: query=" . ($query ?? 'null') . ", category=" . ($category ?? 'null') . 
                      ", filters=" . json_encode($filters) . ", maxPrice=" . ($maxPrice ?? 'null'));

            $sql = 'SELECT l.* FROM listings l WHERE 1=1';
            $params = [];

            if ($query) {
                $sql .= ' AND (l.title ILIKE :query OR l.description ILIKE :query)';
                $params['query'] = '%' . $query . '%';
            }

            if ($category) {
                $sql .= ' AND l.category = :category';
                $params['category'] = $category;
            }

            if (isset($filters['subcategory_id'])) {
                $sql .= ' AND l.subcategory_id = :subcategory_id';
                $params['subcategory_id'] = $filters['subcategory_id'];
            }

            if (isset($filters['location'])) {
                $sql .= ' AND l.location ILIKE :location';
                $params['location'] = '%' . $filters['location'] . '%';
            }

            if ($maxPrice) {
                $sql .= ' AND CAST(REGEXP_REPLACE(l.price, \'[^0-9.]\', \'\', \'g\') AS NUMERIC) <= :maxPrice';
                $params['maxPrice'] = $maxPrice;
            }


            foreach ($filters as $key => $value) {
                if (in_array($key, ['subcategory_id', 'location'])) {
                    continue;
                }
                
                if (!empty($value)) {
                    $sql .= " AND l.$key = :$key";
                    $params[$key] = $value;
                }
            }

            $sql .= ' ORDER BY l.created_at DESC LIMIT 20';
            error_log("SQL Query: " . $sql);
            
            $stmt = $pdo->prepare($sql);

            foreach ($params as $key => $value) {
                $stmt->bindValue(":$key", $value);
                error_log("Binding $key = $value");
            }
            
            $stmt->execute();

            $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            error_log("Found " . count($listings) . " listings");
            
            return array_map(fn($listing) => new static($listing), $listings);
        } catch (PDOException $e) {
            error_log("Database error in search: " . $e->getMessage());
            throw new Exception("Database error: " . $e->getMessage());
        } catch (Exception $e) {
            error_log("Error in search method: " . $e->getMessage());
            throw $e;
        }
    }

    public static function getRelatedListings($listingId, $limit = 4) {
        $pdo = Database::connect();
        if (!$pdo) {
            error_log("Database connection failed in getRelatedListings");
            return [];
        }

        try {
            $currentListing = self::find($listingId);
            
            if (!$currentListing) {
                return [];
            }
            
            $category = $currentListing->category ?? null;
            $subcategoryId = $currentListing->subcategory_id ?? null;
            
            // Query to find related listings based on category and/or subcategory
            $sql = 'SELECT * FROM listings WHERE id != :id';
            $params = ['id' => $listingId];
            
            if ($category) {
                $sql .= ' AND category = :category';
                $params['category'] = $category;
            }
            
            if ($subcategoryId) {
                $sql .= ' AND subcategory_id = :subcategory_id';
                $params['subcategory_id'] = $subcategoryId;
            }
            
            $sql .= ' ORDER BY created_at DESC LIMIT :limit';
            
            $stmt = $pdo->prepare($sql);
            
            // Need to bind limit parameter separately for PDO::PARAM_INT
            foreach ($params as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            
            $stmt->execute();
            
            $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return array_map(fn($listing) => new static($listing), $listings);
        } catch (Exception $e) {
            error_log("Error in getRelatedListings: " . $e->getMessage());
            return [];
        }
    }
}
?>
