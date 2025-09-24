import { HttpErrorResponse } from '@angular/common/http'

export const checkNoNetworkConnection = (error: any): boolean => {
  return (
    error instanceof HttpErrorResponse
    && !error.headers.keys().length
    && !error.ok
    && !error.status
    && !error.error.loaded
    && !error.error.total
  )
}
