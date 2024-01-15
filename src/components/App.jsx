import { useState } from 'react';
import Statistics from './Statistics';
import { AppContainer } from './styledComponents';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
  });

  const onButtonClick = feedbackOption => {
    setFeedback(prev => ({
      ...prev,
      [feedbackOption]: prev[feedbackOption] + 1,
    }));
  };

  const countTotalFeedback = () => {
    return feedback.good + feedback.bad + feedback.neutral;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    const positiveFeedback = feedback.good;

    if (totalFeedback === 0) {
      return 0;
    }

    return Math.round((positiveFeedback / totalFeedback) * 100);
  };

  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  const feedbackOptions = [
    { type: 'good', label: 'Good' },
    { type: 'neutral', label: 'Neutral' },
    { type: 'bad', label: 'Bad' },
  ];

  return (
    <AppContainer>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feedbackOptions}
          onLeaveFeedback={onButtonClick}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback !== 0 ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification />
        )}
      </Section>
    </AppContainer>
  );
};
