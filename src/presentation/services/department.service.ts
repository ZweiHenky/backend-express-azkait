import { apiGetDepartmentById } from '../../services/api/apiViterbit';
import { CustomError } from '../../domain';

export class DepartmentsService {
  static getDepartmentById: any;
  
  public async getDepartmentById(id: string) {
    if (!id || typeof id !== 'string') {
      throw { status: 400, message: 'ID inválido' };
    }

    try {
      const response = await apiGetDepartmentById(id);
      const deparmet_name = response.data.data.name;
      return  deparmet_name;
    } catch (error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError("Error feathcing the jobs" );
    }
  }
}
