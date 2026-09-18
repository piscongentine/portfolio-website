import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm a Computer Science Engineering student and Data Science Intern
          who values depth over breadth, learning what a project actually
          needs and taking it end to end. I've built and benchmarked LSTM,
          Prophet, ARIMA, SARIMA and XGBoost models for battery management
          forecasting, contributed to an open-source MLOps project as a
          GSSoC mentor, and I'm certified across Google Cloud Gen AI Academy
          and IBM SkillsBuild's cloud and AI tracks.
        </p>
      </div>
    </div>
  );
};

export default About;
