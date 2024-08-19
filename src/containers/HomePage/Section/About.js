import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import css files


// import { FormattedMessage } from 'react-intl';

// import { changeLanguageApp } from '../../store/actions';


class About extends Component {
 
    render() {
        let settings ={
            dots: false,
            infinite:true,
            speed:500,
            slidesToShow:4,
            slidesToScroll:1,
 
        };
        return (
            <div className='section-share section-about'>
          <div className='section-about-header'>
            Marketting Say With Chloé
          </div>
          <div className='section-about-content'>
            <div className='content-left'>
            <iframe width="100%" height="400px" 
            src="https://www.youtube.com/embed/xTOpjgX7u4A" 
            title="The Chloé Winter 2024 Show by Creative Director Chemena Kamali"
                    frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
            </div>
            <div className='content-right'>
                <p>
            Chloé was founded in 1952 by Gaby Aghion, an Egyptian-born Parisian who liberated women from the formal fashion of the era by pioneering luxury ready-to-wear. A true visionary, Gaby believed that women should dare to be themselves.

Today, the Maison is a leading luxury French fashion house, which continues to embrace the founder’s vision of free-spirited femininity and effortlessness under the creative direction of Chemena Kamali.
         </p>   
         </div>
          </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);