export interface Notification {
  notification_id: string;
  recipient_id: string;
  sender_id: string;
  message: string;
  date_sent: string; // Ensure date is stored as string
  course_id: string;
  file_path?: string; // Optional field
}
