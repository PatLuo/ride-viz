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
import Logo from "@/components/logo";
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
	let activities: FullActivity[] = [];
	let profile: AthleteProfile | undefined = undefined;

	const session = await getSession();
	if (session) {
		// get new tokens
		const newTokens: RefreshTokenData | null = await refreshAccessToken(
			session
		);
		// get activites
		if (newTokens !== null) {
			//fetch in parallel
			const [activitiesResponse, profileResponse] = await Promise.all([
				getActivities(newTokens.access_token, 200), // Specify number of activities to display
				getProfileData(newTokens.access_token),
			]);

			activities = activitiesResponse;
			profile = profileResponse;
		} else {
			console.log("Error fetching new tokens");
		}
	} else {
		//if no session, use my refresh token
		const myTokens = await refreshAccessToken(); //use backup refresh token
		if (myTokens !== null) {
			activities = await getActivities(myTokens.access_token, 200);
		}
	}

	if (activities.length === 0) {
		activities = backupData as FullActivity[];
	}

	return (
		<main className=" p-4 d-4 h-screen flex flex-col items-center justify-center">
			<ResizablePanelGroup
				direction="horizontal"
				className=" rounded-lg border"
			>
				<ResizablePanel defaultSize={75}>
					<div className="flex items-center py-3 justify-between border-b pl-2">
						<Logo />
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
					<div className="min-w-64 flex px-4 items-center justify-between border-b">
						<h1 className="text-xl font-bold py-[15.5px]">
							{profile ? `${profile.firstname}'s ` : "My "}Rides
						</h1>
						{profile && (
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
