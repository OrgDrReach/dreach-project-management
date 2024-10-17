import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Meeting {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  google_meet_link: string;
  created_by: {
    first_name: string;
    last_name: string;
  };
}

interface MeetingListProps {
  meetings: Meeting[];
}

export default function MeetingList({ meetings }: MeetingListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {meetings.map((meeting) => (
        <Card key={meeting.id}>
          <CardHeader>
            <CardTitle>{meeting.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{meeting.description}</p>
            <p>Start: {new Date(meeting.start_time).toLocaleString()}</p>
            <p>End: {new Date(meeting.end_time).toLocaleString()}</p>
            <p>Organizer: {meeting.created_by.first_name} {meeting.created_by.last_name}</p>
            <Button className="mt-2" onClick={() => window.open(meeting.google_meet_link, '_blank')}>
              Join Meeting
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}