import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, take } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { CurrentUser } from '../../models/user.model';
import { BirthdayUser } from '../../models/birthday.model';
import { BiometricRecord, BiometricLog, DayLog } from '../../models/biometric.model';
import { LatestJoiner } from '../../models/joiner.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  user: CurrentUser | null = null;

  // Biometric
  biometric: BiometricRecord | null = null;
  bioLoading = true;
  bioImgError = false;

  // Latest Joiners
  latestJoiners: LatestJoiner[] = [];

  // Birthdays
  todayBirthdays: BirthdayUser[] = [];
  tomorrowBirthdays: BirthdayUser[] = [];
  selectedUser: BirthdayUser | null = null;
  selectedImgError = false;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.authService.user$.subscribe(u => (this.user = u));

    // Wait for user to be available, then fetch biometric
    this.authService.user$.pipe(
      filter(u => !!u),
      take(1)
    ).subscribe(u => {
      this.loadBiometric(u!.userId);
    });

    this.loadBirthdays();
    this.loadLatestJoiners();
  }

  // ── Biometric ──────────────────────────────────────────────────────────────

  private loadBiometric(userId: number) {
    this.bioLoading = true;
    this.http.post<BiometricRecord[]>(
      `${environment.apiUrl}biometriclog/getweeklyattendancerecords`,
      { UserId: userId, selectedDate: new Date().toISOString() }
    ).subscribe({
      next: res => {
        this.biometric = res?.[0] || null;
        this.bioLoading = false;
      },
      error: () => { this.bioLoading = false; }
    });
  }

  // Returns the week label e.g. "Mar 3 – Mar 9"
  get weekLabel(): string {
    if (!this.biometric?.logs?.length) return '';
    const dates = this.biometric.logs.map(l => new Date(l.date));
    const fmt = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    return `${fmt(dates[0])} – ${fmt(dates[dates.length - 1])}`;
  }

  // Short day label: Mon, Tue…
  dayLabel(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-IN', { weekday: 'short' });
  }

  // Date number: 9
  dateNum(dateStr: string): number {
    return new Date(dateStr).getDate();
  }

  // First "In" punch time, e.g. "10:13"
  firstIn(day: DayLog): string {
    const entry = day.logs.find(l => l.status === 'In');
    if (!entry) return '—';
    return new Date(entry.logdatetime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  // Last "Out" punch time
  lastOut(day: DayLog): string {
    const outs = day.logs.filter(l => l.status === 'Out');
    if (!outs.length) return '—';
    return new Date(outs[outs.length - 1].logdatetime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  // Day status: 'present' | 'absent' | 'future'
  dayStatus(day: DayLog): string {
    if (day.isCurrentOrFuture && !day.logs.length) return 'future';
    if (day.logs.length) return 'present';
    return 'absent';
  }

  // ── Latest Joiners ─────────────────────────────────────────────────────────

  private loadLatestJoiners() {
    this.http.get<LatestJoiner[]>(`${environment.apiUrl}UserMaster/getthelatest`)
      .subscribe({ next: res => (this.latestJoiners = res || []), error: () => {} });
  }

  joinerName(j: LatestJoiner): string {
    return [j.firstName, j.middleName, j.lastName].filter(s => s?.trim()).join(' ').trim();
  }

  joinerInitials(j: LatestJoiner): string {
    const f = j.firstName?.trim()[0] || '';
    const l = j.lastName?.trim()[0] || j.firstName?.trim().split(' ')?.[1]?.[0] || '';
    return (f + l).toUpperCase() || '?';
  }

  joiningDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  // ── Birthdays ──────────────────────────────────────────────────────────────

  private loadBirthdays() {
    this.http.get<{ status: string; data: BirthdayUser[] }>(
      `${environment.apiUrl}UserMaster/getuserbirthdaylist`
    ).subscribe({
      next: res => {
        const list = res?.data || [];
        this.todayBirthdays    = list.filter(b => this.matchesDay(b.userDoB, 0));
        this.tomorrowBirthdays = list.filter(b => this.matchesDay(b.userDoB, 1));
      },
      error: () => {}
    });
  }

  private matchesDay(dob: string, offset: number): boolean {
    const ref = new Date();
    ref.setDate(ref.getDate() + offset);
    const d = new Date(dob);
    return d.getMonth() === ref.getMonth() && d.getDate() === ref.getDate();
  }

  fullName(b: BirthdayUser): string {
    return [b.salutaion, b.userFName, b.userMname, b.userLName].filter(Boolean).join(' ');
  }

  initials(b: BirthdayUser): string {
    return ((b.userFName?.[0] || '') + (b.userLName?.[0] || b.userMname?.[0] || '')).toUpperCase() || '?';
  }

  openPopup(b: BirthdayUser) { this.selectedUser = b; this.selectedImgError = false; }
  closePopup() { this.selectedUser = null; }
}
