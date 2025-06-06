import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	index("./index.tsx"),
	
	layout("auth/auth.tsx", [
		route("sign-up", "auth/signup.tsx"),
		route("log-in", "auth/login.tsx"),
	]),
	
	...prefix("admin", [
		layout("admin/dashboard.tsx", [
			index("admin/home.tsx"),
			
			...prefix("quiz", [
				route("new", "admin/create-quiz/page.tsx"),
				route(":quizId", "admin/view-quiz.tsx"),
			]),
		]),
	]),
] satisfies RouteConfig;
