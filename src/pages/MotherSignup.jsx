import { useSignUp, useClerk, useSession } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUpMother = () => {
  const { isLoaded, signUp } = useSignUp();
  const { setActive } = useClerk();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      await signOut();

      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
        unsafeMetadata: { role: "mother" },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      setError(err.errors?.[0]?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  // Email Verification
  const handleVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        await axios.post("http://localhost:5000/api/signup", {
          clerkUserId: completeSignUp.createdUserId,
          email,
          firstName,
          lastName,
          role: "mother",
        });

        navigate("/profile-setup");
      } else {
        setError("Verification process incomplete.");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Google SSO Sign Up
  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback-for-mothers",
        redirectUrlComplete: "/profile-setup",
        unsafeMetadata: {
          role: "mother",
        },
      });
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      console.log(verificationCode);

      await axios.post("http://localhost:5000/api/signup", {
        clerkUserId: completeSignUp.createdUserId,
        email,
        firstName,
        lastName,
        role: "mother",
      });
    } catch (err) {
      setError(err.errors?.[0]?.message || "Google sign up failed");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-8">
        {!pendingVerification ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-rose-600">
                Mother's Tiffin
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                Mother Account Registration
              </h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Google SSO Button */}
            <button
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 mb-6 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  minLength="8"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                  loading ? "bg-rose-400" : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                {loading ? "Creating Account..." : "Register with Email"}
              </button>
            </form>
          </>
        ) : (
          <EmailVerificationView
            email={email}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            handleVerify={handleVerify}
            loading={loading}
            error={error}
          />
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/signin-mother" className="text-rose-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

// Separate component for verification view
const EmailVerificationView = ({
  email,
  verificationCode,
  setVerificationCode,
  handleVerify,
  loading,
  error,
}) => (
  <div className="text-center">
    <h2 className="text-2xl font-semibold text-gray-800">Verify Your Email</h2>
    <p className="text-gray-600 mt-2">Enter the code sent to {email}</p>

    {error && (
      <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">{error}</div>
    )}

    <input
      type="text"
      value={verificationCode}
      onChange={(e) => setVerificationCode(e.target.value)}
      placeholder="Verification code"
      className="w-full px-4 py-2 mt-4 border rounded-lg"
    />

    <button
      onClick={handleVerify}
      disabled={loading}
      className={`w-full py-3 px-4 mt-4 rounded-lg font-medium text-white ${
        loading ? "bg-rose-400" : "bg-rose-600 hover:bg-rose-700"
      }`}
    >
      {loading ? "Verifying..." : "Verify Email"}
    </button>
  </div>
);

export default SignUpMother;
