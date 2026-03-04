import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faBrain, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import Chip from "@mui/material/Chip";
import "../assets/styles/Expertise.scss";

const labelsFirst = [
  "Dexterous Manipulation",
  "In-Hand / In-Grasp Manipulation",
  "Tactile Sensing",
  "Multi-Fingered Hands",
];

const labelsSecond = [
  "Deep Predictive Learning",
  "Imitation Learning",,
  "PyTorch",
  "Python",
];

const labelsThird = [
  "Robot Control",
  "ROS / ROS2",
  "Linux",
  "Docker",
];

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Expertise</h1>

        <div className="skills-grid">
          <div className="skill">
            <FontAwesomeIcon icon={faRobot} size="3x" />
            <h3>Dexterous Manipulation & Tactile Perception</h3>
            <p>
              I work on enabling robust in-grasp manipulation with multi-fingered robotic hands by
              leveraging tactile feedback, especially in settings where self-contact is unavoidable.
              My focus is on building systems that can discriminate self-generated touch from
              external object contact to prevent failures during dexterous tasks.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Focus areas:</span>
              {labelsFirst.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          <div className="skill">
            <FontAwesomeIcon icon={faBrain} size="3x" />
            <h3>Deep Learning for Sensorimotor Intelligence</h3>
            <p>
              I design learning-based methods for tactile-driven manipulation. This includes
              predictive modeling of self-touch dynamics and integrating those predictions into
              policy learning to emphasize object-relevant signals, aligned with the sensory
              attenuation principle used in human motor control.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Methods & tooling:</span>
              {labelsSecond.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          <div className="skill">
            <FontAwesomeIcon icon={faMicrochip} size="3x" />
            <h3>Robotics Systems, Experiments & Deployment</h3>
            <p>
              I build end-to-end research prototypes, from sensor integration and control stacks to
              reproducible training/evaluation pipelines, validated through real robot experiments
              on fine tactile discrimination tasks (e.g., insertions with varied orientations and
              object sizes).
            </p>
            <div className="flex-chips">
              <span className="chip-title">Stack:</span>
              {labelsThird.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expertise;