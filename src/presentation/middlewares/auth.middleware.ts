import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config/jwt.adapter';
import { CandidateDatasourceImp } from '../../infrastructure/dataSources/candidate.datasource.imp';
import { CandidateRepositoryImp } from '../../infrastructure/repositories/candidate.repository.imp-';
import { AuthRepositoryImp } from '../../infrastructure/repositories/auth.repository.imp';
import { AuthDatasourceImp } from '../../infrastructure/dataSources/auth.datasource.imp';
import { CompanyRespositoryImp } from '../../infrastructure/repositories/company.repository.imp';
import { CompanyDatasourceImp } from '../../infrastructure/dataSources/company.datasource.imp';




export class AuthMiddleware {
  
  private static readonly repositoryCandidate = new CandidateRepositoryImp(new CandidateDatasourceImp());
  private static readonly repositoryAuth = new AuthRepositoryImp(new AuthDatasourceImp());
  private static readonly repositoryCompany = new CompanyRespositoryImp(new CompanyDatasourceImp());



  static validateCandidateJWT = async(req: Request, res: Response, next: NextFunction ) => {

    const authorization = req.header('Authorization');

    if ( !authorization ) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    if ( !authorization.startsWith('Bearer ') ){
      res.status(401).json({ error: 'Invalid Bearer token' });
      return;
    }

    const token = authorization.split(' ').at(1) || '';

    try {

      // todo:
      const payload:any = await JwtAdapter.verifyToken(token);

      if ( !payload ){
        res.status(401).json({ error: 'Token Expired' });
        return;
      }

      if ( !payload.id ){
        res.status(401).json({ error: 'Invalid token' });
        return;
      }

      const user = await this.repositoryAuth.findById(payload.id);
      if ( !user ) {
        res.status(401).json({ error: 'User not found' });
        return 
      }

      if ( user.rolId_fk !== 1){
        res.status(401).json({ error: 'User is not a candidate' });
        return;
      }

      const candidate = await this.repositoryCandidate.getById(Number(user.id));
      if ( !candidate )  {
        res.status(401).json({ error: 'Candidate not found' });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }

  }
  static validateBothJWT = async(req: Request, res: Response, next: NextFunction ) => {

    const authorization = req.header('Authorization');

    if ( !authorization ) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    if ( !authorization.startsWith('Bearer ') ){
      res.status(401).json({ error: 'Invalid Bearer token' });
      return;
    }

    const token = authorization.split(' ').at(1) || '';

    try {

      // todo:
      const payload:any = await JwtAdapter.verifyToken(token);

      if ( !payload ){
        res.status(401).json({ error: 'Token Expired' });
        return;
      }

      if ( !payload.id ){
        res.status(401).json({ error: 'Invalid token' });
        return;
      }

      const user = await this.repositoryAuth.findById(payload.id);

      if ( !user ) {
        res.status(401).json({ error: 'User not found' });
        return 
      }

      if ( user.rolId_fk !== 1 && user.rolId_fk !== 2){
        res.status(401).json({ error: 'User is not a candidate or company' });
        return;
      }

      if ( user.rolId_fk === 1 ){
        const candidate = await this.repositoryCandidate.getById(Number(user.id));
        if ( !candidate )  {
          res.status(401).json({ error: 'Candidate not found' });
          return;
        }
      }else{
        const candidate = await this.repositoryCompany.getByIdUser(Number(user.id));
        if ( !candidate )  {
          res.status(401).json({ error: 'Company not found' });
          return;
        }
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }

  }

  static validateCompanyJWT = async(req: Request, res: Response, next: NextFunction ) => {

    const authorization = req.header('Authorization');

    if ( !authorization ) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    if ( !authorization.startsWith('Bearer ') ){
      res.status(401).json({ error: 'Invalid Bearer token' });
      return;
    }

    const token = authorization.split(' ').at(1) || '';

    try {

      // todo:
      const payload:any = await JwtAdapter.verifyToken(token);

      if ( !payload ){
        res.status(401).json({ error: 'Token Expired' });
        return;
      }

      if ( !payload.id ){
        res.status(401).json({ error: 'Invalid token' });
        return;
      }

      const user = await this.repositoryAuth.findById(payload.id);
      if ( !user ) {
        res.status(401).json({ error: 'User not found' });
        return 
      }

      if ( user.rolId_fk !== 2){
        res.status(401).json({ error: 'User is not a company' });
        return;
      }


      const candidate = await this.repositoryCompany.getByIdUser(Number(user.id));
      if ( !candidate )  {
        res.status(401).json({ error: 'Company not found' });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }

  }


}
