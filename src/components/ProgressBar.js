import React from 'react';

import { Steps } from 'antd';

export default function ProgressBar({index, nbSample}) {

    const items = []
    for (let i = 0; i < nbSample; i++) {
        items.push({
            title: '',
        })
    }

    return (
    <Steps
        size="small"
        current={index - 1}
        items={items}
    />
    );
};
