import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign in",  
  description: "Sign in to your account",
}

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<main>
			<div>{children}</div>
		</main>
	);
};

export default layout;