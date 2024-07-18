import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import ActivityCard from "@/components/ui/activityCard";

import { refreshToken, getActivities } from "@/lib/utils";
import { FullActivity, RefreshTokenData } from "@/lib/types";
import backupData from "@/public/data.json";
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
			5
		);

		if (response !== null) {
			activities = response;
		} else {
			activities = backupData;
		}
	}

	return (
		<main className=" ">
			<ResizablePanelGroup
				direction="horizontal"
				className="min-h-96 rounded-lg border "
			>
				<ResizablePanel defaultSize={75}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Content</span>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={25}>
					<div className="flex flex-col h-full items-center justify-center p-6">
						<span className="font-semibold">Sidebar</span>
						{activities.map((activity) => (
							<div key={activity.id}>
								<Card>
									<ActivityCard activity={activity} />
								</Card>
							</div>
						))}
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
