import React from 'react';
import Slider from './Slider';
import FeaturedArtifacts from './FeaturedArtifacts';
import ExtraSection from './ExtraSection';
import ExtraSection2 from './ExtraSection2';
import CustomerReviews from './CustomerReviews';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <ExtraSection></ExtraSection>
            <FeaturedArtifacts></FeaturedArtifacts>
            <ExtraSection2></ExtraSection2>
            <CustomerReviews></CustomerReviews>
        </div>
    );
};

export default Home;