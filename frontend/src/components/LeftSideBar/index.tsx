import React from "react";
import { Tab } from "../../types/tabs";
import { Col, Row } from "antd";
import { Sidebar } from "./style";
import "../../utils/style.css";
import Arrow from "../../assets/arrow.png";
import { useNavigate } from "react-router-dom";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faArrowRightFromBracket);

interface SidebarProps {
  tabs: Tab[];
  activeTab: number;
  renderTabContent: any;
  handleTabClick: (tabId: any) => void;
}
const LeftSideBar = ({
  tabs,
  activeTab,
  renderTabContent,
  handleTabClick,
}: SidebarProps) => {

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <Row>
      <Col span={2}>
        <Sidebar>
          <ul className="tabs">
            {tabs.map((tab) => (
              <li
                id={tab.id.toString()}
                key={tab.id}
                className={`tab ${
                  tab.id === activeTab ? "active" : "nonactive"
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                <img
                  src={tab.id === activeTab ? tab.icon1 : tab.icon2}
                  alt="icon"
                  className="tabIcons"
                />
                <span style={{ backgroundColor: "transparent" }}>
                  {tab.title}
                </span>
              </li>
            ))}
          </ul>
          <div className="logout" onClick={handleNavigation}>
            <img
              src={Arrow}
              alt="icon"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
            <span style={{ backgroundColor: "transparent" }}>Logout</span>
          </div>
        </Sidebar>
      </Col>
      <Col span={12}>
        <div className="tab-content">{renderTabContent()}</div>
      </Col>
    </Row>
  );
};

export default LeftSideBar;
