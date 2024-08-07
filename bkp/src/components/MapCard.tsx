import { Button, Card, Group, Text } from "@mantine/core"
import Colors from './Colors';
import { IconSwitch } from '@tabler/icons-react'

type Props = {
    map: string;
    key?: React.Key
    activeIndexes: number[]
    color?: string
}

const MapCard = (props: Props) => {
    return (
        <Card
            key={props.key}
            shadow='sm'
            padding='2px 2px'
            radius='md'
            withBorder
        >
            <Group
                justify='space-between'
                mt='0'
                mb='0'
                p='2px 4px'
            >
                <div className='mb-1 flex justify-between w-full'>
                    <Text
                        fw={500}
                        className='overflow-hidden'
                        c={props.color}
                        truncate='end'

                    >
                        {props.map}
                    </Text>
                    <Button size="compact-xs" variant="subtle" p={0} m={0}>
                        <IconSwitch size={'16px'} />
                    </Button>
                </div>
                <div className='absolute left-0 bottom-0 grid grid-cols-6 h-1 w-full'>
                    {
                        Array(6).fill(undefined).map((_, idx) => {
                            if (!props.activeIndexes.includes(idx) || Math.random() > 0.5)
                                return <span />

                            return (<span
                                style={{
                                    backgroundColor:
                                        Colors[Object.keys(Colors)[idx]],
                                }}
                            />)
                        })
                    }
                </div>
            </Group>
        </Card>
    )
}

export default MapCard