import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import { tabs } from "../services/tabs";
import AiArt from "../components/AiArt";
import Stories from "../components/AiStories";
import Designer from "../components/Designer";
import Home from "../components/Home";
import Settings from "../components/Settings";
import Upgrade from "../components/Upgrade";
import StoryAnswers from "../components/StoryAnswers";
import ArtPrompt from "../components/ArtPrompt";
import ArtPainting from "../components/ArtPainting";
import StoryEditor from "../components/StoryEditor";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [activeSideBar, setActiveSideBar] = useState(true);
  const [activeSettings, setActiveSettings] = useState(1);
  const [activeNavScreens, setActiveNavScreens] = useState(false);
  const [activeNavigation, setActiveNavigation] = useState(1);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
    setActiveSideBar(true);
    // bodyElement.style.backgroundColor = 'red';
  };
  useEffect(()=>{
    if(activeTab === 2){
      document.body.style.backgroundColor = "white";
    }
    document.body.style.backgroundColor = "#F8FBFF";
  },[activeTab])
  const handleSettingsClick = () => {
    setActiveTab(0);
    setActiveSideBar(false);
    setActiveNavScreens(false);
    setActiveSettings(1);
  };

  const handleUpgradeClick = () => {
    setActiveTab(0);
    setActiveSideBar(false);
    setActiveNavScreens(false);
    setActiveSettings(2);
  };

  const handleStoryNavigation = () => {
    setActiveSideBar(false);
    setActiveNavScreens(true);
    setActiveNavigation(1);
  };

  const handleEditorNavigation = () => {
    setActiveSideBar(false);
    setActiveNavScreens(true);
    setActiveNavigation(3);
  };

  const handleArtNavigation = () => {
    setActiveSideBar(false);
    setActiveNavScreens(true);
    setActiveNavigation(2);
  };

  const handleArtPaintNavigation = () => {
    setActiveSideBar(false);
    setActiveNavScreens(true);
    setActiveNavigation(4);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <Home />;
      case 2:
        return <Designer />;
      case 3:
        return <Stories handleNavigation={handleStoryNavigation} />;
      case 4:
        return <AiArt handleNavigation={handleArtNavigation} />;
      default:
        return <Home />;
    }
  };

  const renderHeaderContent = () => {
    switch (activeSettings) {
      case 1:
        return <Settings />;
      case 2:
        return <Upgrade />;
      default:
        return null;
    }
  };

  const renderNavigations = () => {
    switch (activeNavigation) {
      case 1:
        return <StoryAnswers handleEditorNavigation={handleEditorNavigation}/>;
      case 2:
        return <ArtPrompt handleArtPainting={handleArtPaintNavigation} />;
      case 3:
        return <StoryEditor/>;
      case 4:
        return <ArtPainting />;
      default:
        return null;
    }
  };
  return (
    <>
      <Header
        handleSettingsClick={handleSettingsClick}
        handleUpgradeClick={handleUpgradeClick}
      />
      <LeftSideBar
        tabs={tabs}
        activeTab={activeTab}
        renderTabContent={
          activeSideBar
            ? renderTabContent
            : activeNavScreens
            ? renderNavigations
            : renderHeaderContent
        }
        handleTabClick={handleTabClick}
      />
    </>
  );
};

export default Dashboard;
