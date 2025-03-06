import { httpService } from "./httpService";

export class ApiClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  create = (data: T) => httpService.post<T>(this.endpoint, data);
}
