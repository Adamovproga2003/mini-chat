import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import styles from "./Login.module.scss";
type Inputs = {
  username: string;
  password: string;
};

type Props = {};

const LoginForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
      />

      <button type="submit" className={styles.submit}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
