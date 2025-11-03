export type ReportItem = {
  id: string;
  name: string;
  when: string;
  format: 'PDF' | 'CSV';
  size: string;
};

export const mockHistory: ReportItem[] = [
  { id: 'RPT-2025-10-28-01', name: 'Resumen semanal',  when: '2025-10-28 09:14', format: 'PDF', size: '248 KB' },
  { id: 'RPT-2025-10-21-01', name: 'KPIs detallados',  when: '2025-10-21 09:11', format: 'CSV', size: '96 KB'  },
  { id: 'RPT-2025-10-14-01', name: 'Series temporales', when: '2025-10-14 09:06', format: 'CSV', size: '112 KB' },
];
