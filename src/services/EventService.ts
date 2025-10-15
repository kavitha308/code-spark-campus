
import { supabase } from "@/integrations/supabase/client";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_type: string;
  course_id: string | null;
  created_by: string;
  created_at: string;
}

// Get all events
export const getAllEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('calendar_events')
      .select(`
        *,
        creator:profiles!calendar_events_created_by_fkey(*)
      `)
      .order('event_date', { ascending: true });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Get events for a specific course
export const getCourseEvents = async (courseId: string) => {
  try {
    const { data, error } = await supabase
      .from('calendar_events')
      .select(`
        *,
        creator:profiles!calendar_events_created_by_fkey(*)
      `)
      .eq('course_id', courseId)
      .order('event_date', { ascending: true });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching course events:", error);
    throw error;
  }
};

// Get events by date range
export const getEventsByDateRange = async (startDate: string, endDate: string) => {
  try {
    const { data, error } = await supabase
      .from('calendar_events')
      .select(`
        *,
        creator:profiles!calendar_events_created_by_fkey(*)
      `)
      .gte('event_date', startDate)
      .lte('event_date', endDate)
      .order('event_date', { ascending: true });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching events by date range:", error);
    throw error;
  }
};

// Create a new event (faculty or admin)
export const createEvent = async (
  title: string,
  description: string,
  eventDate: string,
  eventType: string,
  courseId?: string
) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error} = await supabase
      .from('calendar_events')
      .insert({
        title,
        description,
        start_time: eventDate,
        end_time: eventDate,
        event_date: eventDate,
        event_type: eventType,
        course_id: courseId || null,
        created_by: user.user.id
      } as any)
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Update an event (creator, faculty, or admin)
export const updateEvent = async (
  eventId: string,
  updates: Partial<{
    title: string;
    description: string;
    event_date: string;
    event_type: string;
    course_id: string | null;
  }>
) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // Check if user is creator, faculty, or admin
    const { data: event, error: checkError } = await supabase
      .from('calendar_events')
      .select('created_by')
      .eq('id', eventId)
      .single();
      
    if (checkError) throw checkError;
    
    // Get user role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.user.id)
      .single();
      
    if (profileError) throw profileError;
    
    if (event.created_by !== user.user.id && profile.role !== 'admin' && profile.role !== 'teacher') {
      throw new Error("Not authorized to update this event");
    }
    
    const { data, error } = await supabase
      .from('calendar_events')
      .update(updates)
      .eq('id', eventId)
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// Delete an event (creator, faculty, or admin)
export const deleteEvent = async (eventId: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // Check if user is creator, faculty, or admin
    const { data: event, error: checkError } = await supabase
      .from('calendar_events')
      .select('created_by')
      .eq('id', eventId)
      .single();
      
    if (checkError) throw checkError;
    
    // Get user role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.user.id)
      .single();
      
    if (profileError) throw profileError;
    
    if (event.created_by !== user.user.id && profile.role !== 'admin' && profile.role !== 'teacher') {
      throw new Error("Not authorized to delete this event");
    }
    
    const { error } = await supabase
      .from('calendar_events')
      .delete()
      .eq('id', eventId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
