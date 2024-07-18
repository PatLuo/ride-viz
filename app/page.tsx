import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import ActivityCard from "@/components/ui/activityCard";

import { refreshToken, getActivities } from "@/lib/serverUtils";
import { FullActivity, RefreshTokenData } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-separator";

import backupData from "@/public/data.json";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const revalidate = 10;

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;

export default async function Home() {
	//get new access token
	const newToken: RefreshTokenData | null = await refreshToken(
		client_id,
		client_secret,
		refresh_token
	);

	//if new token bad, use backup data
	let activities: FullActivity[] = [];
	if (newToken !== null) {
		const response: FullActivity[] = await getActivities(
			newToken.access_token,
			30 //SPECIFY NUMBER OF ACTIVITIES TO DISPLAY
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
					<div className="flex h-full items-center justify-center ">
						<span className="font-semibold">Content</span>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel
					defaultSize={25}
					className="max-w-[90%] md:max-w-[40%] lg:max-w-[400px]"
				>
					<div className="flex items-center px-4 py-2 justify-between border-b">
						<h1 className="text-xl font-bold ">Rides</h1>
					</div>
					<ScrollArea className="h-[91vh]">
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
