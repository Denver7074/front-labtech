import {Component, OnInit} from '@angular/core';
import {AbstractTableComponent} from '../../../abstract/abstract-table.component';
import {MeasurementEquipmentInfo} from '../../../../data/equipment.interface';

@Component({
  selector: 'app-measurement-equipment',
  imports: [],
  templateUrl: './measurement-equipment.html',
  styleUrl: './measurement-equipment.scss',
  standalone: true
})
export class MeasurementEquipment extends AbstractTableComponent<MeasurementEquipmentInfo> implements OnInit {

  protected override getPath(): string {
    return `/equipment-service/api/v1/measurement-equipments`;
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationPartId');
    this.id.set(profileId);
    this.loadEntities();
    this.displayedColumns = [...this.getAllColumns()];
  }

  protected override getAllColumns(): string[] {
    return [
      ...super.getAllColumns(),
      'name',
      'producer',
      'yearOfCommissioning',
      'numbers',
      'registrationNumber',
      'location',
      'characteristics',
      'attestation',
      'ownership',
      'actions'
    ];
  }

  getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      name: 'Наименование',
      producer: 'Изготовитель',
      yearOfCommissioning: 'Год ввода в эксплуатацию',
      numbers: 'Уникальная идентификация',
      registrationNumber: 'Номер регистрации в ФИФ',
      location: 'Место установки',
      characteristics: 'Технические характеристики',
      attestation: 'Аттестация',
      ownership: 'Право владения'
    };
    return labels[column] || column;
  }

  getLastAttestation(attestations: any[]): any | null {
    if (!attestations?.length) return null;
    return attestations[attestations.length - 1]
  }
}
