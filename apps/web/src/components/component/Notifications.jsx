import Link from "next/link";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NotificationImportant } from "@mui/icons-material";

// Header component
const Header = ({ children }) => (
  <header className="flex items-center h-16 px-4  shrink-0 bg-white md:px-6">
    {children}
  </header>
);

// SearchBar component
const SearchBar = ({ placeholder }) => (
  <form className="flex-1 ml-auto sm:flex-initial">
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] "
        placeholder={placeholder}
        type="search"
      />
    </div>
  </form>
);

// UserMenu component
const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar className="h-9 w-9">
        <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
        <AvatarFallback>JP</AvatarFallback>
        <span className="sr-only">Toggle user menu</span>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>My Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// CardSection component
const CardSection = ({ title, children }) => (
  <Card className="col-span-1 lg:col-span-2">
    <CardHeader className="flex items-center justify-between pb-2">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {children}
      </div>
    </CardContent>
  </Card>
);

// CardItem component
const CardItem = ({ company, deadline, role, buttonText }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 ">
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium">{company}</div>
      {/*if dead line is less than 2 days show red badge else show yellow badge*/}
      <Badge variant={deadline[0] < 2 ? "destructive" : "yellow"}>
        {deadline}
      </Badge>
    </div>
    <div className="text-sm text-gray-500  mt-1">{role}</div>
    {/* <div className="mt-3">
      <button className="text-sm outline-1 outline-gray-200 bg-white inline-flex items-center px-3 py-1.5 border rounded-lg text-black hover:bg-gray-100 hover:text-gray-900 shadow-none outline-none">
        {buttonText}
      </button>
    </div>
  */}
  </div>
);

// TimelineItem component
const TimelineItem = ({ company, date, event, buttonText }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 ">
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium">{company}</div>
      <div className="text-sm text-gray-500 ">{date}</div>
    </div>
    <div className="text-sm text-gray-500  mt-1">{event}</div>
    <div className="mt-3">
      <button className="text-sm outline-1 outline-gray-200 bg-white inline-flex items-center px-3 py-1.5 border rounded-lg text-black hover:bg-gray-100 hover:text-gray-900 shadow-none outline-none ">
        {buttonText}
      </button>
    </div>
  </div>
);

// Notifications component
export function Notifications({ notifications }) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100  ">
      <Header>
        <Link
          className="flex  items-center gap-2 text-lg font-semibold text-gray-900  sm:text-base "
          href="#"
        >
          <NotificationImportant className="w-6 h-6" />
          <span>Notifications</span>
        </Link>
        <div className="flex items-center w-full gap-4 ml-auto md:gap-2 lg:gap-4">
          <SearchBar placeholder="Search applications..." />
          <UserMenu />
        </div>
      </Header>
      <main className=" grid  gap-4 p-4 md:grid-cols-2  ">
        <div className="grid grid-cols-1 gap-4 col-span-2  ">
          <CardSection title="Upcoming Deadlines">
            {notifications.openings?.map((opening) => (
              <CardItem
                key={opening.id}
                company={opening.company.name}
                deadline={(() => {
                  const deadlineDate = new Date(opening.deadline);
                  const currentDate = new Date();
                  const timeDifference = deadlineDate - currentDate;

                  if (timeDifference <= 0) {
                    return "Deadline passed";
                  } else {
                    const daysRemaining = Math.floor(
                      timeDifference / (1000 * 60 * 60 * 24)
                    );
                    const hoursRemaining = Math.floor(
                      (timeDifference % (1000 * 60 * 60 * 24)) /
                        (1000 * 60 * 60)
                    );

                    if (daysRemaining > 0) {
                      return `${daysRemaining} day${daysRemaining > 1 ? "s" : ""} `;
                    } else {
                      return `${hoursRemaining} hour${hoursRemaining > 1 ? "s" : ""} `;
                    }
                  }
                })()}
                role={opening.role}
                buttonText="Set Reminder"
              />
            ))}
          </CardSection>
          <CardSection title="Application Status">
            {notifications.applications?.map((application) => (
              <CardItem
                key={application.id}
                company={application.opening.company.name}
                deadline={application.status}
                role={application.opening.role}
              />
            ))}
          </CardSection>
        </div>

        {/* <div className="flex flex-col bg-white  w-auto p-4 col-span-1">
          <h2 className="">Application Timeline</h2>
          <div className="flex flex-col">
            <TimelineItem
              company="Amazon"
              date="April 15, 2023"
              event="Application Deadline"
              buttonText="Set Reminder"
            />
            <TimelineItem
              company="Google"
              date="May 1, 2023"
              event="Interview Scheduled"
              buttonText="Set Reminder"
            />
            <TimelineItem
              company="Microsoft"
              date="May 15, 2023"
              event="Final Decision"
              buttonText="Set Reminder"
            />
          </div>
        </div> */}
      </main>
    </div>
  );
}
function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
