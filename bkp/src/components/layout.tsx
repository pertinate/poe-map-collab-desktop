import { Accordion, Button, Collapse, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    Link,
    Outlet,
    useNavigate,
    useParams,
    useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import useIpc from './useIpc';

export default function Layout() {
    const router = useRouter();
    const [opened, { toggle }] = useDisclosure(true);
    const data = useIpc('getUser')
    console.log(data)
    return (
        <>
            <div className='flex h-screen'>
                <div className='flex gap-2 p-2 flex-col'>
                    <div
                        className={`border-solid border-0 pr-2 h-fit border-r border-blue-400 ${router.latestLocation.pathname == '/'
                            ? ''
                            : 'border-hidden'
                            }`}
                    >
                        <Button
                            component={Link}
                            to={'/'}
                            variant='light'
                            fullWidth
                        >
                            Home
                        </Button>
                    </div>
                    <div
                        className={`border-solid border-0 pr-2 h-fit border-r border-blue-400 ${router.latestLocation.pathname == '/invite'
                            ? ''
                            : 'border-hidden'
                            }`}
                    >
                        <Button
                            component={Link}
                            to={'/invite?code=test'}
                            variant='light'
                            fullWidth
                            disabled
                        >
                            Invite
                        </Button>
                    </div>
                    <div className={`pr-2`}>
                        <Button
                            variant='light'
                            fullWidth
                            onClick={toggle}
                            w={'128px'}
                            disabled={!!!data.state}
                        >
                            Groups
                        </Button>
                    </div>
                    {/* <div className='pr-2'>
                        <Collapse in={opened} className='w-32 px-2'>
                            {window.user.groups.map((group, idx) => {
                                return (
                                    <div
                                        key={`${group.name}-${group.id}`}
                                        className={`border-solid border-0 h-fit border-r border-blue-400 ${router.latestLocation.href ==
                                            `/groups?id=${group.id}`
                                            ? ''
                                            : 'border-hidden'
                                            }`}
                                    >
                                        <Button
                                            component={Link}
                                            to={`/groups?id=${group.id}`}
                                            variant='light'
                                            fullWidth
                                        >
                                            {group.name.match(/(\b[a-zA-Z])/g)?.slice(0, 3).join('')}
                                        </Button>
                                    </div>
                                )
                            })}
                        </Collapse>
                    </div> */}
                </div>
                {/* <Outlet /> */}
            </div>
            <TanStackRouterDevtools />
        </>
    );
}
