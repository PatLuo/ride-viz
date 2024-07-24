import { useState } from "react";
import { Filter } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FilterBtn() {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger>
					<Sheet>
						<SheetTrigger>
							<Button variant="ghost" size="icon">
								<Filter className="h-[1.2rem] w-[1.2rem] " />
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Are you absolutely sure?</SheetTitle>
								<SheetDescription>
									This action cannot be undone. This will permanently delete
									your account and remove your data from our servers.
								</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet>
				</TooltipTrigger>
				<TooltipContent>Filter rides</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
