import { useEffect, useState } from "react";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdArrowOutward,
  MdClose,
} from "react-icons/md";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    name: "Super Store Data Analysis",
    category: "Cloud Data Analytics",
    tools: "IBM Watsonx.ai, IBM Cloud, Data Refinery",
    link: "https://github.com/piscongentine/SUPER-STORE-DATA-ANALYSIS",
    image: "/images/project-superstore.svg",
    description:
      "A hands-on retail analytics pipeline built on IBM Cloud: created a Data Analytics project in Watsonx.ai Studio and imported the Sample Super Store dataset as a verified data asset. Refined the data in IBM Data Refinery with automatic column type conversion across shipping mode, segment, geography and sales/profit fields, then analyzed it with a pie chart for profit distribution by region, a bar chart for transaction volume, and a Pareto chart isolating the vital few regions driving most business value.",
  },
  {
    name: "Face Recognition Attendance System",
    category: "Computer Vision",
    tools: "Python, OpenCV, Face Recognition",
    link: "https://github.com/piscongentine",
    image: "/images/project-facerecog.svg",
    description:
      "An automated attendance system that identifies individuals in real time from live camera input and logs attendance to a database. Built as a GUI application with a live camera feed, status logs and attendance tracking designed for non-technical end users, removing manual attendance entry and automating record storage and reporting.",
  },
  {
    name: "Hybrid CNN-HOG Image Recognition",
    category: "Deep Learning",
    tools: "CNN, HOG, Computer Vision",
    link: "https://github.com/piscongentine",
    image: "/images/project-cnnhog.svg",
    description:
      "A hybrid model combining Convolutional Neural Networks with Histogram of Oriented Gradients (HOG) feature extraction for image recognition. Optimised the architecture to reduce GPU load and inference time while maintaining recognition accuracy, and evaluated the trade-offs between classical computer vision features and deep learning representations.",
  },
  {
    name: "iThyro - Diagnostic Chatbot",
    category: "AI / NLP / Healthcare",
    tools: "NLP, Domain Knowledge Base",
    link: "https://github.com/piscongentine",
    image: "/images/project-ithyro.svg",
    description:
      "An early-stage, ongoing research project exploring a domain-specific chatbot that offers thyroid diagnostic insight and medical examination guidance from user inputs. Scoping a self-reliant domain knowledge base for personalised healthcare assistance and test report interpretation.",
  },
];

const Work = () => {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    document.body.classList.toggle("modal-open", selected !== null);
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [selected]);

  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  const handleLoad = () => {
    setTranslateX();
    ScrollTrigger.getById("work")?.vars.end &&
      (ScrollTrigger.getById("work")!.vars.end = `+=${translateX}`);
    ScrollTrigger.refresh();
  };
  window.addEventListener("load", handleLoad);
  const refreshTimer = setTimeout(handleLoad, 1200);

  // Clean up (optional, good practice)
  return () => {
    window.removeEventListener("load", handleLoad);
    clearTimeout(refreshTimer);
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
                onOpen={() => setSelected(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          className="work-modal-overlay"
          onClick={() => setSelected(null)}
          data-cursor="disable"
        >
          <div className="work-modal" onClick={(e) => e.stopPropagation()}>
            <div className="work-modal-topbar">
              <button
                className="work-modal-back"
                onClick={() => setSelected(null)}
              >
                <MdArrowBackIosNew /> Back to Work
              </button>
              <button
                className="work-modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <MdClose />
              </button>
            </div>
            <img
              src={projects[selected].image}
              alt={projects[selected].name}
              className="work-modal-image"
            />
            <h3>{projects[selected].name}</h3>
            <p className="work-modal-category">{projects[selected].category}</p>
            <p className="work-modal-desc">{projects[selected].description}</p>
            <h4>Tools and features</h4>
            <p>{projects[selected].tools}</p>
            <a
              href={projects[selected].link}
              target="_blank"
              rel="noopener noreferrer"
              className="work-modal-link"
            >
              View on GitHub <MdArrowOutward />
            </a>

            <div className="work-modal-nav">
              <button
                onClick={() =>
                  setSelected(
                    (selected - 1 + projects.length) % projects.length
                  )
                }
              >
                <MdArrowBackIosNew /> Previous
              </button>
              <span>
                {selected + 1} / {projects.length}
              </span>
              <button
                onClick={() => setSelected((selected + 1) % projects.length)}
              >
                Next <MdArrowForwardIos />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Work;
