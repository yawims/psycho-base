"use client";
import { useState, useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useRouter } from "next/navigation";
import { minikitConfig } from "../minikit.config";
import styles from "./page.module.css";

const QUESTIONS = [
  {
    id: 1,
    question: "When facing a stressful situation, you tend to:",
    answers: [
      { text: "Face it directly", value: 5 },
      { text: "Seek a creative solution", value: 4 },
      { text: "Ask for help from others", value: 3 },
      { text: "Avoid the problem", value: 1 },
    ],
  },
  {
    id: 2,
    question: "In social relationships, you feel most comfortable when:",
    answers: [
      { text: "You're the center of attention", value: 5 },
      { text: "Sharing stories with close friends", value: 4 },
      { text: "Listening to others", value: 3 },
      { text: "Being alone", value: 1 },
    ],
  },
  {
    id: 3,
    question: "Your approach to work or tasks is:",
    answers: [
      { text: "Perfect or nothing at all", value: 5 },
      { text: "Very detailed and planned", value: 4 },
      { text: "Good enough and flexible", value: 3 },
      { text: "Just get it done", value: 1 },
    ],
  },
  {
    id: 4,
    question: "When there's a new idea, you:",
    answers: [
      { text: "Try it immediately and experiment", value: 5 },
      { text: "Think carefully first", value: 4 },
      { text: "Wait for others to try it first", value: 3 },
      { text: "Reject it and stick with the old way", value: 1 },
    ],
  },
  {
    id: 5,
    question: "Your approach to making important decisions is:",
    answers: [
      { text: "Follow your instinct", value: 5 },
      { text: "Analyze pros and cons", value: 4 },
      { text: "Ask others for advice", value: 3 },
      { text: "Procrastinate on decisions", value: 1 },
    ],
  },
  {
    id: 6,
    question: "When receiving criticism, you usually:",
    answers: [
      { text: "Respond defensively right away", value: 5 },
      { text: "Accept it and learn from it", value: 4 },
      { text: "Reflect to understand it", value: 3 },
      { text: "Ignore the criticism", value: 1 },
    ],
  },
  {
    id: 7,
    question: "In managing finances, you are the type who:",
    answers: [
      { text: "Takes aggressive risks", value: 5 },
      { text: "Is careful and planned", value: 4 },
      { text: "Follows expert advice", value: 3 },
      { text: "Doesn't care or is reckless", value: 1 },
    ],
  },
  {
    id: 8,
    question: "Regarding ethics and values, you are:",
    answers: [
      { text: "Very principled and firm", value: 5 },
      { text: "Consistent with personal values", value: 4 },
      { text: "Flexible based on the situation", value: 3 },
      { text: "Don't have clear standards", value: 1 },
    ],
  },
  {
    id: 9,
    question: "When alone, you most often:",
    answers: [
      { text: "Plan big things", value: 5 },
      { text: "Reflect on yourself", value: 4 },
      { text: "Relax and take it easy", value: 3 },
      { text: "Feel anxious or bored", value: 1 },
    ],
  },
  {
    id: 10,
    question: "Your dream for the future is:",
    answers: [
      { text: "Achieve something extraordinary", value: 5 },
      { text: "Stable and secure", value: 4 },
      { text: "Happy and satisfied", value: 3 },
      { text: "I don't know yet", value: 1 },
    ],
  },
];

export default function Home() {
  const { isFrameReady, setFrameReady } = useMiniKit();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAnswer = (value: number) => {
    const newScore = score + value;
    setScore(newScore);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleStartOver = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  const handleShareResults = () => {
    const encodedType = encodeURIComponent(personalityResult.type);
    router.push(`/success?type=${encodedType}&score=${score}`);
  };

  const getPersonalityType = (finalScore: number) => {
    const maxScore = 50;
    const percentage = (finalScore / maxScore) * 100;

    if (percentage >= 80) {
      return {
        type: "Dominant Extrovert",
        description: "You are a brave person, full of initiative, and not afraid to take risks!",
        emoji: "🔥",
      };
    } else if (percentage >= 60) {
      return {
        type: "Smart Realist",
        description: "You are balanced between adventure and intelligence in making decisions.",
        emoji: "⚡",
      };
    } else if (percentage >= 40) {
      return {
        type: "Balanced Introvert",
        description: "You are calm, a good listener, and have wisdom in your actions.",
        emoji: "🌙",
      };
    } else {
      return {
        type: "Contemplative Thinker",
        description: "You are a deep thinker who needs time to understand the world.",
        emoji: "🧘",
      };
    }
  };

  const personalityResult = getPersonalityType(score);
  const progressPercentage = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} type="button">
        ✕
      </button>

      <div className={styles.content}>
        {!showResults ? (
          <div className={styles.quizContainer}>
            <div className={styles.header}>
              <h1 className={styles.title}>{minikitConfig.miniapp.name}</h1>
              <p className={styles.tagline}>{minikitConfig.miniapp.tagline}</p>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className={styles.progressText}>
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </p>

            <div className={styles.questionCard}>
              <h2 className={styles.question}>
                {QUESTIONS[currentQuestion].question}
              </h2>

              <div className={styles.answersContainer}>
                {QUESTIONS[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    className={styles.answerButton}
                    onClick={() => handleAnswer(answer.value)}
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.resultsContainer}>
            <div className={styles.resultEmoji}>{personalityResult.emoji}</div>
            <h2 className={styles.resultType}>{personalityResult.type}</h2>
            <p className={styles.resultDescription}>{personalityResult.description}</p>

            <div className={styles.scoreBox}>
              <p className={styles.scoreLabel}>Total Psycho Score</p>
              <p className={styles.scoreValue}>{score}/50</p>
            </div>

            <div className={styles.resultActions}>
              <button
                className={styles.shareButton}
                onClick={handleShareResults}
              >
                🚀 SHARE RESULTS
              </button>
              <button
                className={styles.retryButton}
                onClick={handleStartOver}
              >
                🔄 RETAKE QUIZ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
