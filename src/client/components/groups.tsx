// import React from 'react';
// import {
//     ActionIcon,
//     Avatar,
//     Badge,
//     Button,
//     Card,
//     Checkbox,
//     Collapse,
//     Tabs,
//     Text,
// } from '@mantine/core';
// import MapCard from '../components/MapCard';
// import NameCard from '../components/NameCard';
// import Colors from '../components/Colors';
// import { trpc } from '../util';
// import { Link, useRouter } from '@tanstack/react-router';

// type Props = {
//     open: boolean
// }

// function Groups(props: Props) {
//     const groups = trpc.getGroups.useQuery()
//     const router = useRouter();
//     return (
//         <div className='pr-2'>
//             <Collapse in={props.open} className='w-32 px-2'>
//                 {groups.data?.map((group, idx) => {
//                     return (
//                         <div
//                             key={`${group.name}-${group.id}`}
//                             className={`border-solid border-0 h-fit border-r pr-2 border-blue-400 ${router.latestLocation.href ==
//                                 `/group/${group.id}`
//                                 ? ''
//                                 : 'border-hidden'
//                                 }`}
//                         >
//                             <Button
//                                 component={Link}
//                                 to={`/group/${group.id}`}
//                                 variant='light'
//                                 fullWidth

//                             >
//                                 {group.name.split(' ').slice(0, 3).map(entry => entry[0]).join('')}
//                             </Button>
//                         </div>
//                     )
//                 })}
//             </Collapse>
//         </div>
//     );
// }
// export default Groups
