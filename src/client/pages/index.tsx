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
//     nickName: string;
// };

// function HomePage() {
//     const utils = trpc.useContext();
//     const user = trpc.userById.useQuery(undefined, {
//         retry: true,
//         onSuccess: data => {
//             Object.entries(data ?? {}).forEach(([key, value]) =>
//                 setValue(key as keyof Inputs, value as Inputs[keyof Inputs])
//             );
//         },
//     });
//     const createUser = trpc.createUser.useMutation({
//         onSuccess: () => {
//             utils.userById.invalidate();
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
//             name: user.data?.name,
//             nickName: user.data?.nickName,
//         },
//     });
//     const userDoesNotExist = !!!user.data;
//     const onSubmit: SubmitHandler<Inputs> = data => {
//         if (userDoesNotExist) {
//             createUser.mutate(data);
//         } else {
//             //update
//         }
//         console.log(data);
//     };

//     const openClientPath = trpc.triggerClientPathSelect.useMutation({
//         onSuccess: () => {
//             utils.getClientPath.invalidate();
//         },
//     });
//     const getClientPath = trpc.getClientPath.useQuery();
//     const bkpClientPath = trpc.backupClientPath.useMutation();
//     const deleteClientPath = trpc.deleteClientPath.useMutation();

//     return (
//         <div className='h-full w-full flex flex-col justify-center items-center'>
//             <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className='flex flex-col justify-center items-center h-full'
//             >
//                 <div className='flex flex-col justify-center items-center gap-4 h-fit'>
//                     <label>
//                         Character Name
//                         <Input {...register('name')} />
//                     </label>
//                     <label>
//                         Nickname
//                         <Input {...register('nickName')} />
//                     </label>
//                     <div>
//                         <Button type='submit' fullWidth>
//                             {userDoesNotExist ? 'Create' : 'Update'}
//                         </Button>
//                     </div>
//                     <Text>{getClientPath.data}</Text>
//                     <div className='flex gap-2'>
//                         <Button
//                             onClick={() => openClientPath.mutate()}
//                             w={'fit-content'}
//                         >
//                             Select Client.txt Path
//                         </Button>
//                         <Button onClick={() => bkpClientPath.mutate()}>
//                             Backup Client.txt
//                         </Button>
//                         <Button onClick={() => deleteClientPath.mutate()}>
//                             Delete Client.txt
//                         </Button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }
// export default HomePage;
