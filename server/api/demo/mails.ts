import { sub } from "date-fns";

const mails = [
    {
        id: 1,
        from: {
            name: "Alex Smith",
            email: "alex.smith@example.com",
            avatar: {
                src: "https://i.pravatar.cc/128?u=1",
            },
        },
        subject: "Meeting Schedule: Q1 Marketing Strategy Review",
        body: `Dear Team,

I hope this email finds you well. Just a quick reminder about our Q1 Marketing Strategy meeting scheduled for tomorrow at 10 AM EST in Conference Room A.

Agenda:
- Q4 Performance Review
- New Campaign Proposals
- Budget Allocation for Q2
- Team Resource Planning

Please come prepared with your department updates. I've attached the preliminary deck for your review.

Best regards,
Alex Smith
Senior Marketing Director
Tel: (555) 123-4567`,
        date: new Date().toISOString(),
    },
    {
        id: 2,
        unread: true,
        from: {
            name: "Jordan Brown",
            email: "jordan.brown@example.com",
            avatar: {
                src: "https://i.pravatar.cc/128?u=2",
            },
        },
        subject: "RE: Project Phoenix - Sprint 3 Update",
        body: `Hi team,

Quick update on Sprint 3 deliverables:

✅ User authentication module completed
🏗️ Payment integration at 80%
⏳ API documentation pending review

Key metrics:
- Code coverage: 94%
- Sprint velocity: 45 points
- Bug resolution rate: 98%

Please review the attached report for detailed analysis. Let's discuss any blockers in tomorrow's stand-up.

Regards,
Jordan

--
Jordan Brown
Lead Developer | Tech Solutions
Mobile: +1 (555) 234-5678`,
        date: sub(new Date(), { minutes: 7 }).toISOString(),
    },
    {
        id: 3,
        unread: true,
        from: {
            name: "Taylor Green",
            email: "taylor.green@example.com",
            avatar: {
                src: "https://i.pravatar.cc/128?u=3",
            },
        },
        subject: "Lunch Plans",
        body: `Hi there!

I was wondering if you'd like to grab lunch this Friday? There's this amazing new Mexican restaurant downtown called "La Casa" that I've been wanting to try. They're known for their authentic tacos and house-made guacamole.

Would 12:30 PM work for you? It would be great to catch up and discuss the upcoming team building event while we're there.

Let me know what you think!

Best,
Taylor`,
        date: sub(new Date(), { hours: 3 }).toISOString(),
    },
];

export default eventHandler(async () => {
    return mails;
});
