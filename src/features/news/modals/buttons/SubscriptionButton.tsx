import { BotonSuscribir } from "../../styled";
import { Dispatch, SetStateAction } from "react";
import { IModal } from "../../types";

interface IProps {
  setModal: Dispatch<SetStateAction<IModal>>;
}

const SubscriptionButton = ({ setModal }: IProps) => {
  return (
    <BotonSuscribir
      onClick={() =>
        setTimeout(() => {
          alert("Suscripto!");
          setModal({ noticia: null, visible: false });
        }, 1000)
      }
    >
      Suscríbete
    </BotonSuscribir>
  );
};

export default SubscriptionButton;
