import './PrimeContent.css';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import api from '../config/axiosPrimeConfig';
import { useNavigate } from 'react-router-dom';


const PrimeContent = () => {
    const navigate = useNavigate();
    const [primeSerieData, setPrimeSerieData] = useState([]);
    const [primeFilmData, setPrimeFilmData] = useState([]);
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        },
    };

    const CustomLeftArrow = ({ onClick }) => {
        return (
            <button
                className="custom-arrow custom-arrow-left"
                onClick={onClick}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        );
    };

    const CustomRightArrow = ({ onClick }) => {
        return (
            <button
                className="custom-arrow custom-arrow-right"
                onClick={onClick}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        );
    };

    useEffect(
        () => {
            console.log('get prime content');
            console.log(primeSerieData);
            try {
                api.get("series")
                .then(
                    response => {
                        if (response.data != null) {
                            setPrimeSerieData(response.data);
                        } else {
                            console.log('Error loading data from server');
                        }
                    }
                );

                api.get("films")
                .then(
                    response => {
                        if (response.data != null) {
                            setPrimeFilmData(response.data);
                        } else {
                            console.log('Error loading data from server');
                        }
                    }
                );
            } catch(err) {
                console.log(err);
            }
        }, 
        []
    );

    return (
        <>
            <Carousel
                responsive={responsive}
                arrows={true}
                autoPlaySpeed={2000}
                centerMode={true}
                containerClass="carousel-container"
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                dotListClass="custom-dot-list-style"
                draggable={true}
                focusOnSelect={true}
                infinite={true}
                keyBoardControl={true}
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable={true}
            >
                {
                    primeSerieData.map(
                        image => (
                            <div className='prime-card-container' key={image.id}>
                                
                                <button className='prime-card-button' onClick={() => navigate('/seriescontent', {state: {image}})}>
                                    <img 
                                        src={image.seriesImage} 
                                        alt={image.seriesTitle} 
                                    />
                                </button>
   
                            </div>
                        )
                    )
                }
                
                {
                    primeFilmData.map(
                        image => (
                            <div className='prime-card-container' key={image.id}>
                                
                                <button className='prime-card-button'>
                                    <img 
                                        src={image.poster} 
                                        alt={image.title} 
                                    />
                                </button>
   
                            </div>
                        )
                    )
                }

              
            </Carousel>
        </>
    );
} 

export default PrimeContent;