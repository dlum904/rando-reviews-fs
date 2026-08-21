import { useState, type FormEvent } from "react";
import { authClient } from "../auth";

type AuthModalProps = {
  onClose: () => void;
  onSignedIn: () => void;
};

const AuthModal = ({ onClose, onSignedIn }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = isSignUp
      ? await authClient.signUp.email({
          name: email.split("@")[0] || "User",
          email,
          password,
        })
      : await authClient.signIn.email({ email, password });

    setSubmitting(false);

    if (result.error) {
      setError(result.error.message ?? "Authentication failed");
      return;
    }

    onSignedIn();
  };

  return (
    <div className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-xl w-full max-w-md border border-slate-700 ring-1 ring-blue-500/30 shadow-2xl shadow-black/60 text-left"
      >
        <div className="flex justify-between items-center">
          <h2 className="!my-0 !text-xl">{isSignUp ? "Sign Up" : "Sign In"}</h2>
          <button
            type="button"
            className="rounded-md px-2 py-0.5 text-slate-400 transition-colors cursor-pointer hover:bg-blue-600 hover:text-white"
            aria-label="Close authentication"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="text-blue-400 hover:text-blue-300 cursor-pointer"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthModal;
