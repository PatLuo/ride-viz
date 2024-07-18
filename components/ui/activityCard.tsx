import { FullActivity } from "@/lib/types";

interface ActivityCardProps {
	activity: FullActivity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
	return (
		<div className="flex flex-col p-4">
			<div className="flex justify-between">
				<span className="font-semibold">{activity.name}</span>
				<span className="text-sm">{activity.start_date_local}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-sm">{activity.distance}</span>
				<span className="text-sm">{activity.moving_time}</span>
			</div>
		</div>
	);
}
