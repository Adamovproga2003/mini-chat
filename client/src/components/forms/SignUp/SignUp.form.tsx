import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { signUp } from "../../../api/sign-up";
import { useAuth } from "../../../hooks/useAuth";
import { SignUpInputs } from "../../../types/SignUpInputs";
import { FormInput } from "../../components";
import styles from "./SignUp.module.scss";

type Props = {
  handleClose: () => void;
};

const SignUpForm = ({ handleClose }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const { onChangeAuth, onChangeUsername } = useAuth();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: SignUpInputs) => {
      const username = await signUp(values);
      return { username };
    },
    onError(error: Error) {
      if (error instanceof Error) {
        setError("confirmPassword", {
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

  const onSubmit = (data: SignUpInputs) => mutate(data);

  useEffect(() => {
    if (isSuccess) {
      const id = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => clearTimeout(id);
    }
  }, [handleClose, isSuccess]);

  if (isSuccess) {
    return <div>Sign up successful! You can now log in.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormInput
        name={"username"}
        id="username"
        label="Username"
        placeholder="Username..."
        register={register}
        rules={{ required: "The field is required" }}
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
        rules={{ required: "The field is required" }}
        className={styles.input}
        error={errors.password}
      />
      <FormInput
        name={"confirmPassword"}
        id="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Confirm password..."
        register={register}
        rules={{ required: "The field is required" }}
        className={styles.input}
        error={errors.confirmPassword}
      />

      <button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? <PulseLoader /> : "Sign up"}
      </button>
    </form>
  );
};

export default SignUpForm;
