// import React from 'react';
// import {
//     ActionIcon,
//     Avatar,
//     Badge,
//     Button,
//     Card,
//     Checkbox,
//     Input,
//     Tabs,
//     Text,
// } from '@mantine/core';
// import MapCard from '../components/MapCard';
// import NameCard from '../components/NameCard';
// import Colors from '../components/Colors';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { trpc } from '../util';

// type Inputs = {
//     name: string;
// };

// function Manage() {
//     const utils = trpc.useContext();
//     const user = trpc.userById.useQuery();
//     const createGroup = trpc.createGroup.useMutation({
//         onSuccess: () => {
//             utils.getGroups.invalidate();
//         },
//     });
//     const joinGroup = trpc.joinGroup.useMutation({
//         onSuccess: () => {
//             utils.getGroups.invalidate();
//             utils.getGroup.invalidate();
//         },
//     });

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//         setValue,
//     } = useForm<Inputs>({
//         defaultValues: {
//             name: '',
//         },
//     });
//     const userDoesNotExist = !!!user.data;
//     const onSubmit: SubmitHandler<Inputs> = data => {
//         createGroup.mutate(data.name);
//     };

//     const joinForm = useForm<{ id: string }>({
//         defaultValues: {
//             id: '',
//         },
//     });

//     const isJoiningOrCreating = joinGroup.isLoading || createGroup.isLoading;

//     return (
//         <div className='h-full w-full flex justify-center items-center gap-8'>
//             <Card shadow='sm' padding='lg' radius='md' withBorder>
//                 <form
//                     onSubmit={handleSubmit(onSubmit)}
//                     className='flex flex-col justify-center items-center h-full'
//                 >
//                     <div className='flex flex-col justify-center items-center h-full gap-4'>
//                         <label>
//                             Group Name
//                             <Input {...register('name')} />
//                         </label>
//                         <Button
//                             type='submit'
//                             fullWidth
//                             loading={isJoiningOrCreating}
//                         >
//                             Create
//                         </Button>
//                     </div>
//                 </form>
//             </Card>
//             <Card shadow='sm' padding='lg' radius='md' withBorder>
//                 <form
//                     onSubmit={joinForm.handleSubmit(data => {
//                         joinGroup.mutate(data.id);
//                     })}
//                     className='flex flex-col justify-center items-center h-full'
//                 >
//                     <div className='flex flex-col justify-center items-center h-full gap-4'>
//                         <label>
//                             Group Id
//                             <Input {...joinForm.register('id')} />
//                         </label>
//                         <Button
//                             type='submit'
//                             fullWidth
//                             loading={isJoiningOrCreating}
//                         >
//                             Join
//                         </Button>
//                     </div>
//                 </form>
//             </Card>
//         </div>
//     );
// }
// export default Manage;
