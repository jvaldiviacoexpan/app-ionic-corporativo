
export class MaquinaModel {
  id: number;
  nombre: string;
  familia: string;

  constructor(maquina: MaquinaModel) {
    this.id = maquina.id;
    this.nombre = maquina.nombre;
    this.familia = maquina.familia;
  }

}
