import { FullActivity } from "@/lib/types";
import { Card } from "./card";
interface ActivityCardProps {
	activity: FullActivity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
	return (
		<Card className="mx-auto  p-4">
			<div className="flex justify-between">
				<span className="font-semibold">{activity.name}</span>
				<span className="text-sm">{activity.start_date_local}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-sm">{activity.distance}</span>
				<span className="text-sm">{activity.moving_time}</span>
			</div>
		</Card>
	);
}
