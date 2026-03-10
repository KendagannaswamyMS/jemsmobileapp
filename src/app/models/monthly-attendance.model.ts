export interface MonthlyAttendanceDetail {
  date: string;
  dayOfWeek: string;
  firstLoginTime: string;
  lastLogoutTime: string;
  totalHours: string;
  expectedHours: string;
  isLate: boolean;
  status: string;
  isSaturday: boolean;
  isSunday: boolean;
  isHoliday: boolean;
  isWorkingDay: boolean;
  isOnLeave: boolean;
}

export interface MonthlyAverageDetails {
  month: number;
  year: number;
  monthName: string;
  totalDays: number;
  totalWorkingDays: number;
  totalSaturdays: number;
  totalWeekdays: number;
  totalCalendarDays: number;
  totalSundays: number;
  totalHolidays: number;
  totalLeaveDays: number;
  presentDays: number;
  presentSaturdays: number;
  presentWeekdays: number;
  absentDays: number;
  lateDays: number;
  attendancePercentage: number;
  averageLoginTime: string;
  isAverageLoginLate: boolean;
  averageWorkingHours: string;
  totalExpectedHours: string;
  totalActualHours: string;
  attendanceEfficiency: number;
  isCurrentMonth: boolean;
  dataUpToDate: string;
  todayExcluded: boolean;
}

export interface MonthlyAttendanceRecord {
  userId: number;
  userregistraionslnum: number;
  salutationName: string;
  userFName: string;
  userLName: string;
  userMname: string;
  userMobileNumber: string;
  userProfilepic: string;
  useremployeecode: string;
  averageDetails: MonthlyAverageDetails;
  absentDetails: any[];
  leaveDetails: any[];
  holidayDetails: any[];
  attendanceDetails: MonthlyAttendanceDetail[];
}
