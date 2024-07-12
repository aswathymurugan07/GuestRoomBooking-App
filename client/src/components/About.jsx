import React, { useState, useEffect } from 'react';
import './About.css'; 

const images = [
  "https://media.designcafe.com/wp-content/uploads/2020/04/13172427/simple-home-theatre-room-design.jpg",
  "https://assets.architecturaldigest.in/photos/6266caf0aa49c058d2c7bb1f/16:9/w_1615,h_908,c_limit/home%20office%20chennai.jpg",
  "https://housing.com/news/wp-content/uploads/2022/11/hotel-room-design-compressed-1.jpg"
];

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  return (
    <div className="slider">
      <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index + 1}`} />
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <button className="next" onClick={nextSlide}>&#10095;</button>
      <p className='para'>
        A homestay is a form of hospitality and lodging whereby visitors stay in a house or 
        apartment of a local of the city to which they are traveling. Homestays offer a unique and immersive travel 
        experience, providing guests with an opportunity to live like a local, gain cultural insights, and often establish lasting relationships.
        Staying with a local family allows guests to experience the culture, traditions, and daily life of the destination firsthand. Homestays 
        offer a rich and rewarding travel experience, providing an opportunity to connect deeply with the local culture and community.
        By choosing a homestay, travelers can enjoy a personalized and immersive experience that goes beyond the typical tourist path,
        making their journey truly memorable.
      </p>
    </div>
  );
};

export default About;
