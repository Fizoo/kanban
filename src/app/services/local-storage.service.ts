import {Injectable} from '@angular/core';
import {IKanban} from "../store/reducerList";

export const LOCAL_STORAGE_KEY = 'kanban'
export const LOCAL_STORAGE_KEY_BTN = 'btn'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  public getItem(key: string) {
    const data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : null;
  }

  public set(key: string, data: IKanban): void {
    const value = JSON.stringify(data);

    localStorage.setItem(key, value);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
