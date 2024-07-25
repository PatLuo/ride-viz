//shadcn
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
//components
import StravaBtn from "@/components/stravaBtn";
import LogoutBtn from "@/components/logoutBtn";
import Filter from "@/components/filterBtn";
import ActivitiesList from "@/components/activitiesList";
//utils
import {
	getSession,
	refreshAccessToken,
	getActivities,
	getProfileData,
} from "@/lib/serverUtils";
import { FullActivity, RefreshTokenData, AthleteProfile } from "@/lib/types";

//data
import backupData from "@/public/data.json";

export const revalidate = 3600;

//have to dynamically import map component to fix window not found error
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/map"), {
	ssr: false,
});

export default async function Home() {
	const session = await getSession();
	let activities: FullActivity[] = [];
	let profile = undefined;

	//get new access token
	const newToken: RefreshTokenData | null = session
		? await refreshAccessToken(session)
		: await refreshAccessToken(); //uses default refresh token

	// get activites
	if (newToken !== null) {
		//fetch in parallel
		const [activitiesResponse, profileResponse] = await Promise.all([
			getActivities(newToken.access_token, 200), // Specify number of activities to display
			getProfileData(newToken.access_token),
		]);

		// Handle the activities response
		activities = activitiesResponse !== null ? activitiesResponse : backupData;
		profile = profileResponse !== null ? profileResponse : {};
	}

	return (
		<main className="mx-[18px] mt-5">
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
					<Map />
				</ResizablePanel>
				<ResizableHandle withHandle style={{ position: "relative" }} />
				<ResizablePanel
					defaultSize={25}
					maxSize={55}
					className="max-w-[90%] md:max-w-[40%] lg:max-w-[400px]"
				>
					<div className="min-w-64 flex px-4 py-3 justify-between border-b">
						<h1 className="text-xl font-bold py-0.5">
							{session ? `${profile.firstname}'s ` : "My "}Rides
						</h1>
						{session && (
							<img
								src={profile.profile_medium}
								alt="Profile pic"
								style={{ width: "32px", height: "32px", borderRadius: "50%" }}
							/>
						)}
					</div>
					<ActivitiesList />
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
