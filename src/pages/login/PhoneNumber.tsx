import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import styles from "./login.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actUpdatePhone from "@/store/auth/act/actUpdatePhone";
import { useNavigate } from "react-router-dom";

export type TPhone = {
  phoneNumber: string;
  token: string;
};

const PhoneNumber = () => {
  const { loginBox, phoneField } = styles;
  const { control, handleSubmit } = useForm<TPhone>();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TPhone> = (data) => {
    data["token"] = user?.token || "";
    console.log('user from phone number', user);
    console.log(data);
    dispatch(actUpdatePhone(data))
      .unwrap()
      .then(() => navigate(`/${user.user_type.toLowerCase()}`));
  };

  return (
    <article className={loginBox}>
      <h2>رقم الهاتف</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          rules={{
            validate: (value) => matchIsValidTel(value),
          }}
          render={({ field, fieldState }) => (
            <MuiTelInput
              {...field}
              defaultCountry="EG"
              helperText={fieldState.invalid ? "رقم الهاتف غير صالح" : ""}
              error={fieldState.invalid}
              className={phoneField}
            />
          )}
          name="phoneNumber"
        />
        <button type="submit">
          {/* {loading === "pending" ? "جاري التسجيل..." : "تسجيل الدخول"} */}
          تسجيل الدخول
        </button>
      </form>
    </article>
  );
};

export default PhoneNumber;
