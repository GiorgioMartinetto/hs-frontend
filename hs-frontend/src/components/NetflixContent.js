import { useNavigate } from 'react-router-dom';
import './NetflixContent.css';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProfileImage from './profile.png';
import api from '../config/axiosConfig';

const NetflixContent = () => {
    const navigate=useNavigate();
    const [netflixData, setNetflixData] = useState([]);
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
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
            console.log('get netflix content');
            console.log(netflixData);
            try {
                setNetflixData([
                    { id: 1, src: ProfileImage, alt: 'Image 1' },
                    { id: 2, src: ProfileImage, alt: 'Image 2' },
                    { id: 3, src: ProfileImage, alt: 'Image 3' }
                ]);
                // api.post(
                //     "streaming/getNeflix",
                //     {

                //     }
                // ).then(
                //     response => {
                //         if (response.data != null) {
                //             setNetflixData(response.data);
                //         } else {
                //             console.log('Error loading data from server');
                //         }
                //     }
                // );
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
                    netflixData.map(
                        image => (
                            <div key={image.id}>
                                <img 
                                    src={image.src} 
                                    alt={image.alt} 
                                    style={{
                                        width: '100%',

                                    }}
                                />
                            </div>
                        )
                    )
                }
            </Carousel>
        </>
    );
} 

export default NetflixContent;