import React from "react";
import Slider from "./Slider";
import FeaturedArtifacts from "./FeaturedArtifacts";
import ExtraSection from "./ExtraSection";
import ExtraSection2 from "./ExtraSection2";
import CustomerReviews from "./CustomerReviews";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home || Historical Artifacts Tracker</title>
      </Helmet>
      <Slider></Slider>
      <ExtraSection></ExtraSection>
      <FeaturedArtifacts></FeaturedArtifacts>
      <ExtraSection2></ExtraSection2>
      <CustomerReviews></CustomerReviews>
    </div>
  );
};

export default Home;
