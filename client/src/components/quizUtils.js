import confetti from "canvas-confetti";

export const handleCorrectAnswer = () => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 },
    gravity: 1.5,
    ticks: 150,
    decay: 0.9,
    scalar: 0.8,
  });
};
