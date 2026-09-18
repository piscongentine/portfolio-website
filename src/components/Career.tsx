import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My journey <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech, Computer Science & Engineering</h4>
                <h5>Haridwar University</h5>
              </div>
              <h3>2023-2027</h3>
            </div>
            <p>
              CGPA 8.12 / 10 through 6th semester. Senior Secondary (CBSE) in
              2023, Secondary School (CBSE) in 2020.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science Intern (Remote)</h4>
                <h5>Prodigy Infotech</h5>
              </div>
              <h3>Feb 2025</h3>
            </div>
            <p>
              Delivered data analysis and machine learning projects using
              Python, conducting EDA to identify patterns and actionable
              insights across real-world datasets.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science Intern</h4>
                <h5>E2R Online Services Pvt. Ltd</h5>
              </div>
              <h3>Jun-Jul 2025</h3>
            </div>
            <p>
              Built and benchmarked LSTM, Prophet, ARIMA, SARIMA and XGBoost
              models for Battery Management System forecasting on
              Hardware-in-the-Loop data, designing hybrid models that
              improved accuracy over single-model baselines.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Open Source Contributor & Mentor</h4>
                <h5>GirlScript Summer of Code</h5>
              </div>
              <h3>Jul-Sep 2025</h3>
            </div>
            <p>
              Contributed to "MLOps Automation for ML Algorithm Failures",
              running code reviews and debugging sessions, and was ranked
              18th Best Mentor nationally in the official GSSoC rankings.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science and Analytics Trainee</h4>
                <h5>Amdox Technologies</h5>
              </div>
              <h3>Jun-Aug 2026</h3>
            </div>
            <p>
              Completed a structured training programme covering the
              end-to-end analytics workflow, from data ingestion and
              cleaning through modelling and reporting, using Python, Pandas
              and Scikit-learn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
