import { useEffect, useState } from "react";
import NewsCard from "./card/NewsCard";
import { obtenerNoticias } from "./fakeRest";
import NewsModal from "./modals/NewsModal";
import { ContenedorNoticias, ListaNoticias, TituloNoticias } from "./styled";
import { INoticiasNormalizadas, IModal } from "./types";

const News = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<IModal>({
    noticia: null,
    visible: false,
  });

  /**
   * Función que devuelve formateado el texto ingresado
   * con la inicial de cada letra en mayuscula
   *
   * @author Mauricio Boye
   * @param {string} texto texto a formatear
   * @returns {string} texto formateado
   */
  const capitalizarPrimeraLetraPorPalabra = (texto: string): string => {
    return texto
      .split(" ")
      .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      })
      .join(" ");
  };

  /**
   * Función que devuelve en minutos la diferencia entre
   * la fecha actual y la fecha pasada por parámetro
   *
   * @author Mauricio Boye
   * @param {Date} fecha fecha a comparar
   * @returns {number} cantidad de minutos
   */
  const obtenerTiempoTranscurridoEnMinutos = (fecha: Date | string): number => {
    const fechaActual = new Date();
    const fechaParametro = new Date(fecha);
    const diferencia = fechaActual.getTime() - fechaParametro.getTime();
    return Math.floor(diferencia / (1000 * 60));
  };

  /**
   * Función que devuelve el texto ingresado con la cantidad
   * de caracteres ingresada por parámetro
   *
   * @author Mauricio Boye
   * @param {string} texto texto a reducir
   * @returns {string} texto acortado
   */
  const acortarTexto = (texto: string, cantidadCaracteres: number): string => {
    return texto.substring(0, cantidadCaracteres) + "...";
  };

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((noticia) => {
        const titulo = capitalizarPrimeraLetraPorPalabra(noticia.titulo);
        const minutosTranscurridos = obtenerTiempoTranscurridoEnMinutos(
          noticia.fecha
        );
        const descripcionCorta = acortarTexto(noticia.descripcion, 100);

        return {
          id: noticia.id,
          titulo,
          descripcion: noticia.descripcion,
          fecha: `Hace ${minutosTranscurridos} minutos`,
          esPremium: noticia.esPremium,
          imagen: noticia.imagen,
          descripcionCorta: descripcionCorta,
        };
      });

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((noticia) => (
          <NewsCard
            noticia={noticia}
            setModal={setModal}
            key={noticia.id.toString()}
          />
        ))}
        {modal.visible && (
          <NewsModal noticia={modal.noticia} setModal={setModal} />
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default News;
