import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import styles from "./SignUp.module.scss";
type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

type Props = {};

const SignUpForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({
    password,
    confirmPassword,
    username,
  }) => {
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        message: "Confirm password is not match with the password",
      });
    }
  };

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

      <button type="submit" className={styles.submit}>
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
