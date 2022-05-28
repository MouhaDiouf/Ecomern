import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import firstCarousel from "../images/first-slide.jpg";
import "./HomeCarousel.css";
function HomeCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1651333175/ecomern-banner_dgqfnt.png" className="home-banner" />;
}

export default HomeCarousel;
