---

title: "TaSA | Two‑Phased Deep Predictive Learning of Tactile Sensory Attenuation"
tags: ["TaSA", "In-hand manipulation", "Robotic Hands", "Cognitive Robotics", "Tactile Sensing"]
author: ["Pranav Ponnivalavan"]
description: "TaSA is a two‑phase deep predictive learning framework that separates self‑touch from external contact to improve dexterous in‑hand manipulation."
summary: "Phase 1 learns to predict self‑touch from joint motion; Phase 2 uses self‑touch alongside total tactile to generate actions and isolate external contact during manipulation."
cover:
image: "/hasalogo.jpg"
alt: "Tactile Sensory Attenuation"
relative: true
showToc: true
disableAnchoredHeadings: false
------------------------------

## Overview

**TaSA** (Two‑Phased deep learning of **Ta**ctile **S**ensory **A**ttenuation) operationalizes the neuroscience notion of sensory attenuation in robotic hands. The key idea is to **predict the tactile signal caused by the robot itself (self‑touch)** and subtract it from the **total tactile** reading at run time to reveal **external touch** that matters for manipulation.

Hardware: **Allegro Hand** with **XELA uSkin** fingertips (30 tri‑axial taxels per finger). Task focus: **mechanical pencil lead insertion**—a contact‑rich, low‑signal task where self‑ and object‑contacts often overlap.

---

## Why TaSA?

Dense finger motions create frequent **finger–finger** and **finger–palm** contacts. If a policy treats *all* contact as equally important, it may overfit to self‑touch and lose sensitivity to the object. TaSA explicitly models **self vs. external** contact to make the policy **contact‑aware** and reduce false positives from self collisions.

---

## Method: Two‑Phase Learning

### Phase 1 — Self‑Touch Learning (Prediction)

We learn a predictor of future **self‑touch** from joint motion (and optionally current tactile):

$$\hat{S}*{t+1} = f*\theta\big(J_t, J_{t+1}, T_t\big)$$

with loss

$$\mathcal{L}*{\text{self}} = |S*{t+1} - \hat{S}_{t+1}|_2^2.$$

Here, (S) denotes the *self‑touch* component of tactile sensed during isolated self‑motion data (open/close and rubbing without an object). The dataset includes **8 joint positions** and **60 tri‑axial tactile points** collected over **500+ self‑touch episodes**.

**External tactile** is then defined online as:

$$E_t = T_t - \hat{S}_t,$$

where (T_t) is the **total tactile** at time (t).

> Intuition: if the model can predict what self‑contact should feel like given the hand’s motion, the remainder is likely due to the **object** or environment.

### Phase 2 — Motion Learning (Generation)

A recurrent policy (e.g., LSTM‑based **SAT‑RNN‑POS**) consumes **[total tactile (T), predicted self‑touch (\hat{S})]** (and joint states) to predict **future actions** and **future tactile**:

$$J_{t+1},\ \hat{T}*{t+1} = g*\phi\big(J_{t-k:t},\ T_{t-k:t},\ \hat{S}_{t-k:t}\big).$$

We jointly minimize:

$$\mathcal{L}*{\text{motion}} = \lambda_T|T*{t+1}-\hat{T}*{t+1}|*1 + \lambda_J|J*{t+1}-\hat{J}*{t+1}|_1,$$

and (optionally) **backpropagate through the self‑touch module** so the policy learns when and how self‑contact will arise during planned motion.

**Architectural variants** (for ablations):

* **T‑RNN:** total tactile only ((T)).
* **S‑RNN:** self‑touch only ((\hat{S})).
* **ST‑RNN / SAT‑RNN:** both ((T, \hat{S})) with attenuation logic.

---

## Mathematical Summary

**Signals**

* Total tactile: (T_t)
* Predicted self‑touch: (\hat{S}_t)
* External tactile (used for decision‑making): (E_t = T_t - \hat{S}_t)

**Training objectives**

* Self‑touch prediction: (\min_\theta \mathbb{E},|S_{t+1}-\hat{S}_{t+1}|_2^2)
* Motion generation: (\min_\phi \mathbb{E},[\lambda_T|T_{t+1}-\hat{T}*{t+1}|*1 + \lambda_J|J*{t+1}-\hat{J}*{t+1}|_1])

---

## Experiment

**Task:** Insert pencil lead into a mechanical pencil.
**Challenge:** Subtle normal/shear forces; **self** and **object** contacts occur simultaneously.
**Setup:** Allegro Hand (curved fingertips) + uSkin, side‑view “pitching” approach.

**Data collection:**

* Self‑touch set: hand open/close and finger rubbing (no object) to learn (\hat{S}).
* Task set: insertion trials using the learned (\hat{S}) online to form (E=T-\hat{S}).

---

## Results (Representative)

* **Motion success rates (per‑condition average):**

  * **ST‑RNN (Self + Total tactile): ~52%**
  * **S‑RNN (Self‑only): ~38%**
  * **T‑RNN (Total‑only): ~20%**
* **Self‑touch prediction accuracy by axis:**

  * **Y‑axis:** high accuracy (external error ≈ 10–20)
  * **Z‑axis:** moderate (error up to ~150)
  * **X‑axis:** weaker (error often > 200)

**Takeaway:** Feeding **self‑touch alongside total tactile** improves motion clarity and helps the controller disambiguate finger contact from true object contact—crucial for precise in‑hand insertion.

---

## Improvements & Future Work

* Improve **axis‑dependent self‑touch prediction** (e.g., axis‑wise losses or attention).
* Evaluate **generalization** to other precision tasks: bolt screwing, peg‑in‑hole, small‑object rotation/translation.
* Test **object variability** (lead diameters/materials) and **multi‑finger** or **bimanual** self‑contact.

---

## Media

### Gallery

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <img src="/view.png" alt="Allegro Hand and Tactile Sensor Setup" width="100%">
</div>

> *Fig 1*: Allegro Hand and Tactile Sensor Setup

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <img src="/diff.png" alt="Task Difficulty" width="100%">
</div>

> *Fig 2*: Task Difficulty (self‑ vs total‑contact overlap)

### Demonstration Video

<video controls width="100%" style="border-radius: 12px;">
  <source src="/episode_video-3.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

> *Video 1*: Online separation of self vs. external tactile during insertion.

---

## Citation

Pranav Ponnivalavan. 2025. *TaSA: Two‑Phased Deep Predictive Learning of Tactile Sensory Attenuation for Improving In‑Grasp Manipulation*. Waseda University, Tokyo, Japan.

<!--
@bachelorsthesis{Ponnivalavan2025-TaSA,
  author       = {Pranav Ponnivalavan},
  title        = {TaSA: Two‑Phased Deep Predictive Learning of Tactile Sensory Attenuation for Improving In‑Grasp Manipulation},
  school       = {Waseda University},
  year         = {2025},
  address      = {Tokyo, Japan}
}
-->
