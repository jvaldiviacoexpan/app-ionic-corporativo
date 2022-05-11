
export class MotivoModel {
  id: number;
  descripcion: string;
  // segmentos: SegmentoModel[];

  constructor(motivo: MotivoModel) {
    this.id = motivo.id;
    this.descripcion = motivo.descripcion;
    // this.segmentos = motivo.segmentos;
  }

}

export class SegmentoModel {
  id: number;
  descripcion: string;
  constructor(segmento: SegmentoModel) {
    this.id = segmento.id;
    this.descripcion = segmento.descripcion;
  }
}
