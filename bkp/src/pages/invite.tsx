import React from 'react';
import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Card,
    Checkbox,
    Tabs,
    Text,
} from '@mantine/core';
import MapCard from '../components/MapCard';
import NameCard from '../components/NameCard';
import Colors from '../components/Colors';

function Invite() {
    return (
        <React.Fragment>
            <div className='flex w-full h-full' >
                <Tabs orientation='vertical' defaultValue={window.user.groups[0].name} className='w-full h-full'>

                    {
                        window.user.groups.map((group) => {
                            return (
                                <Tabs.Panel value={group?.name} className='h-screen'>
                                    <div className='flex flex-col gap-2 p-2 w-full overflow-y-auto'>
                                        <div className='flex justify-between flex-col xl:flex-row gap-2'>
                                            <div className='flex gap-2 flex-col lg:flex-row'>
                                                {
                                                    group?.status?.map((player, idx) => {
                                                        return (
                                                            <NameCard
                                                                name={player.user.name}
                                                                map={undefined}
                                                                color={Object.keys(Colors)[idx] as keyof typeof Colors}
                                                            // onHideoutClick={() => window.ipc.send(`goToHideout`, player)}
                                                            // onInviteClick={() => window.ipc.send(`inviteToParty`, player)}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='flex gap-2 flex-row xl:flex-col'>
                                                <div className='flex gap-2 flex-row'>
                                                    <Button>Copy Invite</Button>
                                                    <Button>Create Group</Button>
                                                </div>
                                                <Button color='red' onClick={() => {
                                                }}>Leave Group</Button>
                                            </div>
                                        </div>
                                        <div className='grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-2'>
                                            {window.maps.maps.map((mapTier, tier) => {
                                                return (
                                                    <div key={`tier-${tier}`}>
                                                        <Card
                                                            shadow='sm'
                                                            padding='4px 4px'
                                                            radius='md'
                                                            withBorder
                                                        >
                                                            <Text
                                                                fw={500}
                                                                c={
                                                                    tier < 5
                                                                        ? ''
                                                                        : tier < 10
                                                                            ? 'yellow'
                                                                            : 'red'
                                                                }
                                                            >{`Tier ${tier + 1}`}</Text>
                                                            <div className='flex gap-2 flex-col'>
                                                                {mapTier.map((map, idx) => {
                                                                    return (
                                                                        <MapCard
                                                                            map={map}
                                                                            activeIndexes={group?.status?.map((_, idx) => idx)}
                                                                        />
                                                                    );
                                                                })}
                                                            </div>
                                                        </Card>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div>
                                            <Card
                                                shadow='sm'
                                                padding='4px 4px'
                                                radius='md'
                                                withBorder
                                            >
                                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                                                    {window.maps.uniqueMaps.map(map => {
                                                        return (

                                                            <MapCard
                                                                map={map}
                                                                activeIndexes={group?.status?.map((_, idx) => idx)}
                                                                color='orange'
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </Tabs.Panel>
                            )
                        })
                    }

                    {/* {
                        group?.name && 
                    } */}
                    {/* {Array(5)
                        .fill(undefined)
                        .map((_, idx) => (
                            
                        ))} */}
                </Tabs>

            </div>
            {/* <div className="mt-1 w-full flex-wrap flex justify-center">
                <Button onClick={() => data.send([])}>test</Button>
                <Link href="/next">
                    <a className="btn-blue">Go to next page</a>
                </Link>
            </div> */}
        </React.Fragment>
    );
}
export default Invite