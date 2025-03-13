import { httpService } from "./httpService";

export class ApiClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  fetch = () => httpService.get<T>(this.endpoint);

  create = (data: T) => httpService.post<T>(this.endpoint, data);

  update = (data: T) => httpService.patch<T>(this.endpoint, data);

  delete = () => httpService.delete(this.endpoint);
}
