import React from "react";
import "../assets/styles/Project.scss";

const robotArmVideos = [
  {
    title: "Bimanual object handling",
    href: "https://www.youtube.com/watch?v=avQ0WtzYIRw",
    embed: "https://www.youtube.com/embed/avQ0WtzYIRw",
    description:
      "I extended the control code so I could manually guide the arm with a remote, record every servo step into a sequence, and replay that motion automatically. The same idea can be reused to store many task demonstrations and gradually turn manual routines into repeatable automated behaviors.",
  },
  {
    title: "Precision pick and place",
    href: "https://www.youtube.com/watch?v=obIE7zeA9dM",
    embed: "https://www.youtube.com/embed/obIE7zeA9dM",
    description:
      "This demo transfers different materials between cups using positional coordinates and joint-angle control. I tested both solids like glass sand and fluids like green tea, with the idea that higher performance servos and finer speed control would enable much cleaner, low-spill pouring.",
  },
  {
    title: "End-effector coordination",
    href: "https://www.youtube.com/watch?v=kfex-0hAYPs",
    embed: "https://www.youtube.com/embed/kfex-0hAYPs",
    description:
      "Here I was benchmarking the servo system itself: current, voltage, movement range, and the point where the robot could move at maximum speed with the least visible jitter. It was essentially an optimization pass to find the arm's most stable high-speed operating condition.",
  },
  {
    title: "Workspace manipulation test",
    href: "https://www.youtube.com/watch?v=Ln-NrnSU2Rs",
    embed: "https://www.youtube.com/embed/Ln-NrnSU2Rs",
    description:
      "This project uses joint-angle control together with Jacobian-based kinematics so the robot can learn cup positions and stack them accurately. A lot of time went into refining coordinates and reducing jitter caused by servo current draw during placement.",
  },
  {
    title: "Control refinement demo",
    href: "https://www.youtube.com/watch?v=u2e-o8vRAPc",
    embed: "https://www.youtube.com/embed/u2e-o8vRAPc",
    description:
      "I used an HC-SR04 ultrasonic sensor to estimate box size from measured distance, then combined that sensing with forward and inverse kinematics to pick each box and sort it into the correct size bin automatically.",
  },
  {
    title: "Robot arm hobby build",
    href: "https://www.youtube.com/watch?v=M9erBA6l3XQ",
    embed: "https://www.youtube.com/embed/M9erBA6l3XQ",
    description:
      "This one was coded, calculated, and built by me for fun. It uses hand-worked forward and inverse kinematics with joint-angle calculations for a 4-DOF arm built around three joints and a gripper.",
  },
];

const mechatronicsProject = {
  title: "Mechatronics Laboratory Advanced",
  href: "https://www.youtube.com/watch?v=pT1KjW0tySg",
  embed: "https://www.youtube.com/embed/pT1KjW0tySg",
  description:
    "An Arduino-based, zero-budget, remote-controlled 2-axis robot arm for sorting packages by size. It was designed as both a practical sorting prototype and an accessible DIY starter platform for students learning torque limits, axis control, and load calculations, and it was selected as 1 of the 2 best projects out of 15 in Mechatronics Laboratory Advanced.",
};

const printProjects = [
  {
    title: "Time in Hand",
    srcMp4: `${process.env.PUBLIC_URL}/hand.mp4`,
    srcMov: `${process.env.PUBLIC_URL}/hand.mov`,
    description: "Self-designed and printed working clock built in the shape of a hand.",
  },
  {
    title: "The Green Goblin",
    srcMp4: `${process.env.PUBLIC_URL}/quad.mp4`,
    srcMov: `${process.env.PUBLIC_URL}/quad.mov`,
    description: "Self-designed and printed quadrupod prototype exploring motion and mechanical character.",
  },
];

const workVideos = {
  fingerVision: [
    {
      title: "Cable Manipulation",
      srcMp4: `${process.env.PUBLIC_URL}/cable_manip.mp4`,
      srcMov: `${process.env.PUBLIC_URL}/cable_manip.mov`,
      description:
        "Manipulation of cable reorientation from Y axis to X axis.",
    },
    {
      title: "Card Manipulation",
      srcMp4: `${process.env.PUBLIC_URL}/card_manip.mp4`,
      srcMov: `${process.env.PUBLIC_URL}/card_manip.mov`,
      description:
        "Manipulation of picking one card from a pack of three, then placing two on one side and one on the other.",
    },
  ],
  oid: {
    srcMp4: `${process.env.PUBLIC_URL}/o-id.mp4`,
    srcMov: `${process.env.PUBLIC_URL}/o-id.mov`,
    description: "Render of design of the body of a humanoid in Fusion 360.",
  },
  tcs: {
    srcMp4: `${process.env.PUBLIC_URL}/tcs.mp4`,
    srcMov: `${process.env.PUBLIC_URL}/tcs.mov`,
    description:
      "Teleoperation demo showing brush contact on a cardboard edge to extract force data through haptic feedback.",
  },
};

function Project() {
  const robotArmSeries = [
    ...robotArmVideos,
    {
      title: mechatronicsProject.title,
      href: mechatronicsProject.href,
      embed: mechatronicsProject.embed,
      description: mechatronicsProject.description,
    },
  ];

  const workSeries = [
    {
      group: "FingerVision",
      title: workVideos.fingerVision[0].title,
      srcMp4: workVideos.fingerVision[0].srcMp4,
      srcMov: workVideos.fingerVision[0].srcMov,
      description: workVideos.fingerVision[0].description,
    },
    {
      group: "FingerVision",
      title: workVideos.fingerVision[1].title,
      srcMp4: workVideos.fingerVision[1].srcMp4,
      srcMov: workVideos.fingerVision[1].srcMov,
      description: workVideos.fingerVision[1].description,
    },
    {
      group: "O-ID",
      title: "Humanoid Body Render",
      srcMp4: workVideos.oid.srcMp4,
      srcMov: workVideos.oid.srcMov,
      description: workVideos.oid.description,
    },
    {
      group: "TCS",
      title: "Teleoperation Force Demo",
      srcMp4: workVideos.tcs.srcMp4,
      srcMov: workVideos.tcs.srcMov,
      description: workVideos.tcs.description,
    },
  ];

  return (
    <div className="projects-container" id="projects">
      <h1>Projects</h1>

      <div className="projects-grid">
        <section className="project">
          <div className="project-header">
            <h2>Work</h2>
          </div>

          <div className="work-video-grid work-video-grid-square">
            {workSeries.map((video) => (
              <article key={`${video.group}-${video.title}`} className="project-media-card work-video-card">
                <div className="project-local-video work-local-video">
                  <video autoPlay muted loop controls playsInline preload="metadata">
                    <source src={video.srcMp4} type="video/mp4" />
                    <source src={video.srcMov} type="video/quicktime" />
                    Your browser does not support the embedded video player.
                  </video>
                </div>
                <span className="work-video-group">{video.group}</span>
                <h4>{video.title}</h4>
                <p>{video.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="project project-feature">
          <div className="project-header">
            <h2>Robot Arm Manipulation</h2>
            <p>
              Home robotics hobby series documenting robot-arm manipulation experiments and control
              iterations, including the highlighted Mechatronics Laboratory Advanced project.
            </p>
          </div>

          <div className="project-series-grid">
            {robotArmSeries.map((video) => (
              <article key={video.href} className="project-media-card">
                <div className="project-embed-frame">
                  <iframe
                    src={video.embed}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <a href={video.href} target="_blank" rel="noreferrer">
                  <h3>{video.title}</h3>
                </a>
                {video.title === mechatronicsProject.title ? (
                  <p className="project-badge">
                    Selected as 1 of the 2 best projects out of 15 course projects.
                  </p>
                ) : null}
                <p>{video.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="project">
          <div className="project-header">
            <h2>3D Prints</h2>
            <p>Personal design-and-print builds focused on character, motion, and functional mechanical form.</p>
          </div>

          <div className="project-print-grid">
            {printProjects.map((project) => (
              <article key={project.title} className="project-media-card project-print-card">
                <div className="project-local-video project-print-video">
                  <video autoPlay muted loop controls playsInline preload="metadata">
                    <source src={project.srcMp4} type="video/mp4" />
                    <source src={project.srcMov} type="video/quicktime" />
                    Your browser does not support the embedded video player.
                  </video>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Project;
