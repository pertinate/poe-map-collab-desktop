// import React from 'react';
// import {
//     ActionIcon,
//     Avatar,
//     Badge,
//     Button,
//     Card,
//     Checkbox,
//     Tabs,
//     Text,
// } from '@mantine/core';
// import MapCard from '../components/MapCard';
// import NameCard from '../components/NameCard';
// import Colors from '../components/Colors';
// import { trpc } from '../util';
// import { useParams } from '@tanstack/react-router';
// import { groupRoute } from '../routes';

// function Group() {
//     const { id } = groupRoute.useParams();
//     const user = trpc.userById.useQuery();
//     const group = trpc.getGroup.useQuery(id, {
//         refetchInterval: 5000,
//     });
//     const maps = trpc.getStaticMaps.useQuery();
//     console.log(group.data?.groupMemberships);
//     return (
//         <React.Fragment>
//             <div className='flex w-full h-full'>
//                 <div className='flex flex-col gap-2 p-2 w-full overflow-y-auto'>
//                     <div className='flex justify-between flex-col xl:flex-row gap-2'>
//                         <div className='flex flex-col gap-2'>
//                             <Card
//                                 shadow='sm'
//                                 padding='8px'
//                                 radius='md'
//                                 withBorder
//                                 className='w-fit'
//                             >
//                                 <div className='flex'>
//                                     <div className='flex flex-col'>
//                                         <div className='flex justify-between gap-4'>
//                                             <Text fw={500}>
//                                                 {group.data?.name}
//                                             </Text>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Card>
//                             <div className='flex gap-2 flex-col lg:flex-row'>
//                                 {group.data?.groupMemberships?.map(
//                                     (memberShip, idx) => {
//                                         return (
//                                             <NameCard
//                                                 key={memberShip.user.id}
//                                                 name={memberShip.user.nickName}
//                                                 map={memberShip.user.lastZone}
//                                                 isOwner={
//                                                     group.data?.owner.id ==
//                                                     memberShip.userId
//                                                 }
//                                                 color={
//                                                     Object.keys(Colors)[
//                                                         idx
//                                                     ] as keyof typeof Colors
//                                                 }
//                                                 // onHideoutClick={() => window.ipc.send(`goToHideout`, player)}
//                                                 // onInviteClick={() => window.ipc.send(`inviteToParty`, player)}
//                                             />
//                                         );
//                                     }
//                                 )}
//                             </div>
//                         </div>
//                         <div className='flex gap-2 flex-row xl:flex-col justify-center'>
//                             <div className='flex gap-2 flex-row'>
//                                 <Button
//                                     onClick={() =>
//                                         navigator.clipboard.writeText(id)
//                                     }
//                                 >
//                                     Copy ID
//                                 </Button>
//                                 <Button onClick={() => group.refetch()}>
//                                     Refresh
//                                 </Button>
//                             </div>
//                             <Button color='red' onClick={() => {}}>
//                                 Leave Group
//                             </Button>
//                         </div>
//                     </div>
//                     <div className='grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-2'>
//                         {maps.data?.tieredMaps.map((mapTier, tier) => {
//                             return (
//                                 <div key={`tier-${tier}`}>
//                                     <Card
//                                         shadow='sm'
//                                         padding='4px 4px'
//                                         radius='md'
//                                         withBorder
//                                     >
//                                         <Text
//                                             fw={500}
//                                             c={
//                                                 tier < 5
//                                                     ? ''
//                                                     : tier < 10
//                                                     ? 'yellow'
//                                                     : 'red'
//                                             }
//                                         >{`Tier ${tier + 1}`}</Text>
//                                         <div className='flex gap-2 flex-col'>
//                                             {mapTier.map((map, idx) => {
//                                                 const members =
//                                                     group.data?.groupMemberships.map(
//                                                         membership =>
//                                                             membership.user.MapStatus.find(
//                                                                 entry =>
//                                                                     entry.name ==
//                                                                     map
//                                                             )
//                                                     ) ?? [];
//                                                 return (
//                                                     <MapCard
//                                                         map={map}
//                                                         activeIndexes={members}
//                                                     />
//                                                 );
//                                             })}
//                                         </div>
//                                     </Card>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                     <div>
//                         <Card
//                             shadow='sm'
//                             padding='4px 4px'
//                             radius='md'
//                             withBorder
//                         >
//                             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
//                                 {maps.data?.uniqueMaps.map(map => {
//                                     const members =
//                                         group.data?.groupMemberships.map(
//                                             membership =>
//                                                 membership.user.MapStatus.find(
//                                                     entry => entry.name == map
//                                                 )
//                                         ) ?? [];
//                                     return (
//                                         <MapCard
//                                             map={map}
//                                             activeIndexes={members}
//                                             color='orange'
//                                         />
//                                     );
//                                 })}
//                             </div>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }
// export default Group;
