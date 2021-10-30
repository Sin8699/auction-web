import colors from 'assets/theme/base/colors'

const {gradients} = colors

function configs(labels, datasets) {
  const backgroundColors = []

  datasets.backgroundColors.forEach(color => backgroundColors.push(gradients[color].state))

  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets.label,
          backgroundColor: backgroundColors,
          data: datasets.data
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
}

export default configs
