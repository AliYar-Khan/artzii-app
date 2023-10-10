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
import { useStores } from "src/store/rootStore";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const store = useStores();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [activeSideBar, setActiveSideBar] = useState(true);
  const [activeSettings, setActiveSettings] = useState(1);
  const [activeNavScreens, setActiveNavScreens] = useState(false);
  const [activeNavigation, setActiveNavigation] = useState(1);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
    setActiveSideBar(true);
  };

  useEffect(() => {
    if (activeTab === 2) {
      document.body.style.backgroundColor = "white";
    }
    document.body.style.backgroundColor = "#F8FBFF";
  }, [activeTab]);

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

  if (!store.authStore.authToken) {
    return <Navigate to="/" replace />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <Home setActiveTab={setActiveTab} />;
      case 2:
        return <Designer setActiveTab={setActiveTab} />;
      case 3:
        return (
          <Stories
            handleNavigation={handleStoryNavigation}
            setActiveTab={setActiveTab}
          />
        );
      case 4:
        return (
          <AiArt
            handleNavigation={handleArtNavigation}
            setActiveTab={setActiveTab}
          />
        );
      default:
        return <Home setActiveTab={setActiveTab} />;
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
        return <StoryAnswers handleEditorNavigation={handleEditorNavigation} />;
      case 2:
        return <ArtPrompt handleArtPainting={handleArtPaintNavigation} />;
      case 3:
        return <StoryEditor />;
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
