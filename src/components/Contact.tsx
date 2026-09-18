import { MdArrowOutward, MdCopyright } from "react-icons/md";
import GlitchText from "./GlitchText";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a
                href="mailto:shwetpurwar0911@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Shwet%2C%0A%0A"
                data-cursor="disable"
              >
                shwetpurwar0911@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+917985363174" data-cursor="disable">
                +91 79853 63174
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/piscongentine"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://linkedin.com/in/shwet-purwar-4a1532296"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Reimagined and Developed <br /> by <span>Shwet Purwar</span>
            </h2>
            <h5 className="design-credit">
              Original design by{" "}
              <a
                href="https://github.com/MoncyDev"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                Moncy Yohannan
              </a>
            </h5>
          </div>
        </div>

        <div className="copyright-bar">
          <span className="copyright-glow"></span>
          <h5 className="copyright-glitch-line">
            <MdCopyright />
            <GlitchText text="2026 by Piscongentine" />
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;
