import { useThemeColors } from '/@src/composable/useThemeColors'
const themeColors = useThemeColors()

export const evolutionRadialOptions = {
  series: [54],
  chart: {
    height: 220,
    type: 'radialBar',
  },
  colors: [themeColors.accent, themeColors.orange, themeColors.orange],
  title: {
    text: 'Theam Efficiency',
    align: 'left',
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          offsetY: 15,
          fontSize: '13px',
          fontFamily: 'Roboto, sans-serif',
          color: themeColors.lightText,
          formatter: function () {
            return ['']
          },
        },
        value: {
          color: themeColors.accent,
          offsetY: -20,
          fontSize: '16px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '500',
        },
      },
    },
  },
  labels: ['Median Ratio'],
}
