
import { supabase } from "@/integrations/supabase/client";

export interface Attendance {
  id: string;
  user_id: string;
  course_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  created_at: string;
}

// Mark attendance (faculty)
export const markAttendance = async (userId: string, courseId: string, date: string, status: 'present' | 'absent' | 'late' | 'excused') => {
  try {
    // Check if attendance already exists for this user, course, and date
    const { data: existingAttendance, error: checkError } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('date', date)
      .maybeSingle();
      
    if (checkError) throw checkError;
    
    if (existingAttendance) {
      // Update existing attendance
      const { data, error } = await supabase
        .from('attendance')
        .update({ status })
        .eq('id', existingAttendance.id)
        .select();
        
      if (error) throw error;
      return data;
    } else {
      // Create new attendance record
      const { data, error } = await supabase
        .from('attendance')
        .insert({
          user_id: userId,
          course_id: courseId,
          date,
          status
        })
        .select();
        
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error("Error marking attendance:", error);
    throw error;
  }
};

// Get attendance for a course
export const getCourseAttendance = async (courseId: string) => {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        profiles(*)
      `)
      .eq('course_id', courseId)
      .order('date', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching course attendance:", error);
    throw error;
  }
};

// Get student attendance
export const getStudentAttendance = async (studentId: string, courseId?: string) => {
  try {
    let query = supabase
      .from('attendance')
      .select(`
        *,
        courses(*)
      `)
      .eq('user_id', studentId)
      .order('date', { ascending: false });
      
    if (courseId) {
      query = query.eq('course_id', courseId);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    throw error;
  }
};

// Get attendance for a specific date
export const getAttendanceByDate = async (courseId: string, date: string) => {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        profiles(*)
      `)
      .eq('course_id', courseId)
      .eq('date', date);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching attendance by date:", error);
    throw error;
  }
};

// Get attendance stats for a student
export const getStudentAttendanceStats = async (studentId: string, courseId: string) => {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select('status')
      .eq('user_id', studentId)
      .eq('course_id', courseId);
      
    if (error) throw error;
    
    const attendanceCount = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      total: data.length
    };
    
    data.forEach((record: Attendance) => {
      attendanceCount[record.status]++;
    });
    
    return attendanceCount;
  } catch (error) {
    console.error("Error fetching attendance stats:", error);
    throw error;
  }
};
