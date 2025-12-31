import {inject, signal} from '@angular/core';
import {NotificationService} from '../ui/notification.service';
import {GuideService} from '../../service/guide.service';


export abstract class AbstractGuideComponent {
  protected notification = inject(NotificationService);
  protected guideService = inject(GuideService);

  valueType = signal<Map<string, Map<string, string>>>(new Map<string, Map<string, string>>());

  protected getPathGuide(): string[] {
    return [];
  }

  protected loadGuide(): void {
    for (const path of this.getPathGuide()) {
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
}
