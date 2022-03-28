import React from "react";
import HomeCarousel from "../ components/HomeCarousel";
import ProductPreview from "../ components/ProductPreview";

function Home() {
    return (
        <div>
            <HomeCarousel />
            <div className="featured-products-container container mt-4">
                <h2>Featured Products</h2>
                <div className="d-flex justify-content-center flex-wrap">
                    <ProductPreview />
                    <ProductPreview />
                    <ProductPreview />
                    <ProductPreview />
                    <ProductPreview />
                </div>
            </div>
        </div>
    );
}

export default Home;
