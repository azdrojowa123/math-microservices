import { ArgumentAxis, Chart, CommonSeriesSettings, Export, Format, Label, Legend, Point, Series } from 'devextreme-react/chart';
import * as React from 'react';
import { Component } from 'react';
import {olympicAchievements, results} from './Data';


interface SurvivalCurveResult {
    periodNumber: number,
    quantity: number,
    failures: number,
    survivalProbability: number,
    estimatorKM: number
}

interface stepLineChartI {
    data: SurvivalCurveResult[]
}

export default class StepLineChart extends Component<stepLineChartI> {

    render() {
        console.log(this.props.data)
        return (
            <>
                <Chart
                    id="container"
                    dataSource={this.props.data}
                    title="Krzywa przeżycia Kaplana-Meiera"
                >
                    <CommonSeriesSettings
                        type="stepline"
                        argumentField="periodNumber"
                    >
                        <Point visible={false}/>
                    </CommonSeriesSettings>
                    {/*         {
                    medalSources.map(function(item) {
                        return <Series key={item.value} valueField={item.value} name={item.name} color={item.color} />;
                    })
                }*/}
                    <Series key={'estimatorKM'} valueField={'estimatorKM'} name={'Prawdopodobieństwo nie wystąpienia określonych działań nieporządanych'} color={'#FC7B09'}></Series>
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


