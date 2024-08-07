// import { Accordion, Button, Collapse, Tabs } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import {
//     Link,
//     Outlet,
//     useNavigate,
//     useParams,
//     useRouter,
// } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
// import { trpc } from '../util';
// import Groups from './groups';

// export default function Layout() {
//     const router = useRouter();
//     const [opened, { toggle }] = useDisclosure(true);
//     const user = trpc.userById.useQuery();
//     return (
//         <>
//             <div className='flex h-screen'>
//                 <div className='flex gap-2 p-2 flex-col'>
//                     <div
//                         className={`border-solid border-0 pr-2 h-fit border-r border-blue-400 ${
//                             router.latestLocation.pathname == '/'
//                                 ? ''
//                                 : 'border-hidden'
//                         }`}
//                     >
//                         <Button
//                             component={Link}
//                             to={'/'}
//                             variant='light'
//                             fullWidth
//                         >
//                             Home
//                         </Button>
//                     </div>
//                     <div
//                         className={`border-solid border-0 pr-2 h-fit border-r border-blue-400 ${
//                             router.latestLocation.pathname == '/invite'
//                                 ? ''
//                                 : 'border-hidden'
//                         }`}
//                     >
//                         <Button
//                             component={Link}
//                             to={'/manage'}
//                             variant='light'
//                             fullWidth
//                             // disabled
//                         >
//                             Manage
//                         </Button>
//                     </div>
//                     <div className={`pr-2`}>
//                         <Button
//                             variant='light'
//                             fullWidth
//                             onClick={toggle}
//                             w={'128px'}
//                             disabled={!!!user.data}
//                         >
//                             Groups
//                         </Button>
//                     </div>
//                     {!!user.data && <Groups open={opened} />}
//                 </div>
//                 <Outlet />
//             </div>
//             {/* <TanStackRouterDevtools /> */}
//         </>
//     );
// }
