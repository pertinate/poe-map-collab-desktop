// import Layout from './components/layout';
// import HomePage from './pages';
// import Manage from './pages/manage';
// import Group from './pages/group';
// import { createRootRoute, createRoute } from '@tanstack/react-router';
// import Invite from './pages/invite';
// import NotFound from './pages/notFound';

// export const rootRoute = createRootRoute({
//     component: Layout,
//     // errorComponent: () => <>There was an issue</>,
//     notFoundComponent: NotFound,
// });

// export const indexRoute = createRoute({
//     getParentRoute: () => rootRoute,
//     path: '/',
//     // errorComponent: () => <>There was an issue</>,
//     component: HomePage,
// });

// export const inviteRoute = createRoute({
//     getParentRoute: () => rootRoute,
//     path: '/invite',
//     validateSearch: (search: Record<string, unknown>) => {
//         return {
//             code: search.code as string,
//         };
//     },
//     component: Invite,
// });

// export const groupRoute = createRoute({
//     getParentRoute: () => rootRoute,
//     path: '/group/$id',
//     component: Group,
// });

// export const manageRoute = createRoute({
//     getParentRoute: () => rootRoute,
//     path: '/manage',
//     component: Manage,
// });

// export const routeTree = rootRoute.addChildren([
//     indexRoute,
//     inviteRoute,
//     groupRoute,
//     manageRoute,
// ]);
