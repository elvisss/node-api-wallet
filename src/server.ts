import { config } from '../config'
import { app } from './app'

app.listen(config.port, () => {
  console.log(`Application running on port ${config.port}`)
})
