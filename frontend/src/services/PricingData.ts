import Lite from "../assets/lite_price.png";
import PRO from "../assets/pro_price.png";
import BUSSINES from "../assets/business_price.png";

export const pricingData = [
  {
    id: "0",
    title: "Lite",
    description: "Lite Design",
    monthlyPrice: Lite,
    annualPriceText: "$119.99 Billed Annually",
    // annualPriceValue: "",
    monthlyPriceValue: "9.99",
    feature1: "Unlimited Books",
    feature2: "Access to Designer",
    feature3: "Story Analysis Algorithm",
    feature4: "Book Cover Template",
  },
  {
    id: "1",
    title: "Pro",
    description: "Ai Books",
    monthlyPrice: PRO,
    annualPriceText: "$287.88 Billed Annually",
    // annualPrice: Annualyp2,
    monthlyPriceValue: "23.99",
    feature1: "Unlimited Books",
    feature2: "Access to Designer",
    feature3: "Story Analysis Algorithm",
    feature4: "Book Cover Template",
    feature5: "Access to all AI features",
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Unlimited Possiblities",
    monthlyPrice: BUSSINES,
    annualPriceText: "$575.88 Billed Annually",
    // annualPrice: Annualyp3,
    monthlyPriceValue: "47.99",
    feature1: "Unlimited Books",
    feature2: "Access to Designer",
    feature3: "Story Analysis Algorithm",
    feature4: "Book Cover Template",
    feature5: "Prompt Library Guide",
    feature6: "Unlimited Access to all AI features",
  },
];
