export class Exception {
    HttpErrorResponse: InnerException;
  }
  
  export class InnerException {
    headers: any;
    status: number;
    statusText: string;
    url: string;
    ok: boolean;
    name: string;
    message: string;
    error: { retcode: number, message: string};
  }