import { useState } from 'react';
import UpdateElectron from '@/components/update';
import logoVite from './assets/logo-vite.svg';
import logoElectron from './assets/logo-electron.svg';
import { Button } from '@mantine/core';
import {
    Outlet,
    RouterProvider,
    Link,
    createRouter,
    createRoute,
    createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import HomePage from './pages';
import Layout from './components/layout';

const rootRoute = createRootRoute({
    component: Layout,
    errorComponent: () => <>There was an issue</>,
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    errorComponent: () => <>There was an issue</>,
    component: HomePage
})

const inviteRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/invite',
    validateSearch: (search: Record<string, unknown>) => {
        return {
            code: search.code as string,
        }
    },
    component: function About() {
        return <div className="p-2">Hello from About!</div>
    },
})

const groupRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/group/$groupId',
    component: () => <>group</>
})

const routeTree = rootRoute.addChildren([indexRoute, inviteRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const App = () =>
    <RouterProvider router={router} />

export default App;
