import Image from "next/image";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getNewAccessToken, getActivities } from "@/lib/utils";
import { RefreshTokenData } from "@/lib/types";
const revalidate = 0;

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;

export default async function Home() {
	const data = await getNewAccessToken(client_id, client_secret, refresh_token);

	if (data) {
		const activites = await getActivities(data.access_token);
		console.log(activites.length);
	}
	return (
		<main className=" ">
			<ResizablePanelGroup
				direction="horizontal"
				className="min-h-96 rounded-lg border "
			>
				<ResizablePanel defaultSize={25}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Sidebar</span>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={75}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Content</span>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
