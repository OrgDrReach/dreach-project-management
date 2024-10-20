import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Register",  
  description: "Register your account",
}

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<main>
			<div>{children}</div>
		</main>
	);
};

export default layout;
