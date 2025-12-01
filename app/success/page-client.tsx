"use client";

import { useComposeCast } from '@coinbase/onchainkit/minikit';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { minikitConfig } from "../../minikit.config";
import styles from "./page.module.css";

export function SuccessClient() {
  const { composeCastAsync } = useComposeCast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [personalityType, setPersonalityType] = useState("Ekstrovert Dominan");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const type = searchParams.get('type') || "Ekstrovert Dominan";
    const scoreValue = searchParams.get('score') || "0";
    setPersonalityType(type);
    setScore(parseInt(scoreValue));
  }, [searchParams]);

  const handleShare = async () => {
    try {
      const text = `🧠 I just took the personality psychology test on ${minikitConfig.miniapp.name}! 

My personality type: ${personalityType}
Psycho Score: ${score}/50

${minikitConfig.miniapp.tagline}

Take the test now and discover your personality type! 🔥`;
      
      const result = await composeCastAsync({
        text: text,
        embeds: [process.env.NEXT_PUBLIC_URL || ""]
      });

      if (result?.cast) {
        console.log("Cast created successfully:", result.cast.hash);
      } else {
        console.log("User cancelled the cast");
      }
    } catch (error) {
      console.error("Error sharing cast:", error);
    }
  };

  const handleBackToQuiz = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} type="button">
        ✕
      </button>
      
      <div className={styles.content}>
        <div className={styles.successMessage}>
          <div className={styles.celebration}>🎉</div>
          
          <h1 className={styles.title}>Quiz Complete!</h1>
          
          <div className={styles.resultCard}>
            <p className={styles.resultLabel}>Your Personality Type:</p>
            <h2 className={styles.resultType}>{personalityType}</h2>
            
            <div className={styles.scoreDisplay}>
              <span className={styles.scoreLabel}>Score: </span>
              <span className={styles.scoreValue}>{score}/50</span>
            </div>
          </div>

          <p className={styles.subtitle}>
            Share your results with friends on Warpcast and see their personality types! 🌟
          </p>

          <div className={styles.actions}>
            <button
              onClick={handleShare}
              className={styles.shareButton}
            >
              📤 SHARE ON WARPCAST
            </button>
            <button
              onClick={handleBackToQuiz}
              className={styles.retakeButton}
            >
              🔄 TAKE QUIZ AGAIN
            </button>
          </div>

          <p className={styles.footer}>
            Thanks for playing {minikitConfig.miniapp.name}! 
          </p>
        </div>
      </div>
    </div>
  );
}
