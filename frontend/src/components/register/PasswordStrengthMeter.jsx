import { getPasswordStrength } from "../../utils/passwordStrength";

function PasswordStrengthMeter({ password }) {
  const { score, label, color } = getPasswordStrength(password);

  if (!password) return null;

  // 6 possible points total, render as 4 visual segments
  const filledSegments = Math.ceil((score / 6) * 4);

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              background: i < filledSegments ? color : "rgba(255,255,255,0.08)",
            }}
          />
        ))}
      </div>
      <p
        className="text-[11px] font-semibold transition-colors duration-300"
        style={{ color }}
      >
        {label} password
      </p>
    </div>
  );
}

export default PasswordStrengthMeter;