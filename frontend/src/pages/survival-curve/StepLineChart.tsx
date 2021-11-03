import {
    ArgumentAxis,
    Chart,
    CommonSeriesSettings,
    Export,
    Format,
    Label,
    Legend,
    Point,
    Series
} from 'devextreme-react/chart';
import * as React from 'react';
import {Component} from 'react';


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
                    title="Kaplan-Meier survival curve"
                >
                    <CommonSeriesSettings
                        type="stepline"
                        argumentField="periodNumber"
                    >
                        <Point visible={false}/>
                    </CommonSeriesSettings>
                    <Series key={'estimatorKM'} valueField={'estimatorKM'}
                            name={'The likelihood of not having certain side effects'}
                            color={'#FC7B09'}/>
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


