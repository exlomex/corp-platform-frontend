type Align = 'start' | 'end';
type Placement = 'top' | 'right' | 'bottom' | 'left';


export type AnchorProps = `${Placement}` | `${Placement} ${Align}`