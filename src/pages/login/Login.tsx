import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import LoginSchema, { TFormData } from "@/validations/LoginSchema";

import styles from "./login.module.css";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actAuthLogin, actGoogleLogin } from "@/store/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { actGetUserProfile } from "@/store/profile/ProfileSlice";
import { actGetReviewQuestions } from "@/store/review-questions/reviewSlice";
import actFCMLogin from "@/store/FCM/act/actFCMLogin";
import { useFirebaseMessaging } from "@/hooks";
import actGetLessons from "@/store/lessons/act/actGetLessons";
import { endOfMonth, format, startOfMonth } from "date-fns";
import actGetLessonsByRange from "@/store/lessons/act/actGetLessonsByRange";

const Login = () => {
  const { loading, error } = useAppSelector((state) => state.auth);

  const { fcmToken } = useFirebaseMessaging();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const today = new Date();
  const startDate = startOfMonth(today);
  const endDate = endOfMonth(today);

  const { loginBox, loginWithBox, actionsBox, hide } = styles;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<TFormData> = (data) => {
    dispatch(actAuthLogin(data))
      .unwrap()
      .then((data) => {
        if (data.set_password_url) {
          navigate(`/set-password`);
        } else {
          if (data.user?.phone === null) {
            navigate("/set-phoneNumber");
            return;
          }
          dispatch(actGetUserProfile(data.user.token));
          dispatch(actGetReviewQuestions(data.user.token));
          dispatch(
            actGetLessonsByRange({
              token: data.user.token,
              start_date: format(startDate, "yyyy-MM-dd"),
              end_date: format(endDate, "yyyy-MM-dd"),
            })
          );
          if (fcmToken) {
            dispatch(
              actFCMLogin({ user_token: data.user.token, FCM_token: fcmToken })
            );
          }
          navigate(`/${data.user?.user_type?.toLowerCase()}`, {
            replace: true,
          });
        }
      });
  };

  const googleLoginHandler = (credential: string) => {
    dispatch(actGoogleLogin(credential))
      .unwrap()
      .then((data) => {
        // if (data.phone === 'None') {
        //   navigate("/set-phoneNumber");
        //   return;
        // }
        if (data.user_type && data.phone) {
          navigate(`/${data.user_type?.toLowerCase()}`, { replace: true });
        } else {
          alert("you are not registered yet");
        }
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
          {/* <button>
            Apple
            <AppleIcon />
          </button> */}
        </div>
      </div>
    </article>
  );
};

export default Login;
