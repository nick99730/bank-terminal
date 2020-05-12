import React, {Component} from 'react'
import styles from './SliderWindow.module.css'
import Slider from 'react-slick';
import cashback_img from '../../../cashback.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class SliderWindow extends Component {
    settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    slide1 =
        <div className={` ${styles.slide} position-relative`}>
            <div className={`d-flex pr-2 align-items-center ${styles.first_line}`}>
                <img src={cashback_img} alt="Cashback 5%" className="my-3"/>
                <div className="">
                    <span className={`${styles.promo}`}>Instant 5% cashback</span><br/>
                    <span className={styles.terms}>For all payments made with a NG.Money card.</span>
                </div>
            </div>
        </div>;
    slide2 =
        <div className={`${styles.slide} container`}>
            <div className={`mb-3 ml-3 mt-4 d-flex ${styles.lorem}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
        </div>;
    slide3 =
        <div className={`d-flex align-items-center ${styles.slide}`}>
            <div className={` ml-3 mr-3 ${styles.about_me_info}`}>
                <h6>
                    Developed by <span className={styles.i}>Nikolai Grigoryev</span> in the image and likeness
                    of the Yandex.money website as a course project on the subject "OSISP".
                </h6>
            </div>
        </div>;

    render() {
        return (
            <div>
                <Slider {...this.settings} className={`mt-3 ml-auto mr-3 ${styles.cashback_window}`}>
                    <div>
                        {this.slide1}
                    </div>
                    <div>
                        {this.slide2}
                    </div>
                    <div>
                        {this.slide3}
                    </div>
                </Slider>
            </div>
        )
    }
}

export default SliderWindow;
