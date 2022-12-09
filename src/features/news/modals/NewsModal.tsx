import { TarjetaModal, ContenedorModal } from "../styled";
import { INoticiasNormalizadas, IModal } from "../types";
import { Dispatch, SetStateAction } from "react";
import PremiumModal from "./PremiumModal";
import FreeModal from "./FreeModal";
import CloseModalButton from "./buttons/CloseModalButton";

interface IProps {
  noticia: INoticiasNormalizadas | null;
  setModal: Dispatch<SetStateAction<IModal>>;
}

const NewsModal = ({ noticia, setModal }: IProps) => {
  return (
    <>
      {noticia && (
        <ContenedorModal>
          <TarjetaModal>
            <CloseModalButton setModal={setModal} />
            {noticia.esPremium ? (
              <PremiumModal setModal={setModal} />
            ) : (
              <FreeModal noticia={noticia} />
            )}
          </TarjetaModal>
        </ContenedorModal>
      )}
    </>
  );
};

export default NewsModal;
