import React, { useState } from "react";
import {
  AccessButton,
  AnnualHeading,
  Billed,
  CancelSubscription,
  CardDescription,
  CardFeatures,
  CardHeading,
  Container,
  CurrentPlanHeading,
  Flex1,
  Flex2,
  FlexContainer,
  MainHeading,
  MonthlyHeading,
  PricingImage,
} from "./style";
import "../../utils/style.css";
import { Badge, Card, Switch } from "antd";
import Discount from "../../assets/discount.png";
import CheckBox from "../../assets/Checkbox.png";
import ArrowDown from "../../assets/Group.png";
import { pricingData } from "../../services/PricingData";
import Subscription from "../Subscription";


const Upgrade = () => {
  const [annualChecked, setAnnualChecked] = useState(true); //state for changing billing mode
  const [subscription, setSubscription] = useState(false);

  const onChange = () => {
    setAnnualChecked(!annualChecked);
  };

  const handleSubscription = () => {
    setSubscription(!subscription);
  }
  return (
    <Container>
      {!subscription ?
      <>
      <Badge
        style={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          width: "60px",
        }}
      >
        Pricing
      </Badge>
      <MainHeading>Flexible pricing plan for your needs</MainHeading>
      <FlexContainer>
        <img
          style={{
            width: "200px",
            marginLeft: "150px",
            position: "absolute",
            marginTop: "-40px",
          }}
          src={Discount}
          alt="discount"
        />
        <Flex1>
          <Billed>
            <MonthlyHeading
              color={!annualChecked ? "black" : "rgba(0, 0, 0, 0.25)"}
            >
              Billed monthly
            </MonthlyHeading>
            <Switch checked={annualChecked} onChange={onChange} />
            <AnnualHeading
              color={annualChecked ? "black" : "rgba(0, 0, 0, 0.25)"}
            >
              Billed Annually
            </AnnualHeading>
          </Billed>
        </Flex1>
        <CurrentPlanHeading>You are here</CurrentPlanHeading>
        <img
          src={ArrowDown}
          style={{
            width: "30px",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "-10px",
          }}
          alt="arrow"
        />
        <Flex2>
          {pricingData.map((item) => (
            <Card
              style={{
                width: 300,
                height: "590px",
                background: "white !important",
                boxShadow: "0px 1px 30px rgba(0, 0, 0, 0.12)",
                borderRadius: "6px",
                marginTop: "10px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <CardHeading>{item.title}</CardHeading>
              <CardDescription>{item.description}</CardDescription>
              <PricingImage
                src={annualChecked ? item.annualPrice : item.monthlyPrice}
                alt="mp1"
              />
              <AccessButton>Access Now</AccessButton>
              <CardFeatures>
                <img
                  style={{ background: "white", marginRight: "5px" }}
                  src={CheckBox}
                  alt="icon"
                />
                {item.feature1}
              </CardFeatures>
              <CardFeatures>
                <img
                  style={{ background: "white", marginRight: "5px" }}
                  src={CheckBox}
                  alt="icon"
                />
                {item.feature2}
              </CardFeatures>
              <CardFeatures>
                <img
                  style={{ background: "white", marginRight: "5px" }}
                  src={CheckBox}
                  alt="icon"
                />
                {item.feature3}
              </CardFeatures>
              <CardFeatures>
                <img
                  style={{ background: "white", marginRight: "5px" }}
                  src={CheckBox}
                  alt="icon"
                />
                {item.feature4}
              </CardFeatures>
              <CardFeatures>
                <img
                  style={{ background: "white", marginRight: "5px" }}
                  src={item.feature5 && CheckBox}
                  alt={item.feature5 && "checkbox"}
                />
                {item.feature5}
              </CardFeatures>
              <CardFeatures>
                <img
                  style={{ background: "white", marginRight: "5px" }}
                  src={item.feature6 && CheckBox}
                  alt={item.feature6 && "checkbox"}
                />
                {item.feature6}
              </CardFeatures>
            </Card>
          ))}
        </Flex2>
      </FlexContainer>
      <CancelSubscription onClick={handleSubscription}>Cancel Subscription?</CancelSubscription>
      </> : <Subscription handleSubscription={handleSubscription}/>
      }
    </Container>
  );
};

export default Upgrade;
