import Lite from '../assets/lite_price.png'
import PRO from '../assets/pro_price.png'
import BUSSINES from '../assets/business_price.png'

export const pricingData = [
  {
    id: '0',
    title: 'Lite',
    description: 'Lite Design',
    monthlyPrice: Lite,
    annualPriceText: '$119.99 Billed Annually',
    // annualPriceValue: "",
    monthlyPriceValue: '9.99',
    feature1: 'Unlimited AI Art',
    feature2: 'AI Art Styles',
    feature3: '100,000 AI words/mo',
    feature4: 'Add on more AI Credits',
    feature5: 'Limited Editing within AI stories'
  },
  {
    id: '1',
    title: 'Pro',
    description: 'Ai Books',
    monthlyPrice: PRO,
    annualPriceText: '$287.88 Billed Annually',
    // annualPrice: Annualyp2,
    monthlyPriceValue: '23.99',
    feature1: 'Unlimited AI Art',
    feature2: 'AI Art Styles',
    feature3: '240,000 AI words/mo',
    feature4: 'Add on more AI Credits',
    feature5: 'More Editing within AI stories'
  },
  {
    id: '2',
    title: 'Enterprise',
    description: 'Unlimited Possiblities',
    monthlyPrice: BUSSINES,
    annualPriceText: '$575.88 Billed Annually',
    // annualPrice: Annualyp3,
    monthlyPriceValue: '47.99',
    feature1: 'Unlimited AI Art',
    feature2: 'AI Art Styles',
    feature3: '480,000 AI words/mo',
    feature4: 'Prompt Library Guide',
    feature5: 'Add on more AI Credits',
    feature6: 'More Editing within AI stories'
  }
]
