import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
	index("./home.tsx"),
	
	layout("auth/auth.tsx", [
		route("sign-up", "auth/signup.tsx"),
		route("log-in", "auth/login.tsx")
	]),
] satisfies RouteConfig;
