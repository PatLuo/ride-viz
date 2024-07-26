"use client";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { BarLoader } from "react-spinners";

export default function Loading() {
	return (
		<main className="mx-[18px] mt-5">
			<ResizablePanelGroup
				direction="horizontal"
				className=" rounded-lg border "
			>
				<ResizablePanel defaultSize={75}>
					<div
						className=" flex justify-center items-center h-full animate-pulse bg-gray-200 dark:bg-[hsl(20,14%,11%)]  "
						style={{
							animationDuration: "3s",
						}}
					>
						<BarLoader color="orange" height={6} width="20%" />
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle style={{ position: "relative" }} />
				<ResizablePanel
					defaultSize={25}
					maxSize={50}
					className="max-w-[90%] md:max-w-[40%] lg:max-w-[400px]"
				>
					<div className="flex items-center px-4 py-3.5 justify-between border-b">
						<h1 className="text-xl font-bold ">My Rides</h1>
					</div>
					<ScrollArea className="h-[90vh]">
						<div className="flex flex-col items-stretch justify-between gap-2 rouded-lg p-3">
							{[...Array(10).keys()].map((i) => (
								<div key={i}>
									<Card
										className="p-3 min-w-56 h-20 animate-pulse bg-gray-200 dark:bg-[hsl(20,14%,11%)]"
										style={{
											animationDelay: `${i * 0.1}s`,
											animationDuration: "1.3s",
										}}
									></Card>
								</div>
							))}
						</div>
					</ScrollArea>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
