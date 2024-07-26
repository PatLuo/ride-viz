"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
export const revalidate = 0;

export default function Logo() {
	const { resolvedTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return <div className="py-[18px]"></div>;

	const isDarkMode = resolvedTheme == "dark";
	return (
		<>
			{isDarkMode ? (
				<Image
					unoptimized
					src="/logo-dark.png"
					alt="logo"
					width={150}
					height={50}
				/>
			) : (
				<Image unoptimized src="/logo.png" alt="logo" width={150} height={50} />
			)}
		</>
	);
}
