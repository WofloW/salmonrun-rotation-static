import React, {useEffect, useState} from 'react'
import './App.css'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
// import axios from 'axios'
import rotations from './rotations'
import Scrollable from './components/scrollable'
import Card from './components/card'

moment.locale('zh-cn')

const filtered = _.filter(rotations.Phases, (phase) => {
  const end = moment(phase.EndDateTime + '+00:00')
  return end.isAfter(moment())
})

function App() {
  const [showNumber, setShowNumber] = useState(5)
  const takeRotation = _.take(filtered, showNumber)
  if (window.location.search === '?access=138151784') {
    return (
      <Scrollable
        isBottom={() => {
          setShowNumber(showNumber + 5)
        }}
      >
        <div className="App">
          <h3>Splatoon 2 Salmon Run rotation</h3>
          <h3>乌贼2打工时间表</h3>
          <div style={{fontSize: 12, marginBottom: 10}}>夜风制作 打工qq群: 138151784</div>
          <div style={{fontSize: 11}}>
            <div>This website is built for Chinese players only who can't access oatmealdome website.</div>
            <div>Rotation data from <a href='https://content.oatmealdome.me/bcat/salmon_run'>oatmealdome.me</a></div>
            <div>Stage and weapon images from <a href='https://leanny.github.io'>leanny.github.io</a></div>
          </div>
          {
            _.map(takeRotation, (phase, index) => {
              return <Card phase={phase} key={phase.StartDateTime} index={index}/>
            })
          }
        </div>
      </Scrollable>
    )
  } else {
    return <div><h1>404 Not Found</h1></div>
  }
}

export default App
