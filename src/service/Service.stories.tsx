import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Service} from "./Service";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Failing Absolute Import',
    component: Service,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Service>;

const Template: ComponentStory<typeof Service> = (args) => <Service/>;

export const Primary = Template.bind({});

Primary.args = {

};
