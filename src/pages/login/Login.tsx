import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import LoginSchema, { TFormData } from "@/validations/LoginSchema";

import AppleIcon from "@/assets/apple.svg?react";

import styles from "./login.module.css";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actAuthLogin, actGoogleLogin } from "@/store/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
const Login = () => {

  const { loading, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    loginBox,
    loginWithBox,
    actionsBox,
    hide,
  } = styles;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<TFormData> = (data) => {
    console.log("login data", data);
    dispatch(actAuthLogin(data))
      .unwrap()
      .then((data) => {
        if (data.user.phone === "None") {
         navigate("/set-phoneNumber")
         return;
        }

        navigate("/home");
      });
  };

  const googleLoginHandler = (credential: string) => {
    dispatch(actGoogleLogin(credential))
      .unwrap()
      .then((data) => {
        console.log('google login response', data);
        if (data.phone === "None") {
         navigate("/set-phoneNumber")
         return;
        }

        navigate("/home");
      });
  };

  return (
    <article className={loginBox}>
      <h2>تسجيل الدخول</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <label htmlFor="email">
              <span className={field.value ? hide : ""}>البريد الالكتروني</span>
              <input type="text" id="email" {...field} />
            </label>
          )}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <label htmlFor="password">
              <span className={field.value ? hide : ""}>كلمة المرور</span>
              <input type="password" id="password" {...field} />
            </label>
          )}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <Link to="#">هل نسيت كلمة المرور؟</Link>
        <button type="submit" disabled={loading === "pending"}>
          {loading === "pending" ? "جاري التسجيل..." : "تسجيل الدخول"}
        </button>
        {error && (
          <p className="error" style={{ textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>
      <div className={loginWithBox}>
        <p>
          <span>أو تسجيل الدخول باستخدام</span>
        </p>
        <div className={actionsBox}>
          <div>
            <GoogleLogin
              onSuccess={({ credential }) => {
                googleLoginHandler(credential as string);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <button>
            Apple
            <AppleIcon />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Login;
