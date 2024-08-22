import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Medicalfacility from './Section/Medicalfacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './Section/HomeFooter';

import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        let settings ={
            dots: false,
            infinite:true,
            speed:500,
            slidesToShow:4,
            slidesToScroll:1,
        };

        return (
            <div>

                <HomeHeader isShowBanner={true}/>

                <div id="specialty">
                    <Specialty settings={settings}/>
                </div>

                <div id="medicalfacility">
                    <Medicalfacility settings={settings}/>
                </div>

                <div id="outstandingdoctor">
                    <OutStandingDoctor settings={settings}/>
                </div>

                <div id="lab">
                    <HandBook settings={settings}/>
                </div>

                <div id="doctor">
                    <About settings={settings}/>
                </div>

                <div id="medical">
                    <HomeFooter settings={settings}/>
                </div>

            </div>


        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);