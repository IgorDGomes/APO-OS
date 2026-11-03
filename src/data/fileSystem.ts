import { FileEntry } from "@/types/fileManager.type";

const FILES: FileEntry[] = [
  { name: "Project Proposal.pdf", folder: false },
  {
    name: "Design Mockups",
    folder: true,
    children: [
      { name: "Homepage.png", folder: false },
      { name: "Dashboard.png", folder: false },
    ],
  },
  { name: "Meeting Notes.docx", folder: false },
  {
    name: "Development",
    folder: true,
    children: [
      { name: "API Documentation.pdf", folder: false },
      { name: "Testing Checklist.xlsx", folder: false },
      {
        name: "Code Review",
        folder: true,
        children: [
          { name: "Review Notes.txt", folder: false },
        ],
      },
      { name: "QA Reports", folder: true, children: [] },
    ],
  },
  { name: "Budget.xlsx", folder: false },
  { name: "Marketing", folder: true, children: [] },
  { name: "Client Feedback.txt", folder: false },
  { name: "Sales Data", folder: true, children: [] },
  { name: "User Research.pdf", folder: false },
  { name: "Wireframes", folder: true, children: [] },
  { name: "Sprint Planning.docx", folder: false },
  { name: "Roadmap.pptx", folder: false },
  { name: "HR Policies", folder: true, children: [] },
  { name: "Onboarding Guide.pdf", folder: false },
  { name: "Legal", folder: true, children: [] },
  { name: "Terms and Conditions.docx", folder: false },
  { name: "Privacy Policy.pdf", folder: false },
  {
    name: "Invoices",
    folder: true,
    children: [
      { name: "2023 Invoice.xlsx", folder: false },
    ],
  },
  {
    name: "Reports",
    folder: true,
    children: [
      { name: "Annual Report 2023.pdf", folder: false },
      { name: "Performance Metrics.docx", folder: false },
    ],
  },
  { name: "Engineering", folder: true, children: [] },
  { name: "Brand Guidelines.pdf", folder: false },
  {
    name: "Social Media",
    folder: true,
    children: [
      { name: "Post Schedule.xlsx", folder: false },
      {
        name: "Campaigns",
        folder: true,
        children: [
          { name: "Video Scripts.docx", folder: false },
          { name: "Ad Creatives", folder: true, children: [] },
        ],
      },
    ],
  },
  {
    name: "HR",
    folder: true,
    children: [
      { name: "Employee Handbook.pdf", folder: false },
      {
        name: "Payroll",
        folder: true,
        children: [
          { name: "Timesheets.xlsx", folder: false },
        ],
      },
    ],
  },
  {
    name: "IT",
    folder: true,
    children: [
      { name: "System Logs.txt", folder: false },
      { name: "Employee Passwords.xlsx", folder: false },
    ],
  },
  {
    name: "private",
    folder: true,
    children: [
      {
        name: "secret.hex",
        folder: false,
      }
    ]
  }
];

export const ROOT: FileEntry[] = [
  { name: "pc", folder: true, children: FILES },
  { name: "last", folder: true, children: [] },
];