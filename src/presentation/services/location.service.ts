import { apiGetLocationById } from '../../services/api/apiViterbit';
import { CustomError } from '../../domain';

export class LocationService {
  static getLocationById(location: string): any {
    throw new Error("Method not implemented.");
  }
  public async getLocationById(id: string) {
    if (!id || typeof id !== 'string') {
      throw {
        status: 400,
        message: 'El parámetro "id" es requerido y debe ser un string.',
      };
    }

    try {
      const response = await apiGetLocationById(id);
      const { name, slug } = response.data.data;

      return { name, slug };
    } catch (error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError("Error feathcing the jobs" );
  }
}

}