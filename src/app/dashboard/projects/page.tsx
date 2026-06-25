import styles from './styles.module.css';

export default function ComingSoon({
  title = "PROJECT ANALYZER",
  description = "AI-powered project analysis and planning."
}) {
  return (
    <div className="coming-soon">
      <span className="tag">AI TOOL</span>

      <h1>
        {title}
        <span>.</span>
      </h1>

      <p>{description}</p>

      <div className="status-card">
        <div className="status-dot"></div>

        <div>
          <h3>Feature Loading...</h3>

          <p>
            We're still cooking this feature. Mixing AI, creativity,
            and a little caffeine.
          </p>

          <small>ETA: Soon™</small>
        </div>
      </div>
    </div>
  );
}