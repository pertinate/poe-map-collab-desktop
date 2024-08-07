// import { Button, Card, Text } from '@mantine/core';
// import Colors from './Colors';
// import { IconCrown, IconHome, IconUser } from '@tabler/icons-react';
// type Props = {
//     name: string;
//     map?: string;
//     color: keyof typeof Colors;
//     key?: React.Key;
//     extraContent?: React.ReactNode;
//     isOwner?: boolean;
// };

// const NameCard = (props: Props) => {
//     return (
//         <Card key={props.key} shadow='sm' padding='8px' radius='md' withBorder>
//             <div className='flex'>
//                 <div className='flex flex-col'>
//                     <div className='flex justify-between gap-4'>
//                         <Text c={Colors[props.color]}>{props.name}</Text>
//                         {props.isOwner && <IconCrown />}
//                     </div>
//                     <div className='flex gap-1 mb-1'>
//                         <Text fw={700}>{props.map ?? 'N/A'}</Text>
//                     </div>
//                 </div>
//                 {props.extraContent}
//                 {/* <div className="flex flex-col gap-2 ml-4">
//                     <Button size='compact-xs' variant="subtle" p={0} onClick={() => props.onHideoutClick()}><IconHome /></Button>
//                     <Button size='compact-xs' variant="subtle" p={0} onClick={() => props.onInviteClick()}><IconUser /></Button>
//                 </div> */}
//             </div>
//             <div className='absolute left-0 bottom-0 grid grid-cols-1 h-1 w-full'>
//                 <span
//                     style={{
//                         backgroundColor: Colors[props.color],
//                     }}
//                 />
//             </div>
//         </Card>
//     );
// };

// export default NameCard;
