//shadcn
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
//components
import ActivityCard from "@/components/ui/activityCard";
import StravaBtn from "@/components/ui/stravaBtn";
import LogoutBtn from "@/components/ui/logoutBtn";
import Filter from "@/components/ui/filter";
//utils
import {
	getSession,
	refreshAccessToken,
	getActivities,
} from "@/lib/serverUtils";
import { FullActivity, RefreshTokenData } from "@/lib/types";

//data
import backupData from "@/public/data.json";
import ActivitiesList from "@/components/ui/activitiesList";

export const revalidate = 0;

//have to dynamically import map component to fix window not found error
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/ui/map"), {
	ssr: false,
});

export default async function Home() {
	const session = await getSession();
	let activities: FullActivity[] = [];

	//get new access token
	const newToken: RefreshTokenData | null = session
		? await refreshAccessToken(session)
		: await refreshAccessToken(); //uses default refresh token

	// get activites
	if (newToken !== null) {
		const response: FullActivity[] = await getActivities(
			newToken.access_token,
			200 //SPECIFY NUMBER OF ACTIVITIES TO DISPLAY
		);

		{
			response !== null ? (activities = response) : (activities = backupData);
		}
	}

	return (
		<main className="m-[2vh]">
			<ResizablePanelGroup
				direction="horizontal"
				className=" rounded-lg border "
			>
				<ResizablePanel defaultSize={75}>
					<div className="flex items-center py-2.5 justify-between border-b">
						<h1 className="text-3xl font-bold pl-3">
							RIDE<span className="text-primary">VIZ</span>
						</h1>
						<div className="flex items-center h-7 space-x-1 pr-1">
							{session ? <LogoutBtn /> : <StravaBtn />}
							<Separator orientation="vertical" />
							<Filter activities={activities} />
							<Separator orientation="vertical" />
							<ModeToggle />
						</div>
					</div>
					<Map activities={activities} />
				</ResizablePanel>
				<ResizableHandle withHandle style={{ position: "relative" }} />
				<ResizablePanel
					defaultSize={25}
					maxSize={55}
					className="max-w-[90%] md:max-w-[40%] lg:max-w-[400px]"
				>
					<div className="flex items-center px-4 py-3 justify-between border-b">
						<h1 className="text-2xl font-bold ">Rides</h1>
					</div>
					<ActivitiesList />
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
