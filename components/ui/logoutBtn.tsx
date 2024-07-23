import { Button } from "@/components/ui/button";
import { logout } from "@/lib/serverUtils";
import { redirect } from "next/navigation";

export default function LogoutBtn() {
	return (
		<form
			action={async () => {
				"use server";
				await logout();
				redirect("/");
			}}
		>
			<Button type="submit" variant={"secondary"}>
				Logout
			</Button>
		</form>
	);
}
