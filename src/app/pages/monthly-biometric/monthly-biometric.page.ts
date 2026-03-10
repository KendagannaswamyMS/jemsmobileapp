import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import {
  MonthlyAttendanceRecord,
  MonthlyAttendanceDetail
} from '../../models/monthly-attendance.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-monthly-biometric',
  templateUrl: './monthly-biometric.page.html',
  styleUrls: ['./monthly-biometric.page.scss'],
  standalone: false
})
export class MonthlyBiometricPage implements OnInit {
  loading = false;
  record: MonthlyAttendanceRecord | null = null;

  selectedMonth: number;
  selectedYear: number;

  readonly months = [
    { value: 1,  label: 'January'   },
    { value: 2,  label: 'February'  },
    { value: 3,  label: 'March'     },
    { value: 4,  label: 'April'     },
    { value: 5,  label: 'May'       },
    { value: 6,  label: 'June'      },
    { value: 7,  label: 'July'      },
    { value: 8,  label: 'August'    },
    { value: 9,  label: 'September' },
    { value: 10, label: 'October'   },
    { value: 11, label: 'November'  },
    { value: 12, label: 'December'  }
  ];

  years: number[] = [];
  private userId = 0;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    const now = new Date();
    this.selectedMonth = now.getMonth() + 1;
    this.selectedYear  = now.getFullYear();
    for (let y = now.getFullYear(); y >= now.getFullYear() - 3; y--) {
      this.years.push(y);
    }
  }

  ngOnInit() {
    this.authService.user$.pipe(filter(u => !!u), take(1)).subscribe(u => {
      this.userId = u!.userId;
      this.load();
    });
  }

  load() {
    this.loading = true;
    this.record  = null;
    this.http.post<MonthlyAttendanceRecord[]>(
      `${environment.apiUrl}biometriclog/getmonthlyattendancerecordsforuser`,
      {
        UserId:       this.userId,
        departmentID: -1,
        month:        this.selectedMonth,
        year:         this.selectedYear
      }
    ).subscribe({
      next:  res   => { this.record = res?.[0] ?? null; this.loading = false; },
      error: ()    => { this.loading = false; }
    });
  }

  back() {
    this.router.navigateByUrl('/tabs/hrms');
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  get monthLabel(): string {
    return this.months.find(m => m.value === this.selectedMonth)?.label ?? '';
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }

  statusClass(row: MonthlyAttendanceDetail): string {
    if (row.isSunday || row.isSaturday) return 'status-weekend';
    if (row.isHoliday)    return 'status-holiday';
    if (row.isOnLeave)    return 'status-leave';
    if (row.status === 'Present') return row.isLate ? 'status-late' : 'status-present';
    if (row.status === 'Absent')  return 'status-absent';
    return 'status-na';
  }

  hoursClass(row: MonthlyAttendanceDetail): string {
    if (row.totalHours === 'N/A') return 'hours-na';
    if (!row.isWorkingDay)        return 'hours-na';
    const [h] = row.totalHours.split(':').map(Number);
    return h >= 7 ? 'hours-good' : 'hours-low';
  }

  get attendancePct(): number {
    return this.record?.averageDetails?.attendancePercentage ?? 0;
  }

  get pctColor(): string {
    const p = this.attendancePct;
    if (p >= 90) return '#22c55e';
    if (p >= 75) return '#f59e0b';
    return '#ef4444';
  }
}
