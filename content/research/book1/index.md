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

Hardware: **Allegro Hand** with **XELA uSkin** fingertips (30 tri‑axial taxels per finger; ~6.5 mm spacing). Task focus: **mechanical pencil lead insertion**, coin insertion, and paper‑clip fixing—contact‑rich, low‑signal tasks where self‑ and object‑contacts often overlap.

---

## Why TaSA?

Dense finger motions create frequent **finger–finger** and **finger–palm** contacts. If a policy treats *all* contact as equally important, it may overfit to self‑touch and lose sensitivity to the object. TaSA explicitly models **self vs. external** contact to make the policy **contact‑aware** and reduce false positives from self collisions.

---

## Method: Two‑Phase Learning

### Notation

* Total tactile at time (t): (T_t)
* Predicted self‑touch: (\hat S_t)
* External tactile (decision signal): (E_t = T_t - \hat S_t)
* Joint positions: (q_t \in \mathbb{R}^8) (index & thumb; 4 DOF each)

### Phase 1 — Self‑Touch Learning (Prediction)

We learn a predictor of (future) **self‑touch** from joint motion (and optionally current commands):

$$
\hat S_{t+1} = f_\theta!\big(q_t,; q^{\mathrm{cmd}}_t\big),
$$

optimized with an (\ell_2) loss:

$$
\mathcal{L}*{\text{self}} ,=, \big| S*{t+1} - \hat S_{t+1} \big|_2^2.
$$

During Phase‑1 data collection, motions contain only **self‑contact** (open/close, rubbing; no objects). Each fingertip has **30 taxels × 3 axes = 90** channels, using **index + thumb → 180‑D tactile**. An FCN with hidden dim 128 (GELU, dropout 0.2) maps joint inputs to (\hat S).

**Online external tactile** is then computed as:

$$
E_t = T_t - \hat S_t.
$$

> Intuition: if the model can predict what self‑contact should feel like given the hand’s motion, the remainder is likely due to **object** contact.

### Phase 2 — Motion Learning (Generation)

A recurrent policy (LSTM‑based **ST‑RNN / SAT‑RNN**) consumes **raw tactile** and **predicted self‑touch** (plus joints) to predict **future joints/commands** and **future tactile**:

$$
\begin{aligned}
\mathbf{x}*t &= [, q_t,; \hat S_t,; T_t ,],\
\hat q*{t+1},; \hat q^{\mathrm{cmd}}*{t+1},; \hat T*{t+1} &= g_\phi(\mathbf{x}_{t-k:t}).
\end{aligned}
$$

We minimize a joint objective ((\ell_1) for joints/commands, (\ell_1) or (\ell_2) for tactile):

$$
\mathcal{L}*{\text{motion}} ,=, \lambda_T,\big|T*{t+1}-\hat T_{t+1}\big|*1 ,+, \lambda_J,\big|q*{t+1}-\hat q_{t+1}\big|*1 , +, \lambda_C,\big|q^{\mathrm{cmd}}*{t+1}-\hat q^{\mathrm{cmd}}_{t+1}\big|_1.
$$

A **frozen** copy of the Phase‑1 FCN also provides **future** self‑touch estimates from predicted postures:

$$
\hat S_{t+1} ;=; f_\theta!\big(\hat q_{t+1},; \hat q^{\mathrm{cmd}}_t\big),
$$

supporting attenuation during rollouts.

#### Architectural Variants (ablations)

* **T‑RNN:** tactile only (T)
* **S‑RNN:** self‑touch only (\hat S)
* **ST‑RNN / SAT‑RNN:** both ((T, \hat S))

---

## Experimental Setup

* **Hand:** Allegro (16‑DOF). **Sensors:** XELA uSkin fingertips (index & thumb used; 60 taxels total; tri‑axial forces Fx,Fy,Fz).
* **Teleop:** leader–follower with Dynamixel leader; joint positions streamed via U2D2.
* **Training (motion phase):** batch 300, lr 1e‑3, **6000 epochs**.
* **Self‑touch training:** **200 episodes** @ **10 Hz**, **400 steps** each; batch 100, lr 1e‑3, **20 000 epochs**, Adam (RTX 4070).

**Tasks** (Fig. 4):

1. **Paper‑clip fixing** (50 mm and 28 mm); train on {front, back}, test on {middle}.
2. **Coin insertion** (1, 100, 500 yen) into narrow slot; train {left, right}, test {middle}.
3. **Pencil‑lead insertion** (diameters {0.7, 0.9, 1.3, 1.4, 2.0} mm; angles {−20°, −10°, 0°, +10°, +20°}; train on −20°,0°, +20°; test on −10°, +10°).

---

## Results

### Self‑Touch Prediction (Phase‑1)

Across held‑out episodes, (\hat S) closely tracks raw‑tactile during sustained finger–finger contact; the **error channel** spikes primarily at contact onsets/offsets, acting as a useful event cue rather than noise. Correlations on self‑contact segments are high (thumb: ~0.96; index: ~0.98).

### Task Success (Phase‑2)

**Paper‑clip fixing (10 trials/condition)**

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

**Pencil‑lead insertion (10 trials/condition; (t)=test angles)**

| Angle →                                      |      −20° |  −10° (t) |        0° |  +10° (t) |      +20° |         **Total** |
| -------------------------------------------- | --------: | --------: | --------: | --------: | --------: | ----------------: |
| **RT only** (0.7 / 0.9 / 1.3 / 1.4 / 2.0 mm) | 0/1/3/3/3 | 1/2/3/3/4 | 2/2/4/4/5 | 1/3/3/3/5 | 1/2/2/2/4 |  **66/250 = 26%** |
| **RT+Self** (0.7 / 0.9 / 1.3 / 1.4 / 2.0 mm) | 3/4/6/6/7 | 5/6/7/7/8 | 5/5/8/8/9 | 4/4/6/7/8 | 4/3/5/5/6 | **146/250 = 58%** |

**Takeaway:** Using **self‑touch alongside total tactile** improves motion clarity and helps the controller disambiguate finger contact from true object contact—crucial for precise in‑hand insertion and generalization to unseen conditions (e.g., middle coin slot, intermediate angles).

---

## Model Details (Phase‑1 FCN & Phase‑2 RNN)

**Self‑Touch FCN (Phase‑1)**

* **Input:** ([q_t, q^{\mathrm{cmd}}_t] \in \mathbb{R}^{16})
* **Hidden:** 128 (GELU; dropout 0.2)
* **Head:** Linear→GELU stacks mapping to: index tip (90), thumb tip (90), and auxiliary joint state (8)

**Motion Learning RNN (Phase‑2)**

* **Core:** LSTMCell, hidden = 100
* **Inputs:** ST‑RNN: (T) (180) + (\hat S) (180) + (q_t) (8) → 368;  T‑RNN: (T) (180) + (q_t) (8) → 188
* **Decoder:** Linear(100→128)→ReLU→Linear(128→196)
* **Outputs:** (\hat T) index (90) + thumb (90), (\hat q_{t+1}) (8), (\hat q^{\mathrm{cmd}}_{t+1}) (8)

---

## Improvements & Future Work

* Improve **axis‑dependent** self‑touch fidelity (e.g., axis‑wise losses, attention).
* Extend to **multi‑finger** settings (more dense self‑contacts) and **bimanual** cases.
* Explore **explicit external‑tactile heads** trained on (E_t) distributions for even cleaner control signals.

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
