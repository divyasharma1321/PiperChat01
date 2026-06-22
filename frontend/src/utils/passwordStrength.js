// utils/passwordStrength.js
// Scores password strength based on length and character variety.
// Returns: { score (0-4), label ("Weak" | "Medium" | "Strong"), color }

export function getPasswordStrength(password) {
  if (!password) {
    return { score: 0, label: "", color: "rgba(255,255,255,0.1)" };
  }

  let score = 0;

  // Length factors
  if (password.length >= 7) score++;
  if (password.length >= 12) score++;

  // Character variety factors
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  // Normalize score to 0-4 scale
  const normalized = Math.min(score, 6);

  if (normalized <= 2) {
    return { score: normalized, label: "Weak", color: "#ef4444" };
  } else if (normalized <= 4) {
    return { score: normalized, label: "Medium", color: "#eab308" };
  } else {
    return { score: normalized, label: "Strong", color: "#22c55e" };
  }
}