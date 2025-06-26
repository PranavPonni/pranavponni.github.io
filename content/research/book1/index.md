---
title: "HASA | Hand Sensory Attenuation Research" 
tags: ["In-hand manipulation", "Robotic Hands", "Cognitive Robotics", "Tactile Sensing"]
author: ["Pranav Ponnivalavan"]
description: "A research thesis on distinguishing self and external touch through tactile sensing for robotic in-hand manipulation."
summary: "HASA explores how tactile sensors can help robotic hands differentiate between self-touch and external object contact to improve dexterous in-hand manipulation."
cover:
    image: "/hasalogo.jpg"
    alt: "Hand Sensory Attenuation"
    relative: true
showToc: true
disableAnchoredHeadings: false

---

## Description

**HASA** (Hand Sensory Attenuation) is an undergraduate thesis project that investigates how robotic hands equipped with tactile sensors can distinguish between *self-generated touch* and *external touch*. This ability, inspired by human somatosensory processes such as sensory attenuation, enables more dexterous and reliable in-hand manipulation.

The project leverages the Allegro Hand paired with XELA tactile sensors and proposes a two-phase learning strategy:
- A **self-touch learning phase** to model the robot’s own tactile feedback
- A **motion generation phase** to predict future tactile outcomes based on actions

This approach draws from concepts in cognitive robotics, such as the **free-energy principle**, to optimize tactile predictions and generate robust manipulation behaviors. The system is evaluated through experiments involving self-grasping and object interaction, with comparisons to baseline models lacking self-touch understanding.

---

## Short Description

> "This project introduces an elegant framework for enabling robots to distinguish self from environment – a crucial step toward embodied intelligence." 

---

#### Self-Touch and Sensory Attenuation

In humans, **sensory attenuation** reduces the perception of self-generated stimuli — this mechanism helps differentiate between one’s own actions and external influences. By modeling this concept in robotic systems, we enable the robot to predict and downweight expected tactile feedback resulting from its own movements.

#### Mathematical Model

The robot learns the following mapping function:

$\hat{T}_{t+1} = f(J_t,\ J_{t+1},\ T_t)$

Where:

- $\hat{T}_{t+1}$: predicted tactile state at time step $t+1$  
- $J_t,\ J_{t+1}$: current and future joint states  
- $T_t$: current tactile sensor input  

---

The model is trained to minimize the following loss function:

$L = \|T_{t+1} - \hat{T}_{t+1}\|^2$

This loss encourages the system to accurately predict tactile outcomes based on its motion, enabling it to **distinguish between self-generated and externally generated touch**.

---

## Gallery

Below are a few selected visuals from the **HASA** project demonstrating the hardware setup, data collection process, and tactile signal responses.

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <img src="/view.png" alt="Allegro Hand and Tactile Sensor Setup" width="100%">
</div>

> *Fig 1*: Allegro Hand and Tactile Sensor Setup

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <img src="/diff.png" alt="Difficulty of Task" width="100%">
</div>

> *Fig 2*: Difficulty of Task

---

## Demonstration Video

Here is a demonstration of the **HASA** system performing mechanical pencil lead insertion task:

<video controls width="100%" style="border-radius: 12px;">
  <source src="/episode_video-3.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

> *Video 1*: Self vs external touch prediction during in-hand manipulation.

---

## Citation

Pranav Ponnivalavan. 2025. *Hand Sensory Attenuation (HASA): Differentiating Self and External Touch for Robotic In-hand Manipulation*. Waseda University, Tokyo, Japan.

<!-- ```bibtex
@bachelorsthesis{Ponnivalavan2025,
  author       = {Pranav Ponnivalavan},
  title        = {Hand Sensory Attenuation (HASA): Differentiating Self and External Touch for Robotic In-hand Manipulation},
  school       = {Waseda University},
  year         = {2025},
  address      = {Tokyo, Japan},
} -->
