// import { Button } from '@mantine/core';
// import React, { useEffect } from 'react';
// import { trpc } from "./util";

// export interface HomeProps {
// }

// export const Home: React.FC<HomeProps> = (props) => {
//     const info = `This app is using Chrome (v${window.appApi.chrome()}), Node.js (v${window.appApi.node()}), and Electron (v${window.appApi.electron()})`;

//     const utils = trpc.useContext();
//     // const users = trpc.userById.useQuery();
//     const addUser = trpc.createGroup.useMutation({
//         onSuccess: () => {
//             // utils.user.invalidate();
//         }
//     });

//     useEffect(() => {
//         window.appApi.receive("app", (event) => {
//             console.log("Received event from main ", event);
//             alert("Received event from main " + event.action);
//         });
//     }, [])

//     return (
//         <div className="App">
//             <h1>Vite + React</h1>
//             <div className='bg-red-500 w-0.5'>
//                 <Button>test</Button>
//                 {info}

//                 <h2>Users</h2>
//                 {/* <button onClick={() => addUser.mutate({
//           name: "Test new user",
//           dateCreated: new Date()
//         })}>
//           Add user
//         </button>
//         {users.data?.map((user) => (
//           <div key={user.id}>{user.id}: {user.name} created on {user.dateCreated.toLocaleString()}</div>
//         ))} */}

//                 <p>
//                     Edit <code>src/Home.tsx</code> and save to test HMR!
//                 </p>
//             </div>
//         </div>
//     );
// }
