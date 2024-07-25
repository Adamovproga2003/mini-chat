import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { login } from "../../../api/login";
import { useAuth } from "../../../hooks/useAuth";
import { LoginInputs } from "../../../types/Login";
import { FormInput } from "../../components";
import styles from "./Login.module.scss";

type Props = {
  handleClose: () => void;
};

const LoginForm = ({ handleClose }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>();

  const { onChangeAuth, onChangeUsername } = useAuth();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: LoginInputs) => {
      const response = await login(values);
      return response;
    },
    onError(error) {
      if (error instanceof Error) {
        setError("password", {
          message: error.message,
        });
      }
    },
    onSuccess(data) {
      if (data) {
        const { username } = data;
        onChangeAuth(true);
        onChangeUsername(username || null);
      }
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => mutate(data);

  useEffect(() => {
    if (isSuccess) {
      const id = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => clearTimeout(id);
    }
  }, [handleClose, isSuccess]);

  if (isSuccess) {
    return <div>Login successfully completed!</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormInput
        name={"username"}
        id="username"
        label="Username"
        placeholder="Username..."
        register={register}
        rules={{ required: true }}
        className={styles.input}
        error={errors.username}
      />
      <FormInput
        name={"password"}
        id="password"
        label="Password"
        type="password"
        placeholder="Password..."
        register={register}
        rules={{ required: true }}
        className={styles.input}
        error={errors.password}
      />

      <button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? <PulseLoader /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
