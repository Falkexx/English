import { useForm } from "react-hook-form";
import Mail from "@/Midias/mail.png";
import Image from "next/image";
import ClosedEyes from "@/Midias/eye-off.png";
import OpenedEyes from "@/Midias/Icons/eye.svg";
import Lock from "@/Midias/lock-closed.png";
import { useState } from "react";
import useValidation from "@/app/Signup/hooks/useValidation"; // Importa o hook de validação

function NewPasswordContainer({ avancar }: { avancar: () => void }) {
  const [seePsswd, setSeePsswd] = useState(false);
  const [seeConfPsswd, setSeeConfPsswd] = useState(false);

  const { register, handleSubmit, watch } = useForm();
  const { errors, validatePassword } = useValidation(); 

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  async function handlePassword(data: { password: string, confirmPassword: string  }) {
    if (validatePassword(data.password, data.confirmPassword)) {
      avancar();
    }
  }

  function handlePasswordVisibility(id: number) {
    if (id === 1) {
      setSeePsswd(!seePsswd);
    } else {
      setSeeConfPsswd(!seeConfPsswd);
    }
  }

  return (
    <>
      <section className="h-[calc(100vh-10vh)] flex flex-col gap-8">
        <article className="w-full">
          <h1 className="text-zinc-800 text-xl font-bold font-['Nunito'] leading-loose">
            Crie uma nova Senha
          </h1>

          <p className="text-zinc-500 text-sm font-normal font-['Nunito'] leading-tight">
            Defina uma nova senha de acesso para sua conta da English Onboard.
          </p>
        </article>

        <form
          className="h-3/4 flex flex-col justify-between"
          method="post"
          onSubmit={handleSubmit(handlePassword)}
        >
          <section className="flex flex-col gap-5">
            {/* Campo de nova senha */}
            <section className="w-full flex flex-col gap-2">
              <label className="labelDef mt-6" htmlFor="password">
                Nova Senha
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Image src={Lock} alt="Lock Icon" width={20} height={20} />
                </div>

                <div
                  className="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                  onClick={() => handlePasswordVisibility(1)}
                >
                  <Image
                    src={seePsswd ? OpenedEyes : ClosedEyes}
                    alt="Eye Icon"
                    width={20}
                    height={20}
                  />
                </div>

                <input
                  {...register("password")}
                  name="password"
                  type={seePsswd ? "text" : "password"}
                  className="inputDef px-7 w-full"
                  placeholder="Digite sua Senha..."
                  required
                />
              </div>
              {errors.passwordError && (
                <p className="text-red-500">{errors.passwordError}</p>
              )}
            </section>

            {/* Campo de confirmação da nova senha */}
            <section className="w-full flex flex-col gap-2">
              <label className="labelDef mt-6" htmlFor="confirmPassword">
                Confirme a Nova Senha
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Image src={Lock} alt="Lock Icon" width={20} height={20} />
                </div>

                <div
                  className="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                  onClick={() => handlePasswordVisibility(2)}
                >
                  <Image
                    src={seeConfPsswd ? OpenedEyes : ClosedEyes}
                    alt="Eye Icon"
                    width={20}
                    height={20}
                  />
                </div>

                <input
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  type={seeConfPsswd ? "text" : "password"}
                  className="inputDef px-7 w-full"
                  placeholder="Digite sua Senha..."
                  required
                />
              </div>
              {errors.passwordError && (
                <p className="text-red-500">{errors.passwordError}</p>
              )}
            </section>
          </section>

          <button type="submit" className="Btn_Primary">
            Avançar
          </button>
        </form>
      </section>
    </>
  );
}

export default NewPasswordContainer;