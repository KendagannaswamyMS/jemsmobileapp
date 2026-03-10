export type WorkloadStatus = 'Draft' | 'Submitted' | 'Under_Review' | 'Approved' | 'Rejected';

export interface FacultySubject {
  subjectslnum: number;
  courseCode: string;
  courseName: string;
  semesterId: number;
  programType: number;
}

export interface StayHourActivity {
  stayhouractivityslnum: number;
  facultyid: number;
  workloadid: number;
  sessionid: number;
  activitycode: string;
  activityname: string;
  hoursperweek: number;
  description: string;
  weeknumber: number;
  activitytypeslnum: number;
}

export interface FacultyWorkload {
  facultyworkloadslnum: number;
  facultyid: number;
  sessionslnum: number;
  teachinghours: number;
  prepevaluationhours: number;
  researchhours: number;
  adminhours: number;
  counselinghours: number;
  otherhours: number;
  totalworkloadhours: number;
  workloadstatus: number;
  compliancestatus: number;
  facultyName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  salutation?: string;
  profilePic?: string;
  departmentId?: number;
  departmentName?: string;
  sessionName?: string;
  academicActivities: any[];
  stayHourActivities: StayHourActivity[];
  semesterAllocations: any[];
  tblWorkloadLogs: any[];
}

export interface MentoringSession {
  mentoringSessionId: number;
  mentoringAllocationId: number;
  facultyId: number;
  facultyName: string;
  studentSlnum: number;
  studentName: string;
  departmentId: number;
  sessionId: number;
  semesterId: number;
  meetingDate: string;
  meetingMode: string;
  meetingTopic: string;
  actionPlan: string;
  nextMeetingDate: string;
  sessionStatus: string;
  createdAt: string;
  notes: any[];
  // Extended fields from faculty-sessions endpoint
  sessionName?: string;
  semesterName?: string;
  programName?: string;
  collegeName?: string;
  studentProfilePic?: string;
  studentPhone?: string;
  studentEmail?: string;
}

export interface MentoringSessionsResponse {
  success: boolean;
  message: string;
  data: MentoringSession[];
}

export interface TimetableSlot {
  timetableslotslnum: number;
  facultyid: number;
  sessionid: number;
  weeknumber: number;
  weekStartDate?: string;
  weekEndDate?: string;
  dayofweek: number;
  starttime: string;
  endtime: string;
  subjectslnum?: number;
  courseid?: number;
  courseName?: string;
  courseCode?: string;
  activitytype: string;
  activitytypeslnum: number;
  roomnumber: string;
  isrecurring: boolean;
  isShared: boolean;
  isStayHour: boolean;
  sharedWith: any[];
}

export interface Workload {
  workloadId?: number;
  facultyId: number;
  departmentId?: number;
  semesterId: number;
  sessionId?: number;
  teachingHours: number;
  prepEvaluationHours: number;
  researchHours: number;
  adminHours: number;
  counselingHours: number;
  otherHours: number;
  totalWorkloadHours: number;
  workloadStatus: WorkloadStatus;
  facultyName?: string;
  departmentName?: string;
  hodRemarks?: string;
  createdAt?: string;
  submittedAt?: string;
}

export interface FacultyTimetableSlot {
  timetableSlotId: number;
  subjectSlnum?: number;
  semesterId?: number;
  dayOfWeek: number;
  dayName: string;
  startTime: string;
  endTime: string;
  weekNumber: number;
  subjectName: string;
  subjectCode: string;
  roomNumber: string;
  sectionName: string;
  courseName: string;
  programName: string;
  scheduledDate: string | null;
  attendanceMarked: boolean;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
}

export interface Session {
  sessionslnum: number;
  sessionName: string;
  isCurrent: boolean;
  sessionfrom?: number;
  sessionto?: number;
  sessiononefrom?: string;
  sessiononeto?: string;
}
