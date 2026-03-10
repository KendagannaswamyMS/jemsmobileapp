import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, take } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { MentoringSession, MentoringSessionsResponse } from '../../models/workload.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mentoring-sessions',
  templateUrl: './mentoring-sessions.page.html',
  styleUrls: ['./mentoring-sessions.page.scss'],
  standalone: false
})
export class MentoringSessionsPage implements OnInit {
  sessions: MentoringSession[] = [];
  loading = true;
  error = false;

  activeFilter = 'ALL';
  readonly filters = ['ALL', 'DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'];

  selected: MentoringSession | null = null;

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
    this.http.get<MentoringSessionsResponse>(
      `${environment.apiUrl}Mentoring/faculty-sessions/${this.facultyId}`
    ).subscribe({
      next: res => {
        this.sessions = res?.data || [];
        this.loading = false;
        event?.target?.complete();
      },
      error: () => { this.error = true; this.loading = false; event?.target?.complete(); }
    });
  }

  handleRefresh(event: any) { this.load(event); }

  get filtered(): MentoringSession[] {
    if (this.activeFilter === 'ALL') return this.sessions;
    return this.sessions.filter(s => s.sessionStatus === this.activeFilter);
  }

  countFor(f: string): number {
    if (f === 'ALL') return this.sessions.length;
    return this.sessions.filter(s => s.sessionStatus === f).length;
  }

  statusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'SUBMITTED': return 'status-submitted';
      case 'APPROVED':  return 'status-approved';
      case 'REJECTED':  return 'status-rejected';
      case 'DRAFT':
      default:          return 'status-draft';
    }
  }

  modeClass(mode: string): string {
    return mode?.toUpperCase() === 'ONLINE' ? 'mode-online' : 'mode-offline';
  }

  formatDate(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  formatTime(iso: string): string {
    if (!iso) return '';
    return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  initials(name: string): string {
    const parts = (name || '').trim().split(' ');
    return ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase() || '?';
  }

  isUpcoming(dateStr: string): boolean {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return new Date(dateStr) >= today;
  }

  openDetail(s: MentoringSession) { this.selected = s; }
  closeDetail() { this.selected = null; }
}
