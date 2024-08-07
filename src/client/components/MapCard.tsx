// import { Button, Card, Group, Text } from '@mantine/core';
// import Colors from './Colors';
// import { IconSwitch } from '@tabler/icons-react';
// import { MapStatus } from '../../generated/client';
// import { trpc } from '../util';

// type Props = {
//     map: string;
//     key?: React.Key;
//     activeIndexes: (MapStatus | undefined)[];
//     color?: string;
// };

// const MapCard = (props: Props) => {
//     const utils = trpc.useContext();
//     const user = trpc.userById.useQuery();
//     const mapToggle = trpc.toggleMapCompletion.useMutation({
//         onSuccess: () => {
//             utils.getGroup.invalidate();
//         },
//     });
//     return (
//         <Card
//             key={props.key}
//             shadow='sm'
//             padding='2px 2px'
//             radius='md'
//             withBorder
//         >
//             <Group justify='space-between' mt='0' mb='0' p='2px 4px'>
//                 <div className='mb-1 flex justify-between w-full'>
//                     <Text
//                         fw={500}
//                         className='overflow-hidden'
//                         c={props.color}
//                         truncate='end'
//                     >
//                         {props.map}
//                     </Text>
//                     <Button
//                         size='compact-xs'
//                         variant='subtle'
//                         p={0}
//                         m={0}
//                         onClick={() => {
//                             const current = props.activeIndexes.find(
//                                 status => status?.userId == user.data?.id
//                             );
//                             if (current) {
//                                 mapToggle.mutate({
//                                     id: current.id,
//                                     userId: current.userId,
//                                     groupId: current.groupId,
//                                     complete: current.complete,
//                                 });
//                             }
//                         }}
//                     >
//                         <IconSwitch size={'16px'} />
//                     </Button>
//                 </div>
//                 <div className='absolute left-0 bottom-0 grid grid-cols-6 h-1 w-full'>
//                     {props.activeIndexes.map((playerMapStatus, idx) => {
//                         if (!playerMapStatus?.complete)
//                             return <span key={playerMapStatus?.id} />;

//                         return (
//                             <span
//                                 key={playerMapStatus?.id}
//                                 style={{
//                                     backgroundColor:
//                                         Colors[
//                                             Object.keys(Colors)[
//                                                 idx
//                                             ] as keyof typeof Colors
//                                         ],
//                                 }}
//                             />
//                         );
//                     })}
//                 </div>
//             </Group>
//         </Card>
//     );
// };

// export default MapCard;
