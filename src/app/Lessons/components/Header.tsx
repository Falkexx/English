'use client'
import Image from "next/image";
import VoltarArrow from "@/Midias/arrow-left.svg";

interface HeaderCadastrosProps {
  ProgressBarStatus?: number;
  BackFunction?: () => void;
  totalSteps: number; // Novo prop para o total de lições
}

function HeaderCadastros({
  ProgressBarStatus = 0,
  BackFunction,
  totalSteps,
}: HeaderCadastrosProps) {
  const progressPercentage = (ProgressBarStatus / totalSteps) * 100;

  return (
    <header className="w-full ">
      <nav className="flex items-center w-full">
        <Image
          src={VoltarArrow}
          alt="Voltar"
          onClick={BackFunction} // Função de voltar para a lição anterior
          className="cursor-pointer"
        />

        {ProgressBarStatus >= 1 && ProgressBarStatus <= totalSteps ? (
          <div className="flex items-center ml-4 flex-1">
            {/* Barra de progresso */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-bg-primary h-2.5 rounded-full transition-width duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Número fracionado */}
            <div className="ml-4 text-base text-zinc-700 font-bold">
              {ProgressBarStatus}/{totalSteps}
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
}

export default HeaderCadastros;
