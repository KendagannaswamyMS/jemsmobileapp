import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, take } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { FacultyWorkload, TimetableSlot } from '../../models/workload.model';
import { environment } from 'src/environments/environment';

interface HourEntry { label: string; value: number; icon: string; color: string; }
interface WeekRow   { week: number; hours: number; weekStart?: string; }

@Component({
  selector: 'app-my-workload',
  templateUrl: './my-workload.page.html',
  styleUrls: ['./my-workload.page.scss'],
  standalone: false
})
export class MyWorkloadPage implements OnInit {
  workload: FacultyWorkload | null = null;
  timetableSlots: TimetableSlot[] = [];
  loading = true;
  error = false;

  private facultyId = 0;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.authService.user$.pipe(filter(u => !!u), take(1)).subscribe(u => {
      this.facultyId = u!.userId;
      this.load();
    });
  }

  load(event?: any) {
    this.loading = true;
    this.error = false;
    this.http.get<FacultyWorkload[]>(
      `${environment.apiUrl}FacultyWorkload/getworkloadbyfaculty/${this.facultyId}`
    ).subscribe({
      next: res => {
        this.workload = res?.[0] || null;
        if (this.workload?.sessionslnum) {
          this.loadTimetable(this.workload.sessionslnum, event);
        } else {
          this.loading = false;
          event?.target?.complete();
        }
      },
      error: () => { this.error = true; this.loading = false; event?.target?.complete(); }
    });
  }

  private loadTimetable(sessionId: number, event?: any) {
    this.http.get<TimetableSlot[]>(
      `${environment.apiUrl}FacultyWorkload/gettimetable/${this.facultyId}/${sessionId}`
    ).subscribe({
      next: slots => { this.timetableSlots = slots || []; this.loading = false; event?.target?.complete(); },
      error: ()  => { this.timetableSlots = []; this.loading = false; event?.target?.complete(); }
    });
  }

  handleRefresh(event: any) { this.load(event); }

  // ── Time helpers ──────────────────────────────────────────
  private slotDuration(start: string, end: string): number {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return ((eh * 60 + em) - (sh * 60 + sm)) / 60;
  }

  toHHMM(hours: number): string {
    const totalMin = Math.round(hours * 60);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
  }

  formatWeekDate(iso?: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }

  // ── Timetable calculations ─────────────────────────────────
  get timetableTeachingHours(): number {
    return this.timetableSlots
      .filter(s => !s.isStayHour)
      .reduce((sum, s) => sum + this.slotDuration(s.starttime, s.endtime), 0);
  }

  get timetableStayHours(): number {
    return this.timetableSlots
      .filter(s => s.isStayHour)
      .reduce((sum, s) => sum + this.slotDuration(s.starttime, s.endtime), 0);
  }

  get weeklyBreakdown(): WeekRow[] {
    const map = new Map<number, WeekRow>();
    this.timetableSlots.filter(s => !s.isStayHour).forEach(s => {
      const row = map.get(s.weeknumber) || { week: s.weeknumber, hours: 0, weekStart: s.weekStartDate };
      row.hours += this.slotDuration(s.starttime, s.endtime);
      map.set(s.weeknumber, row);
    });
    return Array.from(map.values()).sort((a, b) => a.week - b.week);
  }

  // ── Display data ──────────────────────────────────────────
  get hourEntries(): HourEntry[] {
    if (!this.workload) return [];
    return [
      { label: 'Teaching',    value: this.timetableTeachingHours,                            icon: 'school-outline',              color: '#125875' },
      { label: 'Prep & Eval', value: this.workload.prepevaluationhours,                       icon: 'document-text-outline',       color: '#0ea5e9' },
      { label: 'Research',    value: this.workload.researchhours + this.timetableStayHours,   icon: 'flask-outline',               color: '#7c3aed' },
      { label: 'Admin',       value: this.workload.adminhours,                                icon: 'briefcase-outline',           color: '#F26622' },
      { label: 'Counseling',  value: this.workload.counselinghours,                           icon: 'people-outline',              color: '#10b981' },
      { label: 'Other',       value: this.workload.otherhours,                                icon: 'ellipsis-horizontal-outline', color: '#f59e0b' },
    ];
  }

  get totalHours(): number {
    return this.hourEntries.reduce((sum, e) => sum + e.value, 0);
  }

  complianceLabel(status: number): string {
    switch (status) {
      case 1: return 'Compliant';
      case 2: return 'Non-Compliant';
      default: return 'Pending';
    }
  }

  complianceClass(status: number): string {
    switch (status) {
      case 1: return 'badge-compliant';
      case 2: return 'badge-noncompliant';
      default: return 'badge-pending';
    }
  }

  workloadStatusLabel(status: number): string {
    switch (status) {
      case 1: return 'Submitted';
      case 2: return 'Approved';
      case 3: return 'Rejected';
      default: return 'Draft';
    }
  }
}
