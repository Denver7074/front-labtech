import {Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrganizationContextService {
  private _orgPartId = signal<string | null>(null);
  orgPartId = this._orgPartId.asReadonly();

  setOrgPartId(id: string | null) {
    this._orgPartId.set(id);
  }
}
