import {inject, signal} from '@angular/core';
import {NotificationService} from '../ui/notification.service';
import {GuideService} from '../../service/guide.service';


export abstract class AbstractGuideComponent {
  protected notification = inject(NotificationService);
  private guideService = inject(GuideService);
  protected valueType = signal<Map<string, Map<string, string>>>(new Map<string, Map<string, string>>());

  protected loadGuide(pathGuide: string[]): void {
    for (const path of pathGuide) {
      this.guideService.getTypes(path).subscribe(types => {
        const innerMap = new Map<string, string>();
        types.forEach(t => innerMap.set(t.id, t.value));
        const current = this.valueType();
        if (current) {
          const updated = new Map(current);
          updated.set(path, innerMap);
          this.valueType.set(updated);
        }
      });
    }
  }

  protected refreshGuide(path: string) {
    this.guideService.refresh(path).subscribe(types => {
        const innerMap = new Map<string, string>();
        types.forEach(t => innerMap.set(t.id, t.value));
        const current = this.valueType();
        if (current) {
          const updated = new Map(current);
          updated.set(path, innerMap);
          this.valueType.set(updated);
        }
      }
    )
  }

  protected getTypeValue(typeId: string, path: string): string | null {
    if (!typeId) return null;
    return this.valueType()!.get(path)?.get(typeId) || null;
  }

}
