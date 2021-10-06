import { Injectable } from '@angular/core';
import { MotivoModel } from '../../models/motivo.model';


@Injectable({
  providedIn: 'root'
})
export class MotivosService {

  private motivos: MotivoModel[] = [
    new MotivoModel({ id: 1, descripcion: 'Producción' }),
    new MotivoModel({ id: 2, descripcion: 'Pruebas' }),
    new MotivoModel({ id: 3, descripcion: 'Control de Calidad' }),
    new MotivoModel({ id: 4, descripcion: 'Regulación de Máquina' }),
    new MotivoModel({ id: 5, descripcion: 'Problemas de Producción' }),
    new MotivoModel({ id: 6, descripcion: 'Falta de Operario' }),
    new MotivoModel({ id: 7, descripcion: 'Cambio de Programa' }),
    new MotivoModel({ id: 8, descripcion: 'Falla Electrica' }),
    new MotivoModel({ id: 9, descripcion: 'Falla Mecánica' }),
    new MotivoModel({ id: 10, descripcion: 'Mantención Programada' }),
    new MotivoModel({ id: 11, descripcion: 'Parada Programada' }),
    new MotivoModel({ id: 12, descripcion: 'Máquina sin Programa' }),
    new MotivoModel({ id: 13, descripcion: 'Cambio de Bobina' }),
    new MotivoModel({ id: 14, descripcion: 'Problema de Corte' }),
    new MotivoModel({ id: 15, descripcion: 'Mantención Matriceria' }),
    new MotivoModel({ id: 16, descripcion: 'Detenida sin Lámina' }),
    new MotivoModel({ id: 17, descripcion: 'Problema de Lámina' }),
    new MotivoModel({ id: 18, descripcion: 'Falla Equipo Suplementario' }),
  ];

  public getMotivos(): MotivoModel[] {
    return this.motivos;
  }


}
