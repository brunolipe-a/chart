import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { SlideAreaChart, SlideBarChart } from 'react-native-slide-charts';
import * as Haptics from 'expo-haptics'

export default class App extends React.Component {
  state = {
    axisWidth: 0,
    axisHeight: 0,
    data: [
            { x: new Date('2020-09-12T03:00:00'), y: 0 },
            { x: new Date('2020-09-13T03:00:00'), y: 800 },
            { x: new Date('2020-09-14T03:00:00'), y: 540 },
            { x: new Date('2020-09-15T03:00:00'), y: 650 },
            { x: new Date('2020-09-16T03:00:00'), y: 520 },
            { x: new Date('2020-09-17T03:00:00'), y: 560 },
            { x: new Date('2020-09-18T03:00:00'), y: 970 },
            { x: new Date('2020-09-19T03:00:00'), y: 740 },
            { x: new Date('2020-09-20T03:00:00'), y: 550 },
            { x: new Date('2020-09-21T03:00:00'), y: 750 },
            { x: new Date('2020-09-22T03:00:00'), y: 910 },
            { x: new Date('2020-09-23T03:00:00'), y: 810 },
            { x: new Date('2020-09-24T03:00:00'), y: 670 },
            { x: new Date('2020-09-25T03:00:00'), y: 840 },
            { x: new Date('2020-09-26T03:00:00'), y: 790 },
            { x: new Date('2020-09-27T03:00:00'), y: 640 },
            { x: new Date('2020-09-28T03:00:00'), y: 730 },
            { x: new Date('2020-09-29T03:00:00'), y: 570 },
            { x: new Date('2020-09-30T03:00:00'), y: 760 },
            { x: new Date('2020-10-01T03:00:00'), y: 480 },
            { x: new Date('2020-10-02T03:00:00'), y: 980 },
            { x: new Date('2020-10-03T03:00:00'), y: 590 },
            { x: new Date('2020-10-04T03:00:00'), y: 350 },
            { x: new Date('2020-10-05T03:00:00'), y: 690 },
            { x: new Date('2020-10-06T03:00:00'), y: 530 },
            { x: new Date('2020-10-07T03:00:00'), y: 750 },
            { x: new Date('2020-10-08T03:00:00'), y: 670 },
            { x: new Date('2020-10-09T03:00:00'), y: 710 },
            { x: new Date('2020-10-10T03:00:00'), y: 540 },
            { x: new Date('2020-10-11T03:00:00'), y: 330 },
            { x: new Date('2020-10-12T03:00:00'), y: 380 },
            { x: new Date('2020-10-13T03:00:00'), y: 620 },
          ],
  };

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     data: [
    //       { x: 1, y: 5 },
    //       { x: 2, y: 6 },
    //       { x: 3, y: 11 },
    //       { x: 4, y: 50 },
    //       { x: 5, y: 3 },
    //       { x: 6, y: 34 },
    //     ],
    //   });
    // }, 2000);

    // setTimeout(() => {
    //   this.setState({
    //     data: [{ x: 1, y: 5 }],
    //   });
    // }, 4000);

    // setTimeout(() => {
    //   this.setState({
    //     axisWidth: 16,
    //     axisHeight: 16,
    //     data: [
    //       { x: 1, y: 5 },
    //       { x: 2, y: 6 },
    //       { x: 3, y: 11 },
    //       { x: 4, y: 50 },
    //       { x: 5, y: 3 },
    //       { x: 6, y: 34 },
    //       { x: 7, y: 5 },
    //       { x: 8, y: 6 },
    //       { x: 9, y: 11 },
    //       { x: 10, y: 50 },
    //       { x: 11, y: 3 },
    //       { x: 12, y: 34 },
    //       { x: 27, y: 11 },
    //     ],
    //   });
    // }, 7000);
  }

  render() {
    const { data } = this.state;
    const markerSpacing = data.length > 20 ? 2 : data.length > 10 ? 1 : 0

    const max = Math.max(...data.map(item => item.y))

    let ticks = 4

    let interval = Math.round(max/ticks)
    if (max < ticks*ticks) {
      if (max < 10) {
        ticks = max
      } else {
        ticks += 1
      }
      
      interval = Math.round(max/ticks)
    }

    return (
      <View style={styles.container}>
          <SlideAreaChart
            throttleAndroid
            scrollable
            style={{ marginTop: 64 }}
            shouldCancelWhenOutside={false}
            alwaysShowIndicator={true}
            height={150}
            data={data}
            paddingRight={10}
            axisWidth={32}
            axisHeight={16}
            xScale="time"
            yAxisProps={{
              numberOfTicks: ticks - 1,
              interval: interval,
              axisLabel: '(L)'

            }}
            toolTipProps={{
              toolTipTextRenderers: [
                ({ scaleX, x }) => {
                  const date = scaleX.invert(x) as Date
                  const index = this.state.data.findIndex(item => item.x.toLocaleDateString() === date.toLocaleDateString())


                  return {
                    text: `${this.state.data[index].y.toString()} (L)`
                  }
                },
                ({ scaleX, x }) => ({
                  text: scaleX
                    .invert(x)
                    .toLocaleDateString("pt-BR"),
                }),
                // ({ selectedBarNumber }) => ({ text: this.state.data[selectedBarNumber].x.toLocaleDateString() }),
              ],
            }}
          />
          <SlideBarChart
            scrollable
            style={{ marginTop: 64 }}
            shouldCancelWhenOutside={false}
            alwaysShowIndicator={true}
            height={200}
            data={data}
            paddingRight={10}
            axisWidth={32}
            axisHeight={16}
            xScale="time"
            yAxisProps={{
              numberOfTicks: ticks - 1,
              interval: interval,
              axisLabel: '(L)'

            }}
            toolTipProps={{
              toolTipTextRenderers: [
                ({ selectedBarNumber }) => ({
                  text: this.state.data[selectedBarNumber].y.toString(),
                }),
                ({ selectedBarNumber }) => ({ text: this.state.data[selectedBarNumber].x.toLocaleDateString() }),
              ],
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,

  },
});