import { type Tab } from '../types/tabs'
import Home from '../components/Home'
import Designer from '../components/Designer'
import Stories from '../components/AiStories'
import AiArt from '../components/AiArt'
import HomeIcon from '../assets/Home.png'
import BookIcon from '../assets/BookIcon.png'
import StoryIcon from '../assets/StoryIcon.png'
import ArtIcon from '../assets/ArtIcon.png'
import HomeColor from '../assets/HomeColor.png'
import BookColor from '../assets/BookColor.png'
import StoryColor from '../assets/StoryColor.png'
import ArtColor from '../assets/ArtColor.png'

export const tabs: Tab[] = [
  {
    id: 1,
    title: 'Home',
    icon1: HomeColor,
    icon2: HomeIcon,
    component: () => Home
  },
  {
    id: 2,
    title: 'Designer',
    icon1: BookColor,
    icon2: BookIcon,
    component: () => Designer
  },
  {
    id: 3,
    title: 'Ai Stories',
    icon1: StoryColor,
    icon2: StoryIcon,
    component: Stories
  },
  {
    id: 4,
    title: 'Ai Art',
    icon1: ArtColor,
    icon2: ArtIcon,
    component: AiArt
  }
]
