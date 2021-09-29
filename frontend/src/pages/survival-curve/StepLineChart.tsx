import { ArgumentAxis, Chart, CommonSeriesSettings, Export, Format, Label, Legend, Point, Series } from 'devextreme-react/chart';
import * as React from 'react';
import { Component } from 'react';
import { olympicAchievements } from './Data';

export const medalSources = [
    {value: 'bronze', name: 'Bronze Medals', color: '#cd7f32'},
    {value: 'silver', name: 'Silver Medals', color: '#c0c0c0'},
    {value: 'gold', name: 'Gold Medals', color: '#ffd700'}
];

export default class StepLineChart extends Component {

    render() {
        return (
            <>
                <Chart
                    id="container"
                    dataSource={olympicAchievements}
                    title="Australian Olympic Medal Count"
                >
                    <CommonSeriesSettings
                        type="stepline"
                        argumentField="year"
                    >
                        <Point visible={false}/>
                    </CommonSeriesSettings>
                    {/*         {
                    medalSources.map(function(item) {
                        return <Series key={item.value} valueField={item.value} name={item.name} color={item.color} />;
                    })
                }*/}
                    <Series key={'bronze'} valueField={'bronze'} name={'Bronze Medals'} color={'#cd7f32'}></Series>
                    <ArgumentAxis>
                        <Label>
                            <Format type="decimal"/>
                        </Label>
                    </ArgumentAxis>
                    <Legend
                        verticalAlignment="bottom"
                        horizontalAlignment="center"
                    />
                    <Export enabled={true}/>
                </Chart>
            </>
        );
    }
}


