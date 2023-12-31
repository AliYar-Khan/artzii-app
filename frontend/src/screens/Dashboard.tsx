import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import LeftSideBar from '../components/LeftSideBar'
import { tabs } from '../services/tabs'
import AiArt from '../components/AiArt'
import Stories from '../components/AiStories'
import Designer from '../components/Designer'
import Home from '../components/Home'
import Settings from '../components/Settings'
import Upgrade from '../components/Upgrade'
import AICredit from '../components/AICredit'
import StoryAnswers from '../components/StoryAnswers'
import ArtPrompt from '../components/ArtPrompt'
import ArtPainting from '../components/ArtPainting'
import StoryEditor from '../components/StoryEditor'
import { useStores } from 'src/store/rootStore'
import { Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const Dashboard = (): JSX.Element => {
  const store = useStores()
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [activeSideBar, setActiveSideBar] = useState(true)
  const [activeSettings, setActiveSettings] = useState(1)
  const [activeNavScreens, setActiveNavScreens] = useState(false)
  const [activeNavigation, setActiveNavigation] = useState(1)

  const handleTabClick = (tabId: number): void => {
    setActiveTab(tabId)
    setActiveSideBar(true)
  }

  useEffect(() => {
    if (activeTab === 2) {
      document.body.style.backgroundColor = 'white'
    }
    document.body.style.backgroundColor = '#F8FBFF'
  }, [activeTab])

  const handleSettingsClick = (): void => {
    setActiveTab(0)
    setActiveSideBar(false)
    setActiveNavScreens(false)
    setActiveSettings(1)
  }

  const handleUpgradeClick = (): void => {
    setActiveTab(0)
    setActiveSideBar(false)
    setActiveNavScreens(false)
    setActiveSettings(2)
  }

  const handleAICreditClick = (): void => {
    setActiveTab(0)
    setActiveSideBar(false)
    setActiveNavScreens(false)
    setActiveSettings(3)
  }

  const handleStoryNavigation = (): void => {
    setActiveSideBar(false)
    setActiveNavScreens(true)
    setActiveNavigation(1)
  }

  const handleEditorNavigation = (): void => {
    setActiveSideBar(false)
    setActiveNavScreens(true)
    setActiveNavigation(3)
  }

  const handleArtNavigation = (): void => {
    setActiveSideBar(false)
    setActiveNavScreens(true)
    setActiveNavigation(2)
  }

  const handleArtPaintNavigation = (): void => {
    setActiveSideBar(false)
    setActiveNavScreens(true)
    setActiveNavigation(4)
  }

  if (
    store.authStore.authToken === null ||
    store.authStore.authToken === undefined ||
    store.authStore.authToken === ''
  ) {
    return <Navigate to='/' replace />
  }

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case 1:
        return <Home setActiveTab={setActiveTab} />
      case 2:
        return <Designer setActiveTab={setActiveTab} />
      case 3:
        return (
          <Stories
            handleNavigation={handleStoryNavigation}
            setActiveTab={setActiveTab}
          />
        )
      case 4:
        return (
          <AiArt
            handleNavigation={handleArtNavigation}
            setActiveTab={setActiveTab}
          />
        )
      default:
        return <Home setActiveTab={setActiveTab} />
    }
  }

  const renderHeaderContent = (): JSX.Element | null => {
    switch (activeSettings) {
      case 1:
        return <Settings />
      case 2:
        return <Upgrade />
      case 3:
        return <AICredit />
      default:
        return null
    }
  }

  const renderNavigations = (): JSX.Element | null => {
    switch (activeNavigation) {
      case 1:
        return <StoryAnswers handleEditorNavigation={handleEditorNavigation} />
      case 2:
        return <ArtPrompt handleArtPainting={handleArtPaintNavigation} />
      case 3:
        return <StoryEditor />
      case 4:
        return <ArtPainting />
      default:
        return null
    }
  }

  return (
    <>
      <Header
        handleSettingsClick={handleSettingsClick}
        handleUpgradeClick={handleUpgradeClick}
        handleAICreditClick={handleAICreditClick}
        activeTab={activeTab}
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
  )
}

export default Dashboard
