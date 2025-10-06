---

title: "TaSA | Two-Phased Deep Predictive Learning of Tactile Sensory Attenuation"
tags: ["TaSA", "In-hand manipulation", "Robotic Hands", "Cognitive Robotics", "Tactile Sensing"]
author: ["Pranav Ponnivalavan"]
description: "TaSA is a two-phase deep predictive learning framework that separates self-touch from external contact to improve dexterous in-hand manipulation."
summary: "Phase 1 learns to predict self-touch from joint motion; Phase 2 uses self-touch alongside total tactile to generate actions and isolate external contact during manipulation."
cover:
image: "/hasalogo.jpg"
alt: "Tactile Sensory Attenuation"
relative: true
showToc: true
disableAnchoredHeadings: false
------------------------------

## Overview

**TaSA** (Two-Phased deep learning of **Ta**ctile **S**ensory **A**ttenuation) operationalizes the neuroscience notion of sensory attenuation in robotic hands. The key idea is to **predict the tactile signal caused by the robot itself (self-touch)** and **subtract it from** the **total tactile** reading at run time to reveal **external touch** that matters for manipulation.

Hardware: **Allegro Hand** with **XELA uSkin** fingertips (30 tri-axial taxels per finger; ~6.5 mm spacing). Task focus: **mechanical pencil-lead insertion**, **coin insertion**, and **paper-clip fixing**—contact-rich, low-signal tasks where self- and object-contacts often overlap.

---

## Why TaSA?

Dense finger motions create frequent **finger–finger** and **finger–palm** contacts. Treating *all* contact as equally important causes policies to overfit to self-touch and miss object cues. TaSA explicitly models **self vs. external** contact, making the policy **contact-aware** and reducing false positives from self collisions.

---

## Method: Two-Phase Learning

> **Math rendering:** Inline math uses `\( … \)` and display equations use `$$ … $$`.

### Notation

* Total tactile at time (t): (T_t)
* Predicted self-touch: (\hat{S}_t)
* External tactile (decision signal): (E_t = T_t - \hat{S}_t)
* Joint positions: (q_t \in \mathbb{R}^8) (index & thumb; 4 DOF each)

### Phase 1 — Self-Touch Learning (Prediction)

We learn a predictor of (future) **self-touch** from joint motion (and commands):
$$
\hat{S}*{t+1} = f*{\theta}!\big(q_t,; q^{\mathrm{cmd}}*t\big),
\qquad
\mathcal{L}*{\text{self}}=\big|S_{t+1}-\hat{S}_{t+1}\big|_2^2.
$$

During Phase-1 data collection, motions contain only **self-contact** (open/close, rubbing; no objects). Each fingertip has **30 taxels × 3 axes = 90** channels; using **index + thumb → 180-D tactile**. An FCN (hidden dim 128; GELU; dropout 0.2) maps joint inputs to (\hat{S}).

**Online external tactile** is computed as
[
E_t = T_t - \hat{S}_t.
]

> **Intuition:** if the model predicts what self-contact *should* feel like given the hand’s motion, the remainder reflects **object** contact.

### Phase 2 — Motion Learning (Generation)

A recurrent policy (LSTM-based **ST-RNN / SAT-RNN**) consumes **raw tactile** and **predicted self-touch** (plus joints) to predict **future joints/commands** and **future tactile**:
$$
\mathbf{x}*t=\big[,q_t,; \hat{S}*t,; T_t,\big],\qquad
\hat{q}*{t+1},; \hat{q}^{\mathrm{cmd}}*{t+1},; \hat{T}*{t+1}=g*{\phi}!\big(\mathbf{x}_{t-k:t}\big).
$$

A **frozen** copy of the Phase-1 FCN supplies **future** self-touch from predicted postures:
$$
\hat{S}*{t+1}=f*{\theta}!\big(\hat{q}*{t+1},; \hat{q}^{\mathrm{cmd}}*{t}\big),
$$
maintaining a clean separation of self vs. external contact during rollouts.

#### Architectural Variants (ablations)

* **T-RNN:** tactile only (T)
* **S-RNN:** self-touch only (\hat{S})
* **ST-RNN / SAT-RNN:** both ((T,\hat{S}))

---

## Experimental Setup

* **Hand:** Allegro (16-DOF).
* **Sensors:** XELA uSkin fingertips (index & thumb used; 60 taxels total; tri-axial forces (F_x,F_y,F_z)).
* **Teleop:** leader–follower with Dynamixel leader; joint positions streamed via U2D2.
* **Training (motion phase):** batch **300**, lr **1e-3**, **6000 epochs**.
* **Self-touch training:** **200 episodes** @ **10 Hz**, **400 steps** each; batch **100**, lr **1e-3**, **20 000 epochs**, Adam (RTX 4070).

**Tasks** (Fig. 4):

1. **Paper-clip fixing** (50 mm and 28 mm); train on {front, back}, test on {middle}.
2. **Coin insertion** (1, 100, 500 yen) into a 32 mm × 2 mm slot; train {left, right}, test {middle}.
3. **Pencil-lead insertion** (diameters {0.7, 0.9, 1.3, 1.4, 2.0} mm; angles {−20°, −10°, 0°, +10°, +20°}; train on −20°, 0°, +20°; test on −10°, +10°).

### Task Distributions

**Table III — Paper-clip fixing**

| Clip Size | Front | Middle   | Back  |
| --------- | ----- | -------- | ----- |
| Small     | Train | **Test** | Train |
| Big       | Train | **Test** | Train |

**Table IV — Coin insertion**

| Coin Type                 | Left  | Middle   | Right |
| ------------------------- | ----- | -------- | ----- |
| 1 yen / 100 yen / 500 yen | Train | **Test** | Train |

**Table V — Pencil-lead insertion**

| Diameter (mm) → / Angle ↓ | −20°     | −10°     | 0°       | +10°     | +20°     |
| ------------------------- | -------- | -------- | -------- | -------- | -------- |
| 0.7                       | Train    | **Test** | Train    | **Test** | Train    |
| 0.9                       | **Test** | **Test** | **Test** | **Test** | **Test** |
| 1.3                       | Train    | **Test** | Train    | **Test** | Train    |
| 1.4                       | **Test** | **Test** | **Test** | **Test** | **Test** |
| 2.0                       | Train    | **Test** | Train    | **Test** | Train    |

---

## Results

### Self-Touch Prediction (Phase-1)

Across held-out episodes, (\hat{S}) closely tracks raw tactile during sustained finger–finger contact; the **error** spikes at contact onsets/offsets, acting as an event cue. Correlations on self-contact segments are high (thumb ≈ **0.96**, index ≈ **0.98**).

### Task Success (Phase-2)

**Paper-clip fixing (10 trials/condition)**

|                         | **RT only**     | **RT+Self**      |
| ----------------------- | --------------- | ---------------- |
| Back (big/small)        | 8/10, 7/10      | **10/10, 10/10** |
| Middle test (big/small) | 8/10, 8/10      | **10/10, 10/10** |
| Front (big/small)       | 6/10, 5/10      | **9/10, 8/10**   |
| **Total**               | **42/60 = 70%** | **57/60 = 95%**  |

**Coin insertion (10 trials/condition)**

| Slot →      | **Left**                         | **Middle (test)**                | **Right**                         | **Total**       |
| ----------- | -------------------------------- | -------------------------------- | --------------------------------- | --------------- |
| **RT only** | 1¥: 6/10, 100¥: 7/10, 500¥: 7/10 | 1¥: 7/10, 100¥: 7/10, 500¥: 7/10 | 1¥: 7/10, 100¥: 7/10, 500¥: 6/10  | **61/90 = 68%** |
| **RT+Self** | 1¥: 9/10, 100¥: 9/10, 500¥: 7/10 | **1¥/100¥/500¥: 10/10**          | 1¥: 10/10, 100¥: 9/10, 500¥: 9/10 | **83/90 = 92%** |

**Pencil-lead insertion (10 trials/condition; (t)=test angles)**

| Angle →                                      |      −20° |  −10° (t) |        0° |  +10° (t) |      +20° |         **Total** |
| -------------------------------------------- | --------: | --------: | --------: | --------: | --------: | ----------------: |
| **RT only** (0.7 / 0.9 / 1.3 / 1.4 / 2.0 mm) | 0/1/3/3/3 | 1/2/3/3/4 | 2/2/4/4/5 | 1/3/3/3/5 | 1/2/2/2/4 |  **66/250 = 26%** |
| **RT+Self** (0.7 / 0.9 / 1.3 / 1.4 / 2.0 mm) | 3/4/6/6/7 | 5/6/7/7/8 | 5/5/8/8/9 | 4/4/6/7/8 | 4/3/5/5/6 | **146/250 = 58%** |

**Takeaway:** Combining **self-touch with total tactile** improves motion clarity and helps the controller disambiguate finger contact from object contact—crucial for precise in-hand insertion and generalization to unseen conditions (e.g., middle coin slot, intermediate angles).

---

## Model Details (Phase-1 FCN & Phase-2 RNN)

### Self-Touch FCN (Phase-1) — *matches Table I*

* **Input:** ([q_t, q^{\mathrm{cmd}}_t] \in \mathbb{R}^{16})
* **Hidden:** 128 (GELU; dropout 0.2)
* **Encoder:** Linear(16→64), GELU, Dropout(0.2); Linear(64→128), GELU
* **Decoder:** Dropout(0.2); Linear(128→64), GELU; Linear(64→188), GELU
* **Output heads:** (\hat{s}^{\text{idx}}_t) (90), (\hat{s}^{\text{thb}}_t) (90), (\hat{q}_t) (8)

### Motion Learning RNN (Phase-2) — *matches Table II*

* **Core:** RNN (LSTMCell), hidden = 100
* **Inputs:**

  * **ST-RNN (RT + Self + (q_t))**: 180 + 180 + 8 = **368**
  * **T-RNN (RT + (q_t))**: 180 + 8 = **188**
* **Decoder:** Linear(100→128), ReLU; Linear(128→196)
* **Outputs (size):** ((\hat{T}^{\text{idx}}, \hat{T}^{\text{thb}})=(90,90)), (\hat{q}*{t+1}=8), (\hat{q}^{\mathrm{cmd}}*{t+1}=8) ⇒ **196**

---

## Improvements & Future Work

* Axis-aware losses or attention to improve **per-axis** self-touch fidelity.
* Extend to **multi-finger/bimanual** self-contact patterns.
* Add an **explicit external-tactile head** trained on (E_t) statistics for cleaner control signals.

---

## Media

### Gallery

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <img src="/view.png" alt="Allegro Hand and Tactile Sensor Setup" width="100%">
</div>

> *Fig. 1*: Allegro Hand and tactile sensor setup.

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <img src="/diff.png" alt="Task Difficulty (self vs. total contact overlap)" width="100%">
</div>

> *Fig. 2*: Task difficulty (self- vs total-contact overlap).

### Demonstration Video

<video controls width="100%" style="border-radius: 12px;">
  <source src="/episode_video-3.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

> *Video 1*: Online separation of self vs. external tactile during insertion.

---

## Citation

Pranav Ponnivalavan. 2025. *TaSA: Two-Phased Deep Predictive Learning of Tactile Sensory Attenuation for Improving In-Grasp Manipulation*. Waseda University, Tokyo, Japan.

<!--
@bachelorsthesis{Ponnivalavan2025-TaSA,
  author       = {Pranav Ponnivalavan},
  title        = {TaSA: Two-Phased Deep Predictive Learning of Tactile Sensory Attenuation for Improving In-Grasp Manipulation},
  school       = {Waseda University},
  year         = {2025},
  address      = {Tokyo, Japan}
}
-->
