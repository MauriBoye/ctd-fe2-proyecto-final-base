import { INoticiasNormalizadas } from "../types";
import {
  DescripcionModal,
  ImagenModal,
  TituloModal,
  CotenedorTexto,
} from "../styled";

interface IProps {
  noticia: INoticiasNormalizadas;
}

const NewsModal = ({ noticia }: IProps) => {
  return (
    <>
      <ImagenModal src={noticia.imagen} alt="news-image" />
      <CotenedorTexto>
        <TituloModal>{noticia.titulo}</TituloModal>
        <DescripcionModal>{noticia.descripcion}</DescripcionModal>
      </CotenedorTexto>
    </>
  );
};
export default NewsModal;
