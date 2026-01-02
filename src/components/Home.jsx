import React from "react";
import Slider from "./Slider";
import FeaturedArtifacts from "./FeaturedArtifacts";
import ExtraSection from "./ExtraSection";
import ExtraSection2 from "./ExtraSection2";
import CustomerReviews from "./CustomerReviews";
import { Helmet } from "react-helmet-async";
import Hero from "./Hero";
import FAQSection from "./FAQSection";
import SupportAndStats from "./SupportAndStats";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home || Historical Artifacts Tracker</title>
      </Helmet>
      <Hero></Hero>
      {/* <Slider></Slider> */}
      {/* <ExtraSection></ExtraSection> */}
      <FeaturedArtifacts></FeaturedArtifacts>
      <FAQSection></FAQSection>
      <SupportAndStats></SupportAndStats>
      {/* <ExtraSection2></ExtraSection2> */}
      <CustomerReviews></CustomerReviews>
    </div>
  );
};

export default Home;
