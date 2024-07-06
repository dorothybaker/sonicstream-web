import Modal from "./Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthModal from "../hooks/useAuthModal";
import { API } from "../utils/makeRequest";

function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isOpen, onClose } = useAuthModal();

  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  const queryClient = useQueryClient();
  const { mutate: signin, isPending: signingIn } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await API.post("/auth/signin", { email, password });

        if (res.status === 200) {
          const data = res.data;

          setFormData({
            fullName: "",
            email: "",
            password: "",
          });

          return data;
        }
      } catch (error) {
        setError(error.response.data);
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        queryClient.invalidateQueries({ queryKey: ["mySongs"] });
        onChange();
      }
    },
  });

  const { mutate: signup, isPending: signingUp } = useMutation({
    mutationFn: async ({ email, password, fullName }) => {
      try {
        const res = await API.post("/auth/signup", {
          email,
          password,
          fullName,
        });

        if (res.status === 201) {
          const data = res.data;

          setFormData({
            fullName: "",
            email: "",
            password: "",
          });

          return data;
        }
      } catch (error) {
        setError(error.response.data);
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        queryClient.invalidateQueries({ queryKey: ["mySongs"] });
        onChange();
      }
    },
  });

  const { fullName, ...others } = formData;

  const handleLogin = () => {
    signin(others);
  };

  const handleSignup = () => {
    signup(formData);
  };

  return (
    <Modal
      title={isLogin ? "Welcome Back!" : "Welcome to Sonicstream!"}
      description={
        isLogin
          ? "Sign in to access your account"
          : "Sign up to create an account"
      }
      onChange={onChange}
      isOpen={isOpen}
    >
      <div className="h-[2px] bg-white/5 my-3 w-full" />

      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {error && (
          <span className="text-sm text-red-500 font-normal">{error}</span>
        )}
        {!isLogin && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-400">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="h-12 w-full bg-white/15 px-3 outline-none rounded-lg"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-neutral-400">Email address</label>
          <input
            type="email"
            placeholder="Email address"
            className="h-12 w-full bg-white/15 px-3 outline-none rounded-lg"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-neutral-400">
            {isLogin ? "Your password" : "Create a password"}
          </label>
          <input
            type="password"
            placeholder="Your password"
            className="h-12 w-full bg-white/15 px-3 outline-none rounded-lg tracking-[0.27em] placeholder:tracking-normal"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="h-[2px] bg-white/5 my-1 w-full" />
        {isLogin ? (
          <button
            type="submit"
            className="w-full bg-[#22c55e] h-12 rounded-lg flex items-center justify-center"
            onClick={handleLogin}
            disabled={signingIn}
          >
            {signingIn ? (
              <span className="text-white/80 animate-pulse">Signing in</span>
            ) : (
              "Sign in"
            )}
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-[#22c55e] h-12 rounded-lg flex items-center justify-center"
            onClick={handleSignup}
            disabled={signingUp}
          >
            {signingUp ? (
              <span className="text-white/80 animate-pulse">Signing up</span>
            ) : (
              "Sign up"
            )}
          </button>
        )}

        <div>
          {isLogin ? (
            <p className="text-sm font-light">
              First time using Sonicstream?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-[#22c55e] cursor-pointer"
              >
                Sign up!
              </span>
            </p>
          ) : (
            <p className="text-sm font-light">
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-[#22c55e] cursor-pointer"
              >
                Sign in!
              </span>
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default AuthModal;
