const products = [
    {
        id: 1,
        name: "Velvet Matte Lipstick",
        category: "makeup",
        categoryName: "Makeup",
        subcategory: "Lip Makeup",
        price: 299,
        oldPrice: 399,
        discount: 25,
        rating: 4.8,
        reviews: 38,
        badge: "BESTSELLER",
        image: "images/products/makeup/lipstick.jpg"
    },
    {
        id: 2,
        name: "Glow Foundation",
        category: "makeup",
        categoryName: "Makeup",
        subcategory: "Face Makeup",
        price: 599,
        oldPrice: 749,
        discount: 20,
        rating: 4.6,
        reviews: 27,
        badge: "NEW",
        image: "images/products/makeup/foundation.jpg"
    },
    {
        id: 3,
        name: "Volume Mascara",
        category: "makeup",
        categoryName: "Makeup",
        subcategory: "Eye Makeup",
        price: 349,
        oldPrice: 449,
        discount: 22,
        rating: 4.7,
        reviews: 31,
        badge: "20% OFF",
        image: "images/products/makeup/mascara.jpg"
    },
    {
        id: 4,
        name: "Soft Glow Blush",
        category: "makeup",
        categoryName: "Makeup",
        subcategory: "Face Makeup",
        price: 449,
        oldPrice: 549,
        discount: 18,
        rating: 4.5,
        reviews: 19,
        badge: "NEW",
        image: "images/products/makeup/blush.jpg"
    },
    {
        id: 5,
        name: "Vitamin C Glow Serum",
        category: "skincare",
        categoryName: "Skincare",
        subcategory: "Serums",
        price: 499,
        oldPrice: 699,
        discount: 29,
        rating: 4.9,
        reviews: 64,
        badge: "BESTSELLER",
        image: "images/products/skincare/serum.jpg"
    },
    {
        id: 6,
        name: "Hydra Glow Moisturizer",
        category: "skincare",
        categoryName: "Skincare",
        subcategory: "Moisturizers",
        price: 425,
        oldPrice: 500,
        discount: 15,
        rating: 4.7,
        reviews: 29,
        badge: "15% OFF",
        image: "images/products/skincare/moisturizer.jpg"
    },
    {
        id: 7,
        name: "Gentle Face Wash",
        category: "skincare",
        categoryName: "Skincare",
        subcategory: "Face Wash",
        price: 299,
        oldPrice: 349,
        discount: 14,
        rating: 4.6,
        reviews: 42,
        badge: "POPULAR",
        image: "images/products/skincare/face-wash.jpg"
    },
    {
        id: 8,
        name: "Rose Clay Face Mask",
        category: "skincare",
        categoryName: "Skincare",
        subcategory: "Face Masks",
        price: 379,
        oldPrice: 499,
        discount: 24,
        rating: 4.5,
        reviews: 23,
        badge: "NEW",
        image: "images/products/skincare/face-mask.jpg"
    },
    {
        id: 9,
        name: "Nourishing Hair Oil",
        category: "hair-care",
        categoryName: "Hair Care",
        subcategory: "Hair Oil",
        price: 349,
        oldPrice: 449,
        discount: 22,
        rating: 4.8,
        reviews: 46,
        badge: "BESTSELLER",
        image: "images/products/hair-care/hair-oil.jpg"
    },
    {
        id: 10,
        name: "Smooth & Shine Shampoo",
        category: "hair-care",
        categoryName: "Hair Care",
        subcategory: "Shampoo",
        price: 399,
        oldPrice: 499,
        discount: 20,
        rating: 4.6,
        reviews: 35,
        badge: "20% OFF",
        image: "images/products/hair-care/shampoo.jpg"
    },
    {
        id: 11,
        name: "Silky Hair Conditioner",
        category: "hair-care",
        categoryName: "Hair Care",
        subcategory: "Conditioner",
        price: 399,
        oldPrice: 499,
        discount: 20,
        rating: 4.5,
        reviews: 28,
        badge: "NEW",
        image: "images/products/hair-care/conditioner.jpg"
    },
    {
        id: 12,
        name: "Heat Protect Hair Spray",
        category: "hair-care",
        categoryName: "Hair Care",
        subcategory: "Hair Styling",
        price: 499,
        oldPrice: 599,
        discount: 17,
        rating: 4.4,
        reviews: 17,
        badge: "NEW",
        image: "images/products/hair-care/hair-spray.jpg"
    },
    {
        id: 13,
        name: "Bloom Eau de Parfum",
        category: "fragrance",
        categoryName: "Fragrance",
        subcategory: "Perfume",
        price: 799,
        oldPrice: 999,
        discount: 20,
        rating: 4.9,
        reviews: 51,
        badge: "BESTSELLER",
        image: "images/products/fragrance/perfume.jpg"
    },
    {
        id: 14,
        name: "Rose Mist Body Spray",
        category: "fragrance",
        categoryName: "Fragrance",
        subcategory: "Body Spray",
        price: 499,
        oldPrice: 649,
        discount: 23,
        rating: 4.5,
        reviews: 25,
        badge: "23% OFF",
        image: "images/products/fragrance/body-spray.jpg"
    },
    {
        id: 15,
        name: "Vanilla Dream Perfume",
        category: "fragrance",
        categoryName: "Fragrance",
        subcategory: "Perfume",
        price: 899,
        oldPrice: 1099,
        discount: 18,
        rating: 4.7,
        reviews: 33,
        badge: "POPULAR",
        image: "images/products/fragrance/vanilla.jpg"
    },
    {
        id: 16,
        name: "Fresh Bloom Mist",
        category: "fragrance",
        categoryName: "Fragrance",
        subcategory: "Body Mist",
        price: 449,
        oldPrice: 549,
        discount: 18,
        rating: 4.4,
        reviews: 16,
        badge: "NEW",
        image: "images/products/fragrance/mist.jpg"
    },
    {
        id: 17,
        name: "Coconut Body Scrub",
        category: "bath-body",
        categoryName: "Bath & Body",
        subcategory: "Body Scrub",
        price: 399,
        oldPrice: 499,
        discount: 20,
        rating: 4.7,
        reviews: 36,
        badge: "BESTSELLER",
        image: "images/products/bath-body/body-scrub.jpg"
    },
    {
        id: 18,
        name: "Rose Body Lotion",
        category: "bath-body",
        categoryName: "Bath & Body",
        subcategory: "Body Lotion",
        price: 349,
        oldPrice: 449,
        discount: 22,
        rating: 4.6,
        reviews: 30,
        badge: "22% OFF",
        image: "images/products/bath-body/body-lotion.jpg"
    },
    {
        id: 19,
        name: "Luxury Bath Bomb",
        category: "bath-body",
        categoryName: "Bath & Body",
        subcategory: "Bath",
        price: 249,
        oldPrice: 299,
        discount: 17,
        rating: 4.5,
        reviews: 18,
        badge: "NEW",
        image: "images/products/bath-body/bath-bomb.jpg"
    },
    {
        id: 20,
        name: "Shea Butter Hand Cream",
        category: "bath-body",
        categoryName: "Bath & Body",
        subcategory: "Hand Care",
        price: 279,
        oldPrice: 349,
        discount: 20,
        rating: 4.6,
        reviews: 21,
        badge: "POPULAR",
        image: "images/products/bath-body/hand-cream.jpg"
    },
    {
        id: 21,
        name: "Professional Makeup Brush Set",
        category: "beauty-tools",
        categoryName: "Beauty Tools",
        subcategory: "Makeup Brushes",
        price: 699,
        oldPrice: 899,
        discount: 22,
        rating: 4.8,
        reviews: 44,
        badge: "BESTSELLER",
        image: "images/products/beauty-tools/brush-set.jpg"
    },
    {
        id: 22,
        name: "Beauty Blender Set",
        category: "beauty-tools",
        categoryName: "Beauty Tools",
        subcategory: "Makeup Tools",
        price: 299,
        oldPrice: 399,
        discount: 25,
        rating: 4.7,
        reviews: 39,
        badge: "25% OFF",
        image: "images/products/beauty-tools/blender.jpg"
    },
    {
        id: 23,
        name: "Facial Roller",
        category: "beauty-tools",
        categoryName: "Beauty Tools",
        subcategory: "Skin Tools",
        price: 499,
        oldPrice: 699,
        discount: 29,
        rating: 4.6,
        reviews: 26,
        badge: "NEW",
        image: "images/products/beauty-tools/facial-roller.jpg"
    },
    {
        id: 24,
        name: "Compact Makeup Mirror",
        category: "beauty-tools",
        categoryName: "Beauty Tools",
        subcategory: "Accessories",
        price: 349,
        oldPrice: 449,
        discount: 22,
        rating: 4.4,
        reviews: 15,
        badge: "22% OFF",
        image: "images/products/beauty-tools/mirror.jpg"
    }
];

function getSellerProducts() {
    try {
        return JSON.parse(
            localStorage.getItem("earthEssentialSellerProducts")
        ) || [];
    } catch (error) {
        return [];
    }
}

function getAdminProducts() {
    try {
        return JSON.parse(
            localStorage.getItem("earthEssentialAdminProducts")
        ) || [];
    } catch (error) {
        return [];
    }
}

function getAllProducts() {
    return [
        ...products,
        ...getSellerProducts(),
        ...getAdminProducts()
    ];
}

function getProductById(id) {
    return getAllProducts().find(
        product => Number(product.id) === Number(id)
    );
}

function formatPrice(price) {
    return "₹" + Number(price).toLocaleString("en-IN");
}