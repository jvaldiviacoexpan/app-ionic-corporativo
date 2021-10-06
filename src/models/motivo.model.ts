
export class MotivoModel {
  id: number;
  descripcion: string;

  constructor(motivo: MotivoModel) {
    this.id = motivo.id;
    this.descripcion = motivo.descripcion;
  }

}
