//components
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/ui/mode-toggle";
import ActivityCard from "@/components/ui/activityCard";
import StravaBtn from "@/components/ui/stravaBtn";
import LogoutBtn from "@/components/ui/logoutBtn";
//utils
import {
	getSession,
	refreshAccessToken,
	getActivities,
} from "@/lib/serverUtils";
import { FullActivity, RefreshTokenData } from "@/lib/types";
import dynamic from "next/dynamic";
//data
import backupData from "@/public/data.json";

export const revalidate = 0;

//have to dynamically import map component to fix window not found error
const Map = dynamic(() => import("@/components/ui/map"), {
	ssr: false,
});

export default async function Home() {
	const session = await getSession();
	let activities: FullActivity[] = [];

	//get new access token
	const newToken: RefreshTokenData | null = session
		? await refreshAccessToken(session)
		: await refreshAccessToken();

	// get activites
	if (newToken !== null) {
		const response: FullActivity[] = await getActivities(
			newToken.access_token,
			200 //SPECIFY NUMBER OF ACTIVITIES TO DISPLAY
		);

		if (response !== null) {
			activities = response;
		} else {
			activities = backupData;
		}
	}

	return (
		<main className="m-[2vh]">
			<ResizablePanelGroup
				direction="horizontal"
				className=" rounded-lg border "
			>
				<ResizablePanel defaultSize={75}>
					<div className="flex items-center px-4 py-2 justify-between border-b">
						<h1 className="text-3xl font-bold pr-3">
							RIDE<span className="text-primary">VIZ</span>
						</h1>
						{session ? <LogoutBtn /> : <StravaBtn />}
						<ModeToggle />
					</div>
					<Map activities={activities} />
				</ResizablePanel>
				<ResizableHandle withHandle style={{ position: "relative" }} />
				<ResizablePanel
					defaultSize={25}
					maxSize={50}
					className="max-w-[90%] md:max-w-[40%] lg:max-w-[400px]"
				>
					<div className="flex items-center px-4 py-3 justify-between border-b">
						<h1 className="text-2xl font-bold ">Rides</h1>
					</div>
					<ScrollArea className="h-[90vh]">
						<div className="flex flex-col items-stretch justify-between gap-2 rouded-lg p-3">
							{activities.map((activity) => (
								<div key={activity.id}>
									<ActivityCard activity={activity} />
								</div>
							))}
						</div>
					</ScrollArea>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
