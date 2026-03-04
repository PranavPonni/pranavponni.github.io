import React from "react";
import "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../assets/styles/Timeline.scss";

function Timeline() {
  return (
    <div id="experience">
      <div className="items-container">
        <h1>Experience</h1>

        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "white", color: "rgb(39, 40, 34)" }}
            contentArrowStyle={{ borderRight: "7px solid  white" }}
            date="Oct 2025 – Present"
            iconStyle={{ background: "#5000ca", color: "rgb(39, 40, 34)" }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Robotic Process Automation Engineer (Intern)
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              FingerVision · Tokyo, Japan (On-site)
            </h4>
            <p>
              Built an end-to-end robotics pipeline (data collection → training → inference) and
              validated usability of the robot arm setup.
              <br />
              Created datasets and evaluated inference across multiple tasks (zipper, box
              pick+insert, USB plug insertion, yellow-work picking, cable manipulation).
              <br />
              Iterated a 3D-printed fixture for FingerVision tactile sensing to improve stability
              and repeatability; debugged training failures (OOM, data loading, index/array bugs).
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Sep 2025 – Present"
            iconStyle={{ background: "#5000ca", color: "rgb(39, 40, 34)" }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Graduate Student Researcher
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Waseda University · Tokyo, Japan (On-site)
            </h4>
            <p>
              Research on sensory attenuation for tactile-driven in-grasp manipulation using
              Allegro Hand and uSkin tactile sensors.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Sep 2025 – Feb 2026"
            iconStyle={{ background: "#5000ca", color: "rgb(39, 40, 34)" }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Humanoid Design Engineer (Contract)
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              O-ID · Tokyo, Japan (Hybrid)
            </h4>
            <p>
              Designed a bilateral, stable, transportable base architecture with secure dual-arm
              mounting and ergonomic tabletop reach.
              <br />
              Engineered electronics integration (internal bays, thermal/ventilation strategy,
              robust component mounting, and cable-routing paths).
              <br />
              Delivered a fully parametric CAD + manufacturing package (assembly, 2D drawings,
              BOM, STEP handoff) and final build documentation with validation under specified
              load cases.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Mar 2024 – Aug 2025"
            iconStyle={{ background: "#5000ca", color: "rgb(39, 40, 34)" }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Undergraduate Student Researcher
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Waseda University · Tokyo, Japan (On-site)
            </h4>
            <p>
              Research support across robotics experimentation and learning-based manipulation.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jul 2024 – Aug 2024"
            iconStyle={{ background: "#5000ca", color: "rgb(39, 40, 34)" }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Robotics & Digital Engineering Intern
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Tata Consultancy Services (TCS) · Minato, Tokyo, Japan (On-site)
            </h4>
            <p>
              Designed and 3D-printed jigs in Fusion 360 for a Universal Robot 5e; extracted force
              data using a jig attached to the robot setup.
              <br />
              Built and evaluated ML models to classify swipe motions as success/failure
              (Logistic Regression, Random Forest, Gradient Boosting, RNN).
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Feb 2023 – May 2023"
            iconStyle={{ background: "#5000ca", color: "rgb(39, 40, 34)" }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Technical Operations Manager – Factory of the Future (Intern)
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Daimler Truck Asia · Kawasaki, Kanagawa, Japan (On-site)
            </h4>
            <p>
              Supported analysis of robot equipment maintenance and utility operation data to
              identify optimization opportunities.
              <br />
              Coordinated stakeholders and supported KPI tracking, budgeting/forecasting, and
              operational metrics for facilities initiatives.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
