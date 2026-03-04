import React from "react";
import "../assets/styles/Project.scss";

const robotArmVideos = [
  {
    title: "Bimanual object handling",
    href: "https://www.youtube.com/watch?v=avQ0WtzYIRw",
    embed: "https://www.youtube.com/embed/avQ0WtzYIRw",
    description: "Home-built manipulation demo focused on coordinated arm motion and stable object handling.",
  },
  {
    title: "Precision pick and place",
    href: "https://www.youtube.com/watch?v=obIE7zeA9dM",
    embed: "https://www.youtube.com/embed/obIE7zeA9dM",
    description: "A hobby robot-arm setup performing repeatable grasping and controlled placement.",
  },
  {
    title: "End-effector coordination",
    href: "https://www.youtube.com/watch?v=kfex-0hAYPs",
    embed: "https://www.youtube.com/embed/kfex-0hAYPs",
    description: "Manipulation experiment exploring reachability, motion timing, and arm coordination.",
  },
  {
    title: "Workspace manipulation test",
    href: "https://www.youtube.com/watch?v=Ln-NrnSU2Rs",
    embed: "https://www.youtube.com/embed/Ln-NrnSU2Rs",
    description: "General manipulation pass showing object interaction across the working area of the arm.",
  },
  {
    title: "Control refinement demo",
    href: "https://www.youtube.com/watch?v=u2e-o8vRAPc",
    embed: "https://www.youtube.com/embed/u2e-o8vRAPc",
    description: "Iteration focused on smoother arm control, better motion planning, and cleaner task execution.",
  },
  {
    title: "Robot arm hobby build",
    href: "https://www.youtube.com/watch?v=M9erBA6l3XQ",
    embed: "https://www.youtube.com/embed/M9erBA6l3XQ",
    description: "A broader look at the home robot-arm manipulation project and the system in action.",
  },
];

const mechatronicsProject = {
  title: "Mechatronics Laboratory Advanced",
  href: "https://www.youtube.com/watch?v=pT1KjW0tySg",
  embed: "https://www.youtube.com/embed/pT1KjW0tySg",
  description:
    "Selected as 1 of the 2 best projects out of 15 course projects for Mechatronics Laboratory Advanced.",
};

const printProjects = [
  {
    title: "Time in Hand",
    src: `${process.env.PUBLIC_URL}/hand.mov`,
    description: "Self-designed and printed working clock built in the shape of a hand.",
  },
  {
    title: "The Green Goblin",
    src: `${process.env.PUBLIC_URL}/quad.mov`,
    description: "Self-designed and printed quadrupod prototype exploring motion and mechanical character.",
  },
];

function Project() {
  return (
    <div className="projects-container" id="projects">
      <h1>Projects</h1>

      <div className="projects-grid">
        <section className="project project-feature">
          <div className="project-header">
            <h2>Robot Arm Manipulation</h2>
            <p>Home robotics hobby series documenting robot-arm manipulation experiments and control iterations.</p>
          </div>

          <div className="project-series-grid">
            {robotArmVideos.map((video) => (
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
                <p>{video.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="project">
          <div className="project-header">
            <h2>{mechatronicsProject.title}</h2>
            <p>{mechatronicsProject.description}</p>
          </div>

          <div className="project-embed-frame">
            <iframe
              src={mechatronicsProject.embed}
              title={mechatronicsProject.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <a href={mechatronicsProject.href} target="_blank" rel="noreferrer">
            <h3>Watch project video</h3>
          </a>
        </section>

        <section className="project">
          <div className="project-header">
            <h2>3D Prints</h2>
            <p>Personal design-and-print builds focused on character, motion, and functional mechanical form.</p>
          </div>

          <div className="project-print-grid">
            {printProjects.map((project) => (
              <article key={project.title} className="project-media-card">
                <div className="project-local-video">
                  <video controls playsInline preload="metadata">
                    <source src={project.src} type="video/quicktime" />
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
